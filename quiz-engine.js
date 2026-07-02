const lecture = lectureData;

let currentQuestion = 0;
let score = 0;

let totalTime = 0;
let timerInterval = null;
let questionStartTime = 0;

const questionStatus = lecture.questions.map(() => ({
    selectedOption: null,
    locked: false,
    skipped: false,
    timeTaken: 0
}));

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const timerElement = document.getElementById("timer");

const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
const lockButton = document.getElementById("lock-btn");
const skipButton = document.getElementById("skip-btn");

const navigatorContainer = document.getElementById("question-navigator");

startButton.addEventListener("click", startChallenge);

function startChallenge() {

    welcomeScreen.style.display = "none";

    quizScreen.style.display = "block";

    questionStartTime = Date.now();

    startTimer();

    buildNavigator();

    loadQuestion();

}

function startTimer() {

    timerInterval = setInterval(() => {

        totalTime++;

        const minutes = String(Math.floor(totalTime / 60)).padStart(2, "0");

        const seconds = String(totalTime % 60).padStart(2, "0");

        timerElement.innerText = `${minutes}:${seconds}`;

    }, 1000);

}

function loadQuestion() {

    const question = lecture.questions[currentQuestion];

    progressText.innerText =
        `Question ${currentQuestion + 1} of ${lecture.questions.length}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / lecture.questions.length) * 100}%`;

    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";

    feedbackElement.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option-btn";

        button.innerText = option;

        if (questionStatus[currentQuestion].selectedOption === index) {

            button.classList.add("selected");

        }

        button.onclick = () => {

            if (questionStatus[currentQuestion].locked) return;

            questionStatus[currentQuestion].selectedOption = index;

            document.querySelectorAll(".option-btn").forEach(btn => {

                btn.classList.remove("selected");

            });

            button.classList.add("selected");

            buildNavigator();

        };

        optionsElement.appendChild(button);

    });

}

lockButton.addEventListener("click", lockAnswer);

function lockAnswer() {

    const selected = questionStatus[currentQuestion].selectedOption;

    if (selected === null) {

        alert("Please select an option first.");

        return;

    }

    const question = lecture.questions[currentQuestion];

    questionStatus[currentQuestion].locked = true;

    questionStatus[currentQuestion].timeTaken =
        Math.floor((Date.now() - questionStartTime) / 1000);

    if (selected === question.correctOption) {

        score++;

        feedbackElement.innerHTML = `
            <h3 style="color:#22C55E;">✅ Correct</h3>
            <p>${question.explanation}</p>
        `;

    } else {

        feedbackElement.innerHTML = `
            <h3 style="color:#EF4444;">❌ Incorrect</h3>
            <p>${question.explanation}</p>
        `;

    }

    buildNavigator();

}

previousButton.addEventListener("click", previousQuestion);
nextButton.addEventListener("click", nextQuestion);
skipButton.addEventListener("click", skipQuestion);

function previousQuestion() {

    if (currentQuestion === 0) return;

    currentQuestion--;

    questionStartTime = Date.now();

    buildNavigator();

    loadQuestion();

}

function nextQuestion() {

    if (currentQuestion === lecture.questions.length - 1) {

        finishChallenge();

        return;

    }

    currentQuestion++;

    questionStartTime = Date.now();

    buildNavigator();

    loadQuestion();

}

function skipQuestion() {

    questionStatus[currentQuestion].skipped = true;

    nextQuestion();

}

function buildNavigator() {

    navigatorContainer.innerHTML = "";

    lecture.questions.forEach((question, index) => {

        const button = document.createElement("button");

        button.className = "navigator-btn";

        button.innerText = index + 1;

        const status = questionStatus[index];

        if (index === currentQuestion) {

            button.classList.add("current");

        }

        if (status.locked) {

            if (status.selectedOption === question.correctOption) {

                button.classList.add("correct");

            } else {

                button.classList.add("wrong");

            }

        } else if (status.skipped) {

            button.classList.add("skipped");

        }

        button.onclick = () => {

            currentQuestion = index;

            questionStartTime = Date.now();

            buildNavigator();

            loadQuestion();

        };

        navigatorContainer.appendChild(button);

    });

}

function finishChallenge() {

    const finish = confirm("Are you sure you want to finish the challenge?");

    if (!finish) return;

    clearInterval(timerInterval);

    quizScreen.style.display = "none";

    resultScreen.style.display = "block";

    const attempted = questionStatus.filter(q => q.locked).length;

    const skipped = questionStatus.filter(q => q.skipped).length;

    const wrong = attempted - score;

    const accuracy = attempted === 0
        ? 0
        : Math.round((score / attempted) * 100);

    const averageTime = lecture.questions.length === 0
        ? 0
        : Math.round(totalTime / lecture.questions.length);

    document.getElementById("result-summary").innerHTML = `

        <h2>Challenge Summary</h2>

        <p><strong>Score:</strong> ${score} / ${lecture.questions.length}</p>

        <p><strong>Correct:</strong> ${score}</p>

        <p><strong>Wrong:</strong> ${wrong}</p>

        <p><strong>Skipped:</strong> ${skipped}</p>

        <p><strong>Accuracy:</strong> ${accuracy}%</p>

        <p><strong>Total Time:</strong> ${formatTime(totalTime)}</p>

        <p><strong>Average Time per Question:</strong> ${averageTime} sec</p>

    `;

}

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes} min ${remainingSeconds} sec`;

}

document.getElementById("review-btn").addEventListener("click", () => {

    alert("Review Mode will be added in Version 2.");

});
