import { setTodoListFilter, updateTodoList } from './todoList.js';

let todoFormElement = document.getElementById('todo-form');
let todoInputElement = document.getElementById('todo-input');

let idSeq = 0;
let filter = (window.location.hash || '#all').slice(1);
setTodoListFilter(filter);

todoFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  let value = todoInputElement.value;
  todoInputElement.value = '';

  updateTodoList((todoList) => {
    let todo = {
      id: idSeq++,
      text: value,
      checked: false,
    };
    todoList.push(todo);
    return todoList;
  });
});

window.addEventListener('hashchange', () => {
  let filter = (window.location.hash || '#all').slice(1);
  setTodoListFilter(filter);
});
