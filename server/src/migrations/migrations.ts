import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBUSERPASSWORD,
  port: parseInt(process.env.DBPORT!),
});

(async ():Promise<boolean> => {
  const client = await pool.connect();
  await client.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );`);
    client.release();
    await pool.end();
    console.log("Created tables");
    return true;
})();
