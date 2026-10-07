const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearTasksButton = document.getElementById("clearTasks");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];

function updateTaskDisplay() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        listItem.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">${task.text}</span>

            <button class="delete-task">Delete</button>
        `;

        const checkbox = listItem.querySelector(".task-checkbox");
        const deleteButton = listItem.querySelector(".delete-task");

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            updateTaskDisplay();
        });

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            updateTaskDisplay();
        });

        taskList.appendChild(listItem);
    });

    const totalTasks = tasks.length;

    taskCount.textContent =
        totalTasks === 1 ? "1 task" : `${totalTasks} tasks`;

    emptyMessage.style.display =
        totalTasks === 0 ? "block" : "none";
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    updateTaskDisplay();
    taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearTasksButton.addEventListener("click", function () {
    tasks = [];
    updateTaskDisplay();
});

updateTaskDisplay();