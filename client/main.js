const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const triviaSelect = document.getElementById("questionQuantity");
const triviaBtn = document.getElementById("triviaSubmit");
const triviaDiv = document.getElementById("triviaContainer");
const triviaAll = document.getElementById("allDisplay");
const addTriviaBtn = document.getElementById("addQuestion");
const questionInput = document.getElementById("triviaQuestion");
const answerInput = document.getElementById("triviaAnswer");
const idInput = document.getElementById("idNumber")
const editTriviaBtn = document.getElementById("addTrivia")

const getCompliment = () => {
  axios.get("http://localhost:4000/api/compliment/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

const getFortune = () => {
  axios.get("http://localhost:4000/api/fortune/").then((res) => {
    const data = res.data;
    alert(data);
  });
};

//displays answer to trivia question as an alert
const displayAnswer = (answer) => {
  alert(`The answer is ${answer}.`);
};

//displays all of the cards left in the "database"
const displayAll = (triviaArray) => {
  let heading = document.createElement("h3");
  heading.textContent = "The following cards are still in the database";
  triviaAll.appendChild(heading);
  triviaArray.forEach((set) => {
    let triviaCard = `<div class="trivia-card">
                    <p>${set.question}</p>
                    </div>
                    `;
    triviaAll.innerHTML += triviaCard;
  });
};

//DELETE Request
const deleteTrivia = (id) => {
  triviaAll.innerHTML = "";
  axios.delete(`http://localhost:4000/api/trivia/${id}`).then((res) => {
    displayAll(res.data);
  });
};

//makes trivia card invisible
const makeCardInvisible = (divName) => {
  let iDiv = document.getElementsByName(divName)[0];
  iDiv.style.display = "none";
};

//displays trivia as cards
const displayTrivia = (trivia) => {
  let divName = 0; //setting name for each div created. Will make it easier to delete when it comes time to
  trivia.forEach((set) => {
    let triviaCard = `<div class="trivia-card" name=${divName}>
                    <p>${set.question}</p>
                    <button onclick="displayAnswer(${set.correct_answer})" >Show answer</button>
                    <button onclick="deleteTrivia(${set.id});makeCardInvisible(${divName})">Delete Question</button>
                    </div>
                    `;
    triviaDiv.innerHTML += triviaCard;
    divName++;
  });
};

//GET Request...user can the amount of cards to display
const getTriviaHandler = (e) => {
  e.preventDefault();
  triviaDiv.innerHTML = "";

  let amount = triviaSelect.value;
  axios.get(`http://localhost:4000/api/trivia?amount=${amount}`).then((res) => {
    displayTrivia(res.data);
  });
};

//POST Request...user can add a card
const createCard = (e) => {
  e.preventDefault();
  const body = {
    question: questionInput.value,
    answer: answerInput.value.toLowerCase(),
  };

  axios.post(`http://localhost:4000/api/trivia`, body).then((res) => {
    questionInput.value = "";
    answerInput.value = "";
    displayAll(res.data);
  });

};

//PUT Request...user can edit trivia questions in the database
// const updateCard = () => {
//     const body = {
//         id:idInput.value,
//         question: questionInput.value,
//         answer: answerInput.value.toLowerCase(),
//       };
//     axios.post(`http://localhost:4000/api/trivia/${id}`,body).then((res) => {
//     displayAll(res.data);
//   });
    
   
  
//   };
  


complimentBtn.addEventListener("click", getCompliment);
fortuneBtn.addEventListener("click", getFortune);
triviaBtn.addEventListener("click", getTriviaHandler);
addTriviaBtn.addEventListener("click", createCard);
//editTriviaBtn.addEventListener("click", updateCard)
