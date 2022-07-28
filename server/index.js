
require('dotenv').config()
const express = require("express");
const cors = require("cors");

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const app = express();

app.use(cors());

app.use(express.json());

const { 
    getCompliment,
    getFortune,
    getTrivia,
    deleteTrivia,
    createTrivia,
    // updateTrivia 
} = require('./controller')

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/landing.html"));
  });

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/trivia/", getTrivia);
app.delete("/api/trivia/:id", deleteTrivia);
app.post("/api/trivia/", createTrivia);
// app.put("/api/trivia/:id", updateTrivia);

app.listen(4000, () => console.log("Server running on 4000"));
