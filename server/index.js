const express = require("express");
const cors = require("cors");

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

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/trivia/", getTrivia);
app.delete("/api/trivia/:id", deleteTrivia);
app.post("/api/trivia/", createTrivia);
// app.put("/api/trivia/:id", updateTrivia);

app.listen(4000, () => console.log("Server running on 4000"));
