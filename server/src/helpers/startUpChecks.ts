import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export default function startUpChecks() {
  // Check for all the necessary env variables before the program starts to run
  if (process.env.DBUSER === undefined) {
    throw "No DBUSER in .env file";
  } else if (process.env.DBHOST === undefined) {
    throw "No DBHOST in .env file";
  } else if (process.env.DBNAME === undefined) {
    throw "No DBNAME in .env file";
  } else if (process.env.DBUSERPASSWORD === undefined) {
    throw "No DBUSERPASSWORD in .env file";
  } else if (process.env.DBPORT === undefined) {
    throw "No DBPORT in .env file";
  } else if (process.env.JWTSECRETKEY === undefined) {
    throw "No JWTSECRETKEY in .env file";
  }
}
