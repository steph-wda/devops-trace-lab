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


module.exports = {
  getCompliment: (req, res) => {
    const compliments = [
      "Gee, you're a smart cookie!",
      "Cool shirt!",
      "Your Javascript skills are stellar.",
    ];

    // choose random compliment
    let randomIndex = Math.floor(Math.random() * compliments.length);
    let randomCompliment = compliments[randomIndex];

    res.status(200).send(randomCompliment);
  },

  getFortune: (req, res) => {
    const fortunes = [
      "It’s not the amount of time you devote, but what you devote to the time that counts.",
      "It’s time to get moving. Your spirits will lift accordingly.",
      "Living with a commitment to excellence shall take you far.",
      "Nature, time and patience are the three great physicians.",
      "Observe all men, but most of all yourself.",
    ];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
  },
  getTrivia: (req, res) => {
    const {amount} = req.query
    sendTrivia = []
    for(i=0; sendTrivia.length < amount; i++){
        let randomIndex = Math.floor(Math.random() * triviaQA.length);
        let randomQuestion = triviaQA[randomIndex];
        if(!sendTrivia.includes(randomQuestion)){
            sendTrivia.push(randomQuestion)
        }
    }
    res.status(200).send(sendTrivia);
  },

  deleteTrivia: (req, res) => {
    let {id} = req.params
    let index = triviaQA.findIndex((set) => set.id === +id);
    if(index !== -1){
        triviaQA.splice(index,1)  
    }
    res.status(200).send(triviaQA)
  },

  createTrivia: (req, res) => {
    const {question, correct_answer} = req.body;
    const newSet = {
        id:tID,
        question,
        correct_answer,
        reviewed:false

    }
    triviaQA.push(newSet)
    res.status(200).send(triviaQA)
    tID++
  },

//   updateTrivia: (req, res) => {
//     const {id} = req.params
//     const {question, answer} =req.body
//     let index = triviaQA.findIndex((set) => set.id === +id);
//     if(index !== -1){
//         res.status(400).send('Invalid ID') 
//     }else{
//        triviaQA[index].question = question
//        triviaQA[index].correct_answer = answer
//     }
//     res.status(200).send(triviaQA) 
//   }
     };
