let taskList = JSON.parse(localStorage.getItem("tasks")) ?? [];
let taskInput = document.getElementById("add-task-input");
let taskSubmit = document.getElementById("add-task-submit");
let removeAction = document.getElementById("remove-action");

function render(tasks) {
  let renderHTML = tasks
    .map(
      (task, index) =>
        `<div class="task">
        <div class="task-content">
          <div class="task-content-icon" onclick="handleCheck(${index})">
            <img src="./images/${
              task.finished ? "checked" : "unchecked"
            }.png" alt="" />
          </div>
          <p class="task-content-text" >
            <span class="${
              task.finished ? "task-finished" : ""
            }" onclick="handleCheck(${index})">${task.text}</span>
          </p>
        </div>
        <div onclick="handleRemove(${index})" class="task-remove"><i class="fa-solid fa-xmark"></i></div>
      </div>`
    )
    .join("");
  document.querySelector(".tasks").innerHTML = renderHTML;
}
render(taskList);

taskSubmit.onclick = () => {
  if (taskInput.value !== "") {
    taskList.push({
      text: taskInput.value,
      finished: false,
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
    render(taskList);
    taskInput.value = "";
    taskInput.focus();
  }
};

function handleRemove(index) {
  taskList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  render(taskList);
}

function handleCheck(index) {
  if (taskList[index].finished === true) {
    taskList[index].finished = false;
  } else taskList[index].finished = true;
  localStorage.setItem("tasks", JSON.stringify(taskList));
  render(taskList);
}

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    taskSubmit.onclick();
  }
});
