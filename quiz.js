// "use strict";
var timerDiv = document.getElementById("timer");
var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));

var presentQuest = {};
var acceptAns = false;
var score = 0;
var questionCount = 0;
var availQuest = [];

var questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Hypertext Markup Language,",
    choice2: "High Technology Manual Language",
    choice3: "Hope This Might Learn ",
    choice4: "Hyper Text Mechanical Learning",
    answer: 1,
  },
  {
    question: "what sympol do you first need to create a new element using Jquery?",
    choice1: "^",
    choice2: "*",
    choice3: "@",
    choice4: "$",
    answer: 4,
  },
  {
    question: "Bootstrap is to CSS like _______  is to Java Script?",
    choice1: "Bootcamp",
    choice2: "HTML",
    choice3: "Google",
    choice4: "JQuery",
    answer: 4,
  },
];

// Contants and Timers
const bonus = 10;
const totalQuest = 3;
const totalTime= 60;

var timeLeft = 0;
var timerHandle;

var setTime = (seconds) => {
  if (seconds < 0) {
    seconds = 0;
  }
  timeLeft = seconds;
  timerDiv.textContent = timeLeft;
};

var startTimer = () => {
  setTime(totalTime);
  timerHandle = setInterval(() => {
    setTime(timeLeft - 1);
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
};

var startGame = () => {
  questionCount = 0;
  score = 0;
  availQuest = [...questions];
  newQuestion();
  startTimer();
};

//Available questions logic
var newQuestion = () => {
  if (availQuest.length === 0 || questionCount > totalQuest) {
    // End game page
    return endQuiz();
  }
  questionCount++;
  var questionIndex = Math.floor(Math.random() * availQuest.length);
  presentQuest = availQuest[questionIndex];
  question.innerText = presentQuest.question;

  choices.forEach((choice) => {
    var number = choice.dataset["number"];
    choice.innerText = presentQuest["choice" + number];
  });

  availQuest.splice(questionIndex, 1);

  acceptAns = true;
};

var endQuiz = () => {
  clearInterval(timerHandle);
  sessionStorage.setItem("mostRecentScore", score);
  window.location.assign("endgame.html");
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAns) return;

    acceptAns = false;
    var selectedChoice = e.target;
    var selectedAns = selectedChoice.dataset["number"];

    var toApply = "incorrect";
    if (selectedAns == presentQuest.answer) {
      toApply = "correct";
      score = score + bonus;
    } else {
      setTime(timeLeft - 5);
    }

    selectedChoice.parentElement.classList.add(toApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(toApply);
      newQuestion();
    }, 1000);
  });
});

startGame();
