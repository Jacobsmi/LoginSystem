import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());


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
    // Step one query to see if the user exists in the database

    return res.send("In progress");
  }
);

app
  .listen(5000, (): void => {
    console.log("Server listening at http://localhost:5000");
  })
  .on("error", (error): void => {
    console.log(error.message);
  });
