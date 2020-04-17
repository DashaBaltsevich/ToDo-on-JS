'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    input = document.querySelector('input'),
    todoItem = document.querySelector('.todo-item'),
    todoRemove = document.querySelector('.todo-remove'),
    text = document.querySelector('.text-todo');

const todoData = [];
const render = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';
        todoList.append(li);

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        // Удаление дел на кнопку КОРЗИНА
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function () {
            todoData.splice(todoData.indexOf(item), 1);
            render();
        });

    });
};



todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    
    
    // Пустые дела добавляться не должны
    if (headerInput.value.trim() !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
    }


    localStorage.setItem('memory' , JSON.stringify(todoData));

    let showText = function () {
        let text = document.querySelector('.text-todo');
        let array = localStorage.getItem('memory', JSON.stringify(todoData));
        // let array = JSON.parse(localStorage.getItem('memory'));
        console.log(array);
    };

    render();
    // Поле ввода после добавления дела должно очищаться
    input.value = '';

    showText();
});

render();

