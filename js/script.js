
// JS projects n_5
const pFiveForm = document.querySelector(".form-5");
const taskText = document.querySelector('[type="text"]');
const taskSubmit = pFiveForm.querySelector('[type="submit"]');
const conTasks = document.querySelector(".con-tasks");
const pFiveCon = document.querySelector(".p5-con");
const clearItems = document.querySelector(".clear-items");
const alertBox = document.querySelector(".alert-box");
let arrTasks = [];
let editTask = false;
pFiveForm.addEventListener("submit", playNewTask);

if (localStorage.getItem("tasks")) {
  arrTasks = JSON.parse(localStorage.getItem("tasks"));
  for (let j = 0; j < arrTasks.length; j++) {
    let newTaskItem = document.createElement("div");
    newTaskItem.classList.add("task-item");
    newTaskItem.setAttribute("data-id", arrTasks[j].id);
    let parTask = document.createElement("p");
    parTask.classList.add("task-value");
    let textTask = document.createTextNode(arrTasks[j].value);
    parTask.appendChild(textTask);
    newTaskItem.appendChild(parTask);
    let taskControl = document.createElement("div");
    taskControl.classList.add("task-control");
    let butEdit = document.createElement("button");
    butEdit.classList.add("edit-task");
    butEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    taskControl.appendChild(butEdit);
    let butDelete = document.createElement("button");
    butDelete.classList.add("delete-task");
    butDelete.innerHTML = `<i class="fa-solid fa-trash"> </i>`;
    taskControl.appendChild(butDelete);
    newTaskItem.appendChild(taskControl);
    conTasks.appendChild(newTaskItem);
    butDelete.onclick = function () {
      alertBoxShow("Item Deleted", "rgb(255, 193, 240)");
      for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i].id == newTaskItem.getAttribute("data-id")) {
          arrTasks.splice(i, 1);
        }
      }
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
      newTaskItem.remove();
      if (editTask) {
        taskText.value = "";
        taskSubmit.value = "Submit";
        editTask = false;
      }
    };
    butEdit.onclick = function () {
      editTask = true;
      valueToEdit = butEdit.parentElement.parentElement.firstChild;
      parentId = butEdit.parentElement.parentElement.dataset.id;
      taskSubmit.value = "Edit";
      taskText.value = valueToEdit.textContent;
    };
  }
}

function playNewTask(e) {
  e.preventDefault();
  let taskValue = taskText.value;
  // pFiveCon
  if (taskValue == "") {
    alertBoxShow("Please Enter Value", "rgb(252, 149, 183)");
  } else if (cheakTaskWriten(taskValue) && !editTask) {
    alertBoxShow("Task Is already Writen", "rgb(161, 241, 255)");
  } else if (taskValue !== "" && !cheakTaskWriten(taskValue) && !editTask) {
    const taskId = new Date().getTime();

    let newTaskItem = document.createElement("div");
    newTaskItem.classList.add("task-item");
    newTaskItem.setAttribute("data-id", taskId);
    let parTask = document.createElement("p");
    parTask.classList.add("task-value");
    let textTask = document.createTextNode(taskValue);
    parTask.appendChild(textTask);
    newTaskItem.appendChild(parTask);
    let taskControl = document.createElement("div");
    taskControl.classList.add("task-control");
    let butEdit = document.createElement("button");
    butEdit.classList.add("edit-task");
    butEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    taskControl.appendChild(butEdit);
    let butDelete = document.createElement("button");
    butDelete.classList.add("delete-task");
    butDelete.innerHTML = `<i class="fa-solid fa-trash"> </i>`;
    taskControl.appendChild(butDelete);
    newTaskItem.appendChild(taskControl);
    conTasks.appendChild(newTaskItem);
    let taskObj = {
      id: taskId,
      value: taskValue,
    };
    arrTasks.push(taskObj);
    taskText.value = "";
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
    alertBoxShow("Item Added To The List", "rgb(183, 241, 183)");
    // Delete
    butDelete.onclick = function () {
      alertBoxShow("Item Deleted", "rgb(255, 193, 240)");
      for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i].id == newTaskItem.getAttribute("data-id")) {
          arrTasks.splice(i, 1);
        }
      }
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
      newTaskItem.remove();
      if (editTask) {
        taskText.value = "";
        taskSubmit.value = "Submit";
        editTask = false;
      }
      showClearItems();
    };
    butEdit.onclick = function () {
      editTask = true;
      valueToEdit = butEdit.parentElement.parentElement.firstChild;
      parentId = butEdit.parentElement.parentElement.dataset.id;
      taskSubmit.value = "Edit";
      taskText.value = valueToEdit.textContent;
      for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i].id == parentId) {
        }
      }
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
    };
  } else if (editTask) {
    valueToEdit.textContent = taskText.value;
    alertBoxShow("Value Changed", "rgb(188, 245, 218)");
    for (let i = 0; i < arrTasks.length; i++) {
      if (arrTasks[i].id == parentId) {
        arrTasks[i].value = taskText.value;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(arrTasks));
    taskText.value = "";
    taskSubmit.value = "Submit";
    editTask = false;
  }

  showClearItems();
}

function cheakTaskWriten(checkTask) {
  allTasks = document.querySelectorAll(".task-value");
  foundTask = false;
  allTasks.forEach((e) => {
    if (e.textContent === checkTask) {
      foundTask = true;
    }
  });
  return foundTask;
}
function alertBoxShow(textAlertBox, alertBoxBg) {
  alertBox.textContent = textAlertBox;
  alertBox.style.backgroundColor = alertBoxBg;
  setTimeout(function () {
    alertBox.textContent = ``;
    alertBox.style.backgroundColor = `transparent`;
  }, 4000);
}

clearItems.addEventListener("click", () => {
  document.querySelectorAll(".task-item").forEach((e) => {
    e.remove();
  });
  alertBoxShow("Empty List", "rgb(255, 192, 192)");
  clearItems.style.display = "none";
  arrTasks = [];
  localStorage.clear();
});

function showClearItems() {
  if (document.querySelectorAll(".task-item").length) {
    clearItems.style.display = "block";
  } else {
    clearItems.style.display = "none";
  }
}
showClearItems();