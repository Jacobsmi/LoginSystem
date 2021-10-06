import express, { json, Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import jsonwebtoken, { Jwt, JwtPayload } from "jsonwebtoken";
import startUpChecks from "./helpers/startUpChecks";
import bcrypt, { compareSync, hash } from "bcrypt";
import cors from "cors";

// Setting up dotenv so the script can read .env variables that should not be hard coded
dotenv.config({
  path: "./.env",
});

// Create the express app itself
const app = express();

// Set up the middleware that the app will use
// Express JSON is built in middleware that allows for easy parsing of JSON in POST request bodies
app.use(express.json());
// CORS middleware allows us to easily enable CORS for all routes without having to program headers by hand
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Run a series of start up checks to ensure that all values are present
startUpChecks();

// Create a pool for the database connection
// DBPORT is forced to not be null but a value is guaranteed in the startUpCheck function
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBUSERPASSWORD,
  port: parseInt(process.env.DBPORT!),
});

// Simple route to see if the server is alive
app.get("/", (req: Request, res: Response): Response => {
  return res.send(
    JSON.stringify({
      alive: true,
    })
  );
});

// Create user route is called from the frontend in the signup phase
// body values are guaranteed present and valid from client side validation
app.post(
  "/createuser",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // Step 1 hash password with bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Attempt to insert the user sent in the POST request into the database usign a pg pool client
      // Create the pg client
      const client = await pool.connect();
      // Execute the parameterized query
      const queryResult = await client.query(
        "INSERT INTO users(first_name, last_name, email, password) VALUES($1,$2,$3,$4) RETURNING id",
        [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
        ]
      );
      // Release the client and return to the pool
      client.release();

      // Get the user ID returned from the insert
      const userID = queryResult.rows[0].id;
      // Then turn the ID into a JWT
      const token = jsonwebtoken.sign(
        {
          id: userID,
        },
        process.env.JWTSECRETKEY!,
        { expiresIn: 60 * 60 }
      );
      // Set the header of the response to set a cookie on the frontend with the JWT to be used in the future when identifying client to server
      res.setHeader("Set-Cookie", `id=${token}; HttpOnly; Secure;`);
      // Send a successful response
      return res.send(
        JSON.stringify({
          success: true,
        })
      );
    } catch (e: any) {
      if (
        e.message ===
        `duplicate key value violates unique constraint "users_email_key"`
      ) {
        return res.send(
          JSON.stringify({
            success: false,
            err: "non-unqiue-email",
          })
        );
      }
      console.log(e);
      return res.send(
        JSON.stringify({
          success: false,
          err: "db-error",
        })
      );
    }
  }
);

app.get("/userinfo", async (req: Request, res: Response): Promise<Response> => {
  try {
    if (req.headers.cookie === undefined) {
      return res.send(
        JSON.stringify({
          success: false,
          err: "no-jwt"
        })
      );
    }
    // Get the user ID from the JWT
    // First parse the JWT value out from the cookie header in which it is sent
    const jwt = req.headers.cookie!.split("=")[1];
    // Next verify the value of the JWT with the jsonwebtoken built-in verify
    const decoded = jsonwebtoken.verify(
      jwt,
      process.env.JWTSECRETKEY!
    ) as JwtPayload;
    // Then get the id from the decoded token
    const userID = decoded.id;
    
    // Next get the user info by querying it out of the Database
    const client = await pool.connect();
    const result = await client.query(
      "SELECT first_name, last_name, email FROM users WHERE id=$1",
      [userID]
    );
    client.release();
    const userInfo = result.rows[0]
    return res.send(
      JSON.stringify({
        success: true,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email
      })
    );
  } catch (e) {
    console.log(e);
    return res.send(
      JSON.stringify({
        success: false,
        err: "server-err"
      })
    )
  }
});

app
  .listen(5000, (): void => {
    console.log("Server listening at http://localhost:5000");
  })
  .on("error", (error): void => {
    console.log(error.message);
  });
