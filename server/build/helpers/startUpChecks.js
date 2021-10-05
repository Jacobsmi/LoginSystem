"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "./.env",
});
function startUpChecks() {
    // Check for all the necessary env variables before the program starts to run
    if (process.env.DBUSER === undefined) {
        throw "No DBUSER in .env file";
    }
    else if (process.env.DBHOST === undefined) {
        throw "No DBHOST in .env file";
    }
    else if (process.env.DBNAME === undefined) {
        throw "No DBNAME in .env file";
    }
    else if (process.env.DBUSERPASSWORD === undefined) {
        throw "No DBUSERPASSWORD in .env file";
    }
    else if (process.env.DBPORT === undefined) {
        throw "No DBPORT in .env file";
    }
    else if (process.env.JWTSECRETKEY === undefined) {
        throw "No JWTSECRETKEY in .env file";
    }
}
exports.default = startUpChecks;
