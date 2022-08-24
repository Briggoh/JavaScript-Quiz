// Establishing variables
homePage = document.getElementById("homePage-container");
quizStart = document.getElementById("questions-container");
questionEl = document.getElementById("question");
optionEl = Array.from(document.getElementsByClassName("option"));
highScoreContainer = document.getElementById("your-score");
initials = document.getElementById("initials-input");
// Establishing constant
const timerEl = document.getElementById("timer");
// Variables cont. 
timesUpCont = document.getElementById("timesUp");
scoreNumHere = document.getElementById("scoreNumGoesHere")
scoreBoardCont = document.getElementById("scoreBoard");
coderInt = document.getElementById("coderInt");
userScore = document.getElementById("coderScore");
highScoresList = document.getElementById("highScoresList");

// Inserting audio files as variables and setting volume
let gameSound= new Audio("./assets/songs/gameSound.mp3")
gameSound.volume=0.1

let correctSound= new Audio ("./assets/songs/correct.mp3")
correctSound.volume=0.1

let wrongSound= new Audio ("./assets/songs/fail.mp3")
wrongSound.volume=0.2

let startSound= new Audio ("./assets/songs/start.mp3")
startSound.volume=0.6

let timeSound= new Audio ("./assets/songs/time.mp3")
timeSound.volume=0.1

// Adding event listeners
document.getElementById("option-1").addEventListener("click", function () { checkanswer("1") });
document.getElementById("option-2").addEventListener("click", function () { checkanswer("2") });
document.getElementById("option-3").addEventListener("click", function () { checkanswer("3") });
document.getElementById("option-4").addEventListener("click", function () { checkanswer("4") });
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("submit-initials-button").addEventListener("click", saveHighScore);

//  Setting timer to start at one minute
const startingTime = 1;

// Establishing variables for quiz 
var time = startingTime * 60;
var currentQuestion = {};
var correctOption = true;
var possibleQuestions = [];
var questionIndex = -1;
var timeInterval;

// Establishing questions as well as correct and incorrect answers
var questionsArr = [
    {
        question: "Commonly used data types DO NOT include which of the following:", option1: "Strings", option2: "Booleans", option3: "Alerts", option4: "Numbers", correctAnswer: "3"
    },
    {
        question: "The condition in an if/else statement is enclosed within _______.", option1: "Quotes", option2: "Curley Brackets", option3: "Square Brackets", option4: "Parentheses", correctAnswer: "4"
    },
    {
        question: "Inside which HTML element does one put the JavaScript code?", option1: "<javascript>", option2: "console.log()", option3: "terminal/bash", option4: "for loops", correctAnswer: "2"
    },
    {
        question: "How does one create a function in JavaScript?", option1: "function myFunction()", option2: "function: myFunction()", option3: "function = myFunction()", option4: "function(myFunction)", correctAnswer: "1"
    }
];

// Game starts when start button is pressed 
function startGame() {
    timeInterval = setInterval(startTimer, 1000);
    insertQuestion()
    startSound.play();

}

// Setting parameters for timer in relation to the game 
function startTimer() {
    if (numOfQuestions = possibleQuestions.length - 1) {
        quizStart.classList.add("hide");
    }
    homePage.classList.add("hide");
    quizStart.classList.remove("hide");
    const minutes = Math.floor(time / 60);
    var seconds = time % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // If the timer runs out, show "time out" page and play song
    if (time <= 0) {
        timerEl.innerHTML = "OH NO! Time's Up!";
        quizStart.classList.add("hide");
        timesUpCont.classList.remove("hide");
        timeSound.play()
    }
    
    timerEl.innerHTML = minutes + ":" + seconds;
    time--;

}

// Function to insert questions
function insertQuestion() {
    possibleQuestions = [...questionsArr];
    console.log(possibleQuestions);
    loadNextQuestion();
}

// If answer is correct, play correctSound and load next question 
function checkanswer(value) {
    if (currentQuestion.correctAnswer == value) {
        loadNextQuestion()
        correctSound.play();
    // If answer is incorrect, play wrongSound, subtract ten seconds from timer, and load next question
    }else {
        time = time - 9;
        timerEl.innerHTML ="0:" + time;
        loadNextQuestion()
        wrongSound.play();
    }
}

// Establishing function to load the next question
function loadNextQuestion() {
    var numOfQuestions = possibleQuestions.length - 1;
    if (questionIndex < numOfQuestions) {
        questionIndex += 1;

        currentQuestion = possibleQuestions[questionIndex];

        question.innerHTML = currentQuestion.question;

        answer.innerHTML = currentQuestion.correctAnswer;

        optionEl.forEach(optionEl => {
            var number = optionEl.dataset['number'];
            optionEl.innerText = currentQuestion["option" + number];
        });
    } else {
        highScoresPage();
    }

};

// Sets function to end game and display highScorePage
function endGame() {
    highScoresPage();
}

// Sets parameters for the highScoresPage function. Clears timer, shows score, and plays song
function highScoresPage() {
    quizStart.classList.add("hide");
    highScoreContainer.classList.remove("hide");
    clearInterval(timeInterval);
    var highScore = timerEl;
    scoreNumHere.innerText ="[" + time + "]";
    gameSound.play()
}

// Maximum number of highscores that will be displayed is 10
const MAX_HIGHSCORES = 10;

// Received additional help from Codecademy + AskBCS
function saveHighScore() {
    // Sets variable for High Score array
    var highScoresArr = [];
    // Gets High Score from local storage
    highScoresArr = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(highScoresArr);
    var int = initials.value;
    var score = time;
    // Packages player's initials with their score (time)
    scoreObj = {
        int,
        score
    }

    // Push each individual user's initials and score to end of highscore array
    highScoresArr.push(scoreObj);
    // stringify highscore 
    localStorage.setItem("highScores", JSON.stringify(highScoresArr));
    printHighScores(highScoresArr);

function printHighScores(highScoresArr) {
    // Move to scoreBoard container 
    highScoreContainer.classList.add("hide");
    scoreBoardCont.classList.remove("hide");

    // Sorts high score based on time
    highScoresArr.sort( (a, b) => b.score - a.score)
    highScoresArr.splice(10);
    
    // For each object created, make it a list and append
    highScoresArr.forEach(scoreObj => {
        const listItem = document.createElement('li');
        listItem.innerText = `${scoreObj.int}   -   ${scoreObj.score}`;
        listItem.classList.add('highScoresList');
        highScoresList.appendChild(listItem);
       })
}
}