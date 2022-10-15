// FUNCTION: Select Elements by Id
const el = (elm) => document.getElementById(elm);

// FUNCTION: Select by  querySelector
const qs = (elm) => document.querySelector(elm);

// FUNCTION: Select by querySelectorAll
const qsa = (elm) => document.querySelectorAll(elm);

//Selecting DOM Elements............................................................................
const [themeBtn, rootDocument, iconContainer, form, todoInput, todoList] = [
  el("themeBtn"),
  qs(":root"),
  qs(".icon"),
  el("form"),
  el("todoInput"),
  qs(".todos"),
];

// Toggle dark and light themes;
document.addEventListener("DOMContentLoaded", () => {
  let theme =
    JSON.parse(localStorage.getItem("todoTheme")) ||
    localStorage.setItem("todoTheme", JSON.stringify("dark"));
  rootDocument.setAttribute("color-scheme", `${theme}`);
  iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <path fill="#FFF" fill-rule="evenodd"
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
        </svg>`;
});

iconContainer.addEventListener("click", () => {
  theme = JSON.parse(localStorage.getItem("todoTheme"));
  if (theme === "light") {
    localStorage.setItem("todoTheme", JSON.stringify("dark"));
    rootDocument.setAttribute("color-scheme", `dark`);
    iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
  } else {
    localStorage.setItem("todoTheme", JSON.stringify("light"));
    rootDocument.setAttribute("color-scheme", `light`);
    iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <path fill="#FFF" fill-rule="evenodd"
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
        </svg>`;
  }
});

// When the document has loaded, get all todos from local storage and display them
document.addEventListener("DOMContentLoaded", () => {
  displayTodos();
  getRemainingTodos();
});

// ---------------------------------TODO FUNCTIONALITY --------------------------------
// CLASS: Create todo
class Todo {
  constructor(todo) {
    this.todo = todo;
    this.id = Math.random();
    this.done = false;
  }
}

// ----------------------------------------------------------------ALL FUNCTIONS--------------------
//LOCAL STORAGE.........................................................................
//FUNCTION Set Local Storage
function setLocalStorage(todos) {
  localStorage.setItem("Portifolio_Todos", JSON.stringify(todos));
}

//FUNCTION: Retrieve todos from local storage.....................................................
function getTodosFromLS() {
  let todos;
  if (localStorage.getItem("Portifolio_Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Portifolio_Todos"));
  }
  return todos;
}

//FUNCTION: Add todos to local storage...................................................................
function addTodosToLS(todo) {
  let todos = getTodosFromLS();
  todos.push(todo);
  setLocalStorage(todos);
}

//FUNCTION: Display todos form local storage to the UI.........................................................
function displayTodos() {
  let todos = getTodosFromLS();
  todos.forEach((todo) => {
    addTodos(todo);
  });
}

// FUNCTION: Delete todo from localStorage-------------------------
function deleteTodosFromLS(id) {
  let todos = getTodosFromLS();
  todos.forEach((todo, index) => {
    if (todo.id === id) {
      todos.splice(index, 1);
    }
  });
  setLocalStorage(todos);
}

// FUNCTION: Mark completed todos.............................................................
function completeTodos(id, todo) {
  todo.classList.toggle("completed");
  let todos = getTodosFromLS();
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.done = todo.done ? false : true;
      setLocalStorage(todos);
    }
  });
}

//FUNCTION: Show uncompleted todos....................................................................
function getRemainingTodos() {
  let todos = getTodosFromLS();
  const todosRemaining = todos.filter(
    (todoRemaining) => todoRemaining.done === false
  );
  qs(".items-left").innerHTML =
    "<p>" + todosRemaining.length + " todo(s) left</p>";
}

//FUNCTION: Show all todos.................................................................................
function showAllTodos() {
  todoList.innerHTML = "";
  let todos = getTodosFromLS();
  todos.forEach((todo) => {
    addTodos(todo);
  });
}

//FUNCTION: Show active todos..................................................................................
function showActiveTodos() {
  todoList.innerHTML = "";
  let todos = getTodosFromLS();
  const activeTodos = todos.filter((activeTodo) => activeTodo.done === false);
  activeTodos.forEach((activeTodo) => {
    addTodos(activeTodo);
  });
}
//FUNCTION: Show Completed todos only..................................................................................
function showCompletedTodos() {
  todoList.innerHTML = "";
  let todos = getTodosFromLS();
  const todosCompleted = todos.filter((todoCompleted) => todoCompleted.done);
  todosCompleted.forEach((todoCompleted) => {
    addTodos(todoCompleted);
  });
}

// FUNCTION: Add todo function
function addTodos(todo) {
  var { todo, id, done } = todo;
  let todoHtml = `
  <li class="flex justify-between align-center ${
    done ? "completed" : ""
  }"  draggable="true" id="${id}" data-id="">
          <div class="todo-check flex align-center gap-2 ml-2">
            <span class="check-circle"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" class="check">
                <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg></span>
            <span class="todo-text" contenteditable="true" id="${id}">${todo}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" id="${id}"  class="delete">
              <path fill="#494C6B" fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
            </svg>
        </li>
  `;
  const position = "beforeend";
  todoList.insertAdjacentHTML(position, todoHtml);
}

// --------------------------------------ALL EVENTS----------------------------------------------------------------

// TODO: Add EventListener to the form to submit the typed todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = todoInput.value;
  if (!todo) return;
  let newTodo = new Todo(todo);
  addTodos(newTodo);
  addTodosToLS(newTodo);
  todoInput.value = "";
  getRemainingTodos();
});

//Todo container Event................................................................................
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todo = e.target.closest("li");
    const id = todo.id;
    todo.classList.add("fall");
    todo.addEventListener("animationend", () => {
      todo.remove();
    });
    deleteTodosFromLS(Number(id));
    getRemainingTodos();
  } else if (e.target.classList.contains("check-circle")) {
    const ClickedTodo = e.target;
    const todo = ClickedTodo.closest("li");
    const id = todo.id;
    completeTodos(Number(id), todo);
    getRemainingTodos();
  }
});

//FUNCTION: Remove active class from all, active and completed element................................................
function removeActive() {
  qsa(".toggle_todos").forEach((toggleTodo) => {
    toggleTodo.classList.remove("active");
  });
}

// TODO: Clear all the completed todos from localStorage
qs(".clear").addEventListener("click", () => {
  todoList.innerHTML = "";
  let todos = getTodosFromLS();
  const unCompletedTodos = todos.filter((todo) => todo.done === false);
  unCompletedTodos.forEach((unCompletedTodo) => {
    addTodos(unCompletedTodo);
  });
  setLocalStorage(unCompletedTodos);
});

//Toggle active class btn the all, active and completed elements.............................................................
qsa(".toggle_todos").forEach((toggleTodo) => {
  toggleTodo.addEventListener("click", (e) => {
    removeActive();
    e.target.classList.add("active");
    if (e.target.classList.contains("allTodos")) {
      showAllTodos();
    } else if (e.target.classList.contains("activeTodos")) {
      showActiveTodos();
    } else if (e.target.classList.contains("completedTodos")) {
      showCompletedTodos();
    }
  });
});

qsa(".todo-text").forEach((todo) => {
  todo.addEventListener("blur", () => {
    console.log("Hello");
  });
});
