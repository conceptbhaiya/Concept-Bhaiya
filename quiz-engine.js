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

    buildNavigator();

loadQuestion();

});

function loadQuestion() {

    const question = lecture.questions[currentQuestion];

    document.getElementById("progress-text").innerText =
        `Question ${currentQuestion + 1} of ${lecture.questions.length}`;

    document.getElementById("question").innerText =
        question.question;

    const optionsContainer = document.getElementById("options");

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.innerText = option;

        button.className = "option-btn";

        button.onclick = () => {

    if (questionStatus[currentQuestion].locked) return;

    questionStatus[currentQuestion].selectedOption = index;

    document.querySelectorAll(".option-btn").forEach(btn => {

        btn.style.background = "";

    });

    button.style.background = "#7C3AED";
            buildNavigator();

};

        optionsContainer.appendChild(button);

    });

}

document.getElementById("lock-btn").addEventListener("click", () => {

    const selected = questionStatus[currentQuestion].selectedOption;

    if (selected === null) {

        alert("Please select an option first.");

        return;

    }

    const correct = lecture.questions[currentQuestion].correctOption;

    const feedback = document.getElementById("feedback");

    if (selected === correct) {

        score++;

        feedback.innerHTML =
            "<h3 style='color:#22C55E;'>✅ Correct!</h3><p>" +
            lecture.questions[currentQuestion].explanation +
            "</p>";

    } else {

        feedback.innerHTML =
            "<h3 style='color:#EF4444;'>❌ Incorrect!</h3><p>" +
            lecture.questions[currentQuestion].explanation +
            "</p>";

    }

    questionStatus[currentQuestion].locked = true;

});

document.getElementById("next-btn").addEventListener("click", () => {

    if (currentQuestion < lecture.questions.length - 1) {

        currentQuestion++;

        document.getElementById("feedback").innerHTML = "";

       buildNavigator();

loadQuestion();

    } else {

        alert("You have reached the last question.");

    }

});

document.getElementById("previous-btn").addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        document.getElementById("feedback").innerHTML = "";

        buildNavigator();

loadQuestion();

    }

});

document.getElementById("skip-btn").addEventListener("click", () => {

    questionStatus[currentQuestion].skipped = true;

    if (currentQuestion < lecture.questions.length - 1) {

        currentQuestion++;

        document.getElementById("feedback").innerHTML = "";

        loadQuestion();

    }

});

function buildNavigator() {

    const navigator = document.getElementById("question-navigator");

    navigator.innerHTML = "";

    lecture.questions.forEach((q, index) => {

        const button = document.createElement("button");

        button.innerText = index + 1;

        button.className = "navigator-btn";
        const status = questionStatus[index];

if (status.locked) {

    if (status.selectedOption === lecture.questions[index].correctOption) {

        button.style.background = "#22C55E";

    } else {

        button.style.background = "#EF4444";

    }

} else if (status.skipped) {

    button.style.background = "#6B7280";

} else if (index === currentQuestion) {

    button.style.background = "#7C3AED";

}
        if (index === currentQuestion) {

    button.style.background = "#7C3AED";

}

        button.onclick = () => {

            currentQuestion = index;

            document.getElementById("feedback").innerHTML = "";

            loadQuestion();

        };

        navigator.appendChild(button);

    });

}
