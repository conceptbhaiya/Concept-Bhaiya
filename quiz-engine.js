const lecture = lectureData;

let currentQuestion = 0;
let score = 0;
let totalTime = 0;
let questionStartTime = null;

const questionStatus = lecture.questions.map(() => ({
    selectedOption: null,
    locked: false,
    skipped: false,
    timeTaken: 0
}));

document.addEventListener("DOMContentLoaded", () => {
    console.log("Concept Bhaiya Quiz Engine Started");
    console.log(lecture);
});

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", () => {

    welcomeScreen.style.display = "none";

    quizScreen.style.display = "block";

    loadQuestion();

});
