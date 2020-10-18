// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions :

// 1. Function addTodo STRUCTURE HTML :
{/* <div class="todo">
      <li class="todo-item"></li>
      <button class="complete-btn"></button>
      <button class="trash-btn"></button>
    </div> */}

function addTodo(evt) {
    evt.preventDefault();

    // Creating <div class="todo"></div>
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Creating <li class="todo-item"></li>
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // Adding <li> to <div class="todo">
    todoDiv.appendChild(newTodo);

    // Adding todo to local storage
    saveLocalTodos(todoInput.value);

    // Creating the mark button <button class="complete-btn"></button>
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');

    // Adding <button> to <div class="todo">
    todoDiv.appendChild(completedButton);

    // Creating the trash button <button class="trash-btn"></button>
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');

    // Adding <button> to <div class="todo">
    todoDiv.appendChild(trashButton);

    // Adding <div class="todo"> to <ul class="todo-list">
    todoList.appendChild(todoDiv);

    // Clear todoInput's value
    todoInput.value = "";
};

// 2. Function deleteCheck 

function deleteCheck(evt) {
    const item = evt.target;

    // Delete item
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        // Remove todo from local storage
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    // Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

// 3. Function FILTER

function filterTodo(evt) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {
        switch (evt.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// 4. Function that saves the todos to the Local Storage

function saveLocalTodos(todo) {
    // Check if todo exist already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 5. Function that clears up the local storage
/* localStorage.clear(); */

// 6. Function that loads local storaged todos when the page is loaded
function getTodos() {
    // Check if todo exist already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // Creating <div class="todo"></div>
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Creating <li class="todo-item"></li>
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        // Adding <li> to <div class="todo">
        todoDiv.appendChild(newTodo);

        // Creating the mark button <button class="complete-btn"></button>
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');

        // Adding <button> to <div class="todo">
        todoDiv.appendChild(completedButton);

        // Creating the trash button <button class="trash-btn"></button>
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');

        // Adding <button> to <div class="todo">
        todoDiv.appendChild(trashButton);

        // Adding <div class="todo"> to <ul class="todo-list">
        todoList.appendChild(todoDiv);
    })
};

// 7. Function that removes todos from local storage

function removeLocalTodos(todo) {
    // Check if todo exist already in local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};