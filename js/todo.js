// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");

const selectFilter = document.querySelector("#filter-select");

let oldInputValue;

let saveTitles = [];

// Funções
function saveTodo(title) {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h2");
  todoTitle.innerText = title;

  const doneBtn = document.createElement("button");
  doneBtn.setAttribute('aria-label', 'Finish task')
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  const editBtn = document.createElement("button");
  editBtn.setAttribute('aria-label', 'Edit task')
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute('aria-label', 'Delete task')
  deleteBtn.classList.add("delete-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  todo.appendChild(todoTitle);
  todo.appendChild(doneBtn);
  todo.appendChild(editBtn);
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);
}

function toggleForms() {
  editForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
  todoForm.classList.toggle("hide");
}

function updateInput(editInputValue) {
  const allElements = document.querySelectorAll(".todo");

  allElements.forEach((item) => {
    const itemTitle = item.querySelector("h2");

    if (itemTitle.innerText === oldInputValue) {
      itemTitle.innerText = editInputValue;
    }
  });
}

function isLocalStorege() {
  const saveLocal = localStorage.titles ? true : false;
  if (saveLocal) {
    saveTitles = JSON.parse(localStorage.titles);
    saveTitles.forEach((item) => {
      saveTodo(item);
    });
  }
}

isLocalStorege();

function searchTodo() {
  const allElements = document.querySelectorAll(".todo");
  const searchInputValue = searchInput.value;

  if (!searchInputValue) {
    allElements.forEach((item) => {
      item.style.display = "flex";
    });
  } else {
    allElements.forEach((item) => {
      const itemTitle = item.querySelector("h2").innerText;

      if (!itemTitle.toLowerCase().includes(searchInputValue.toLowerCase())) {
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    });
  }
}

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);

    saveTitles.push(inputValue);
    localStorage.setItem("titles", JSON.stringify(saveTitles));

    todoInput.value = "";
    todoInput.focus();
  }
});

document.addEventListener("click", (e) => {
  // .target é o alvo
  const targetEl = e.target;
  // closest pega o elemento 'pai' mais proximo
  const parentEl = targetEl.closest("div");
  const h2Parent = parentEl.querySelector("h2");
  let todoTitle;

  if (parentEl && h2Parent) {
    todoTitle = h2Parent.innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    // Toggle poe a class se não existe mais se existir ele tira
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("delete-todo")) {
    // remove
    parentEl.remove();

    saveTitles = saveTitles.filter((item) => item != todoTitle);
    localStorage.setItem("titles", JSON.stringify(saveTitles));
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    // Valor antigo
    oldInputValue = todoTitle;
    editInput.value = todoTitle;
    editInput.focus();
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateInput(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("keyup", () => {
  searchTodo()
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";
  searchInput.focus();
  searchTodo()
});

selectFilter.addEventListener("change", () => {
  const allElements = document.querySelectorAll(".todo");
  const opt = selectFilter.value;

  if (opt === "all") {
    allElements.forEach((item) => {
      item.style.display = "flex";
    });
  } else if (opt === "done") {
    allElements.forEach((item) => {
      const done = item.classList.contains("done");
      if (done) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  } else {
    allElements.forEach((item) => {
      const done = item.classList.contains("done");
      if (!done) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }
});