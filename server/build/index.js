"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var startUpChecks_1 = __importDefault(require("./helpers/startUpChecks"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({
    path: "./.env",
});
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default({ origin: "http://localhost:3000", credentials: true }));
// Run a series of start up checks to ensure that all values are present
startUpChecks_1.default();
var pool = new pg_1.Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBUSERPASSWORD,
    port: parseInt(process.env.DBPORT),
});
app.get("/", function (req, res) {
    return res.send(JSON.stringify({
        alive: true,
    }));
});
app.post("/createuser", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedPassword, client, queryResult, userID, token, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 1:
                hashedPassword = _a.sent();
                return [4 /*yield*/, pool.connect()];
            case 2:
                client = _a.sent();
                return [4 /*yield*/, client.query("INSERT INTO users(first_name, last_name, email, password) VALUES($1,$2,$3,$4) RETURNING id", [
                        req.body.first_name,
                        req.body.last_name,
                        req.body.email,
                        hashedPassword,
                    ])];
            case 3:
                queryResult = _a.sent();
                client.release();
                userID = queryResult.rows[0].id;
                token = jsonwebtoken_1.default.sign({ id: userID }, process.env.JWTSECRETKEY);
                return [2 /*return*/, res.send(JSON.stringify({
                        success: true,
                    }))];
            case 4:
                e_1 = _a.sent();
                if (e_1.message ===
                    "duplicate key value violates unique constraint \"users_email_key\"") {
                    return [2 /*return*/, res.send(JSON.stringify({
                            success: false,
                            err: "non-unqiue-email",
                        }))];
                }
                console.log(e_1);
                return [2 /*return*/, res.send(JSON.stringify({
                        success: false,
                        err: "db-error",
                    }))];
            case 5: return [2 /*return*/];
        }
    });
}); });
app
    .listen(5000, function () {
    console.log("Server listening at http://localhost:5000");
})
    .on("error", function (error) {
    console.log(error.message);
});
