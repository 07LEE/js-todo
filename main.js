

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mod = "all";

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) { filter(event) })
}

function addTask() {
    let task = {
        id: randomID(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function randomID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function render() {
    let list = []

    if (mod == "all") {
        list = taskList;
    } else if (mod == "ongoing" || mod == "done") {
        list = filterList;
    }

    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }
    }
    document.getElementById("task-bord").innerHTML = resultHTML
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
}

function deleteTask(id) {
    console.log('id', id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render()
}

function filter(event) {
    filterList = []
    mod = event.target.id;
    console.log(event.target);
    if (mod == "all") {
        render();
    } else if (mod == "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }

    } else if (mod === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    } render();
}