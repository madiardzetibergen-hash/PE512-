const input = document.getElementById("input");
const addBtn = document.getElementById("addTaskBtn");
const list = document.getElementById("tasksList");

let tasks = [];

// Сохранение в localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Загрузка из localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
  }
}

// Отрисовка задач
function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<li class="empty">Пока задач нет</li>`;
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const oneTask = document.createElement("li");
    oneTask.className = "task-item";
    oneTask.setAttribute("data-id", tasks[i].id);

    if (tasks[i].done) {
      oneTask.classList.add("done");
    }

    oneTask.innerHTML = `
      <span class="task-text">${tasks[i].text}</span>
      <div class="task-actions">
        <button class="delete-btn">Удалить</button>
      </div>
    `;

    list.appendChild(oneTask);
  }
}

// Добавление задачи
addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") {
    alert("Введите задачу");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    done: false,
  };

  tasks.push(newTask);
  saveTasks();
  render();

  input.value = "";
  input.focus();
});

// Добавление по Enter
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

// Делегирование событий
list.addEventListener("click", (event) => {
  const parentLi = event.target.closest(".task-item");

  if (!parentLi) return;

  const taskId = Number(parentLi.dataset.id);

  // Удаление
  if (event.target.classList.contains("delete-btn")) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks.splice(i, 1);
        break;
      }
    }

    saveTasks();
    render();
  }

  // Переключение done
  if (event.target.classList.contains("task-text")) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        tasks[i].done = !tasks[i].done;
        break;
      }
    }

    saveTasks();
    render();
  }
});

// Старт
loadTasks();
render();