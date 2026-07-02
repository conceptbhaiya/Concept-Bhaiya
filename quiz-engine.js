const lecture = lectureData;

let currentQuestion = 0;
let score = 0;
let totalTime = 0;

let questionStartTime = null;

let questionStatus = [];

lecture.questions.forEach(() => {

    questionStatus.push({

        selectedOption: null,

        locked: false,

        skipped: false,

        timeTaken: 0

    });

});

function loadQuestion() {

    const question = lecture.questions[currentQuestion];

    console.log(question);

}
