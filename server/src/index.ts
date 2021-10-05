import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import startUpChecks from "./helpers/startUpChecks";
import bcrypt, { hash } from "bcrypt";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());

// Run a series of start up checks to ensure that all values are present
startUpChecks();

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBUSERPASSWORD,
  port: parseInt(process.env.DBPORT!),
});

app.get("/", (req: Request, res: Response): Response => {
  return res.send(
    JSON.stringify({
      alive: true,
    })
  );
});

app.post(
  "/createuser",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Attempt to insert the user sent in the POST request into the database usign a pg pool client
      const client = await pool.connect();
      const queryResult = await client.query(
        "INSERT INTO users(first_name, last_name, email, password) VALUES($1,$2,$3,$4) RETURNING id",
        [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hashedPassword,
        ]
      );
      client.release();

      // Get the user ID returned from the insert
      const userID = queryResult.rows[0].id;
      // Then turn the ID into a JWT
      const token = jsonwebtoken.sign({ id: userID }, process.env.JWTSECRETKEY!);

      return res.send(
        JSON.stringify({
          success: true,
        })
      );
    } catch (e) {
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

app
  .listen(5000, (): void => {
    console.log("Server listening at http://localhost:5000");
  })
  .on("error", (error): void => {
    console.log(error.message);
  });
