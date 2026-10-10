
const gradeForm = document.getElementById("gradeForm");
const studentName = document.getElementById("studentName");
const subjectList = document.getElementById("subjectList");
const subjectCount = document.getElementById("subjectCount");
const formError = document.getElementById("formError");

const resultsCard = document.getElementById("resultsCard");
const resultName = document.getElementById("resultName");
const resultSummary = document.getElementById("resultSummary");
const gradeBadge = document.getElementById("gradeBadge");
const totalScore = document.getElementById("totalScore");
const averageScore = document.getElementById("averageScore");
const finalGrade = document.getElementById("finalGrade");
const breakdown = document.getElementById("breakdown");
const resetButton = document.getElementById("resetButton");

const subjects = [
    { name: "Mathematics", inputId: "score1" },
    { name: "English", inputId: "score2" },
    { name: "Computer Science", inputId: "score3" }
];

subjectCount.textContent =
    `${subjects.length} Subjects`;

function getGrade(average) {
    if (average >= 70) return "A";
    if (average >= 60) return "B";
    if (average >= 50) return "C";
    if (average >= 45) return "D";
    if (average >= 40) return "E";
    return "F";
}

function getRemark(grade) {
    const remarks = {
        A: "Excellent performance!",
        B: "Very good performance!",
        C: "Good effort. Keep improving!",
        D: "Fair performance. More practice will help.",
        E: "You passed, but there is room to improve.",
        F: "Keep studying and try again."
    };

    return remarks[grade];
}

gradeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formError.textContent = "";

    const name = studentName.value.trim();

    if (!name) {
        formError.textContent = "Please enter the student's name.";
        studentName.focus();
        return;
    }

    const scores = [];

    for (const subject of subjects) {
        const input = document.getElementById(subject.inputId);
        const rawValue = input.value.trim();
        const score = Number(rawValue);

        if (
            rawValue === "" ||
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
        ) {
            formError.textContent =
                `Enter a valid score from 0 to 100 for ${subject.name}.`;

            input.focus();
            return;
        }

        scores.push({
            name: subject.name,
            score: score
        });
    }

    const total = scores.reduce(function (sum, subject) {
        return sum + subject.score;
    }, 0);

    const average = total / scores.length;
    const grade = getGrade(average);

    resultName.textContent = name;
    resultSummary.textContent = getRemark(grade);

    totalScore.textContent = `${total}/${scores.length * 100}`;
    averageScore.textContent = `${average.toFixed(1)}%`;
    finalGrade.textContent = grade;
    gradeBadge.textContent = grade;

    breakdown.innerHTML = "";

    scores.forEach(function (subject) {
        const row = document.createElement("div");
        row.className = "breakdown-row";

        const top = document.createElement("div");
        top.className = "breakdown-top";

        const subjectName = document.createElement("span");
        subjectName.textContent = subject.name;

        const subjectScore = document.createElement("span");
        subjectScore.textContent =
            `${subject.score}/100 · Grade ${getGrade(subject.score)}`;

        top.append(subjectName, subjectScore);

        const track = document.createElement("div");
        track.className = "score-track";

        const fill = document.createElement("div");
        fill.className = "score-fill";
        fill.style.width = `${subject.score}%`;

        track.appendChild(fill);
        row.append(top, track);
        breakdown.appendChild(row);
    });

    resultsCard.hidden = false;
    resultsCard.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

resetButton.addEventListener("click", function () {
    gradeForm.reset();
    resultsCard.hidden = true;
    formError.textContent = "";
    breakdown.innerHTML = "";

    studentName.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
