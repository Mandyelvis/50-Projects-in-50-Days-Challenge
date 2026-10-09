
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Transfer Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Management Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style web pages?",
        options: ["Python", "CSS", "SQL", "Java"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<href>", "<a>", "<url>"],
        answer: 2
    },
    {
        question: "Which keyword declares a block-scoped variable in JavaScript?",
        options: ["define", "varname", "let", "int"],
        answer: 2
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: ["<!-- -->", "//", "**", "##"],
        answer: 1
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClassName()",
            "window.getElement()"
        ],
        answer: 1
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-style", "background", "text-size", "color"],
        answer: 3
    },
    {
        question: "Which HTML tag creates an unordered list?",
        options: ["<ol>", "<li>", "<ul>", "<list>"],
        answer: 2
    },
    {
        question: "Which JavaScript method displays a message in the browser console?",
        options: [
            "console.log()",
            "document.writeLog()",
            "print.console()",
            "message.log()"
        ],
        answer: 0
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style System",
            "Creative Styling Software",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        answer: 2
    }
];

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionElement.textContent = current.question;
    optionsContainer.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "View Results →"
            : "Next Question →";

    const letters = ["A", "B", "C", "D"];

    current.options.forEach(function (option, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "option-button";

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = letters[index];

        const text = document.createElement("span");
        text.textContent = option;

        button.append(letter, text);

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) {
        return;
    }

    answered = true;

    const correctIndex = questions[currentQuestion].answer;
    const optionButtons =
        optionsContainer.querySelectorAll(".option-button");

    optionButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;

        selectedButton.classList.add("correct");
        feedback.textContent = "Correct! Great job.";
        feedback.classList.add("success");
    } else {
        selectedButton.classList.add("incorrect");
        optionButtons[correctIndex].classList.add("correct");

        feedback.textContent =
            `Not quite. The correct answer is: ${
                questions[currentQuestion].options[correctIndex]
            }`;

        feedback.classList.add("error");
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function showResults() {
    quizCard.hidden = true;
    resultCard.hidden = false;

    finalScore.textContent = `${score}/${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "Perfect Score!";
        resultMessage.textContent =
            "Outstanding! You answered every question correctly.";
    } else if (percentage >= 70) {
        resultIcon.textContent = "🎉";
        resultTitle.textContent = "Excellent Work!";
        resultMessage.textContent =
            "You have a strong understanding of these web development basics.";
    } else if (percentage >= 40) {
        resultIcon.textContent = "👏";
        resultTitle.textContent = "Good Effort!";
        resultMessage.textContent =
            "You're making progress. Keep practising to improve your score.";
    } else {
        resultIcon.textContent = "💪";
        resultTitle.textContent = "Keep Learning!";
        resultMessage.textContent =
            "Every attempt helps you improve. Review the basics and try again.";
    }
}

nextButton.addEventListener("click", function () {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    answered = false;

    resultCard.hidden = true;
    quizCard.hidden = false;

    showQuestion();
});

showQuestion();
