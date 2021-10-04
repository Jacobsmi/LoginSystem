"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
app.get("/", function (req, res) {
    res.send(JSON.stringify({
        alive: true,
    }));
});
app
    .listen(5000, function () {
    console.log("Server listening at http://localhost:5000");
})
    .on("error", function (error) {
    console.log(error.message);
});
