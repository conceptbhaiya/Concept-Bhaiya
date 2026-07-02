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
