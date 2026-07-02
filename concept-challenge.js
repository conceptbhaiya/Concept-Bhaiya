const questions = [

{
question: "Who first observed the nucleus in plant cells?",
options: [
"Friedrich Miescher",
"Robert Brown",
"Altmann",
"Watson"
],
answer: 1,
explanation: "Robert Brown first observed the nucleus in plant cells in 1831."
},

{
question: "Which scientist isolated a phosphorus-rich substance from pus cells that was later identified as DNA?",
options: [
"Robert Brown",
"Altmann",
"Friedrich Miescher",
"Chargaff"
],
answer: 2,
explanation: "Friedrich Miescher isolated nuclein from pus cells, which was later identified as DNA."
},

{
question: "Why did Friedrich Miescher name the newly isolated substance 'Nuclein'?",
options: [
"It was rich in nitrogen.",
"It was isolated from the nucleus.",
"It was acidic in nature.",
"It was found in nucleolus."
],
answer: 1,
explanation: "He named it nuclein because it was isolated from the nucleus."
},

{
question: "Altmann renamed 'Nuclein' as 'Nucleic Acid' because the substance:",
options: [
"Was found only in animal cells.",
"Showed acidic properties.",
"Was composed entirely of proteins.",
"Was present only in the nucleus."
],
answer: 1,
explanation: "Altmann renamed nuclein as nucleic acid because of its acidic nature."
},

{
question: "Which sequence correctly represents the historical discoveries?",
options: [
"Altmann → Brown → Miescher",
"Robert Brown → Miescher → Altmann",
"Miescher → Brown → Altmann",
"Miescher → Altmann → Brown"
],
answer: 1,
explanation: "Robert Brown discovered the nucleus first, then Miescher discovered nuclein, and finally Altmann renamed it nucleic acid."
}

];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");

function loadQuestion() {

    selectedOption = null;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.className = "option";

        button.onclick = () => {

            selectedOption = index;

            document.querySelectorAll(".option").forEach(btn =>
                btn.classList.remove("selected")
            );

            button.classList.add("selected");

        };

        optionsElement.appendChild(button);

    });

}

loadQuestion();

const lockButton = document.getElementById("lock-btn");
const feedback = document.getElementById("feedback");

lockButton.onclick = function () {

    if (selectedOption === null) {
        alert("Please select an option first.");
        return;
    }

    const correctAnswer = questions[currentQuestion].answer;
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedOption === correctAnswer) {

        buttons[selectedOption].style.background = "#22C55E";

        feedback.innerHTML = `
        <div style="color:#22C55E;font-weight:bold;font-size:22px;">
        ✅ Concept Clear!
        </div>

        <p style="margin-top:10px;color:#CBD5E1;">
        ${questions[currentQuestion].explanation}
        </p>
        `;

        score++;

    } else {

        buttons[selectedOption].style.background = "#EF4444";

        buttons[correctAnswer].style.background = "#22C55E";

        feedback.innerHTML = `
        <div style="color:#EF4444;font-weight:bold;font-size:22px;">
        ❌ Concept Not Clear Yet!
        </div>

        <p style="margin-top:10px;color:#CBD5E1;">
        ${questions[currentQuestion].explanation}
        </p>
        `;

    }

};
