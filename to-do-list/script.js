let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text: text, completed: false });
    saveTasks();
    input.value = "";
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
  }
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
  }
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.className = "task-text";
    taskSpan.title = "Click to toggle complete/incomplete";
    taskSpan.onclick = () => toggleComplete(index);

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    // Complete Icon
    const completeBtn = document.createElement("i");
    completeBtn.className = "fas fa-check-circle";
    completeBtn.title = "Toggle Complete";
    completeBtn.onclick = () => toggleComplete(index);

    // Edit Button with Icon and Text
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fas fa-edit"></i> Edit`;
    editBtn.title = "Edit Task";
    editBtn.onclick = () => editTask(index);

    // Delete Button with Icon and Text
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i> Delete`;
    deleteBtn.className = "delete";
    deleteBtn.title = "Delete Task";
    deleteBtn.onclick = () => deleteTask(index);

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(actionsDiv);
    list.appendChild(li);
  });
}

// Initial load
renderTasks();
