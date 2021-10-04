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

const createTables = async () => {
  const client = await pool.connect();
  await client.query(`CREATE TABLE users(
      id SERIAL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      password NOT NULL
    );`);
};

createTables();
