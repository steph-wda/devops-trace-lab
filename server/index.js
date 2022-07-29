const path = require('path')
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

let triviaQA = [
    {
      id: 1,
      question: "H1 headings are the smallest headings.",
      correct_answer: false,
      reviewed: false,
    },
    {
      id: 2,
      question: "DHCP stands for Dynamic Host Configuration Port.",
      correct_answer: false,
      reviewed: false,
    },
    {
      id: 3,
      question: "The HTML5 standard was published in 2014.",
      correct_answer: true,
      reviewed: false,
    },
    {
      id: 4,
      question: "HTML stands for Hypertext Markup Language",
      correct_answer: true,
      reviewed: false,
    },
    {
      id: 5,
      question: "The World Wide Web Consortium sets Web standards. ",
      correct_answer: true,
      reviewed: false,
    },
    {
      id: 6,
      question: "CSS stands for Cascading Style Sheets",
      correct_answer: true,
      reviewed: false,
    },
    {
      id: 7,
      question: "The style tag is used to define an internal style sheet.",
      correct_answer: true,
      reviewed: false,
    },
    {
      id: 8,
      question:
        "The correct place to insert a JavaScript is in the <head> section.",
      correct_answer: false,
      reviewed: false,
    },
    {
      id: 9,
      question:
        "call myFunction() is the correct way to call a function named myFunction.",
      correct_answer: false,
      reviewed: false,
    },
    {
      id: 10,
      question:
        'vars colors = "red","green","blue" is the correct syntax needed to create an array in JavaScript.',
      correct_answer: false,
      reviewed: false,
    },
  ];
  
  let tID = 11

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "/../client")));

const { 
    // updateTrivia 
} = require('./controller')

app.get("/", (req, res) => {
    rollbar.info(`user accessed the main page`)
    res.sendFile(path.resolve("client/index.html"));
  });

app.get("/api/compliment", (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];
    
    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];
    rollbar.info(`someone got a compliment`) //fires when compliment button is clicked
    res.status(200).send(randomCompliment);
  });

app.get("/api/fortune", (req, res) => {
    const fortunes = [
      "It’s not the amount of time you devote, but what you devote to the time that counts.",
      "It’s time to get moving. Your spirits will lift accordingly.",
      "Living with a commitment to excellence shall take you far.",
      "Nature, time and patience are the three great physicians.",
      "Observe all men, but most of all yourself.",
    ];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];
    rollbar.info(`someone got a fortune`) //fires when fortune is clicked button is clicked
    res.status(200).send(randomFortune);
  },
);

app.get("/api/trivia/", (req, res) => {
    const {amount} = req.query
    sendTrivia = []
    for(i=0; sendTrivia.length < amount; i++){
        let randomIndex = Math.floor(Math.random() * triviaQA.length);
        let randomQuestion = triviaQA[randomIndex];
        if(!sendTrivia.includes(randomQuestion)){
            sendTrivia.push(randomQuestion)
        }
    }
    rollbar.info(`trivia question loaded`) //fires when submit button is clicked
    res.status(200).send(sendTrivia);
  });


app.delete("/api/trivia/:id", (req, res) => {
    let {id} = req.params
    let index = triviaQA.findIndex((set) => set.id === +id);
    if(index !== -1){
        triviaQA.splice(index,1)  
    }
    rollbar.warning(`someone has deleted a card`) //fires when trivia is deleted
    res.status(200).send(triviaQA)
  });

app.post("/api/trivia/", (req, res) => {
    const {question, correct_answer} = req.body;
    const newSet = {
        id:tID,
        question,
        correct_answer,
        reviewed:false
    }
    triviaQA.push(newSet)
    rollbar.info(`someone added a question`)
    res.status(200).send(triviaQA)
    tID++
  });
// app.put("/api/trivia/:id", updateTrivia);



const SERVER_PORT = process.env.PORT || 4000
app.listen(SERVER_PORT, () => console.log("Server running on 4000"));
