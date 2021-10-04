import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(
    JSON.stringify({
      alive: true,
    })
  );
});

app
  .listen(5000, (): void => {
    console.log("Server listening at http://localhost:5000");
  })
  .on("error", (error): void => {
    console.log(error.message);
  });
