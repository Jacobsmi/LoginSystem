# Login System

## Overview
- The point of this project is to create a system based off of a PERN stack that allows for the registration and login of users 
- The login system uses Material UI for styling to make styling easier

## Prerequisites
- Node 
- Postgres
- Optional:
  - Typescript (If you want to modify the server in non-compiled code you must have TypeScript installed)
  - 

## Frontend
- To run the frontend `cd client` to enter the client directory and then `npm i` to install all the dependencies and finally `npm run start` to run the developement server
- The frontend uses `react-router-dom` for routing

## Server

### Setting up the server
- First step is to create an instance of a PostgreSQL server that the program can store data in
- Then, creaete a `.env` file in the `server` directory with the following data for the database
  ```
  DBUSER=DBUSER
  HOST=localhost
  DBNAME=logindb
  DBUSERPASSWORD=secretPassword01
  DBPORT=5432
  ```
- Next, run the migration script to create the proper tables in the database with `node ./build/migrations/migrations.js`
  - It is important to note that all calls must be done from the server directory so that the current working directory is correct and relative pathing in code work properly
