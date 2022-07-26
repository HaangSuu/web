let todoListElement = document.getElementById('todo-list');

let filter = 'all';

let allTodolist = [];
let activeTodolist = [];
let complateTodolist = [];

function createTodoItem(todo = defaulttodo) /* todo element */ {
  let template = document.getElementById('todo-item-template');
  let fragment = document.importNode(template.content, true);

  let item = fragment.querySelector('li');
  item.id = todo.id;

  let textElement = fragment.querySelector('p');
  textElement.textContent = todo.text;

  let checkbox = fragment.querySelector('input');
  checkbox.checked = todo.checked;
  checkbox.addEventListener('change', (e) => {
    updateTodoList((todoList) => {
      return todoList.map((target) => {
        if (target.id === todo.id) {
          return {
            ...target,
            checked: e.target.checked,
          };
        } else {
          return target;
        }
      });
    });
  });

  let deleteButton = fragment.querySelector('button');
  deleteButton.addEventListener('click', (e) => {
    updateTodoList((todoList) => {
      return todoList.filter((p) => p.id !== todo.id);
    });
  });

  return fragment;
}

function renderTodoList() {
  function getCurrentTodoList() {
    switch (filter) {
      case 'all':
        return allTodolist;
      case 'active':
        return activeTodolist;
      case 'completed':
        return complateTodolist;
    }
  }

  let todoList = getCurrentTodoList();

  todoListElement.textContent = '';
  for (let todo of todoList) {
    let todoItem = createTodoItem(todo);
    todoListElement.appendChild(todoItem);
  }
}

export function updateTodoList(updater) {
  allTodolist = updater(allTodolist);

  activeTodolist = allTodolist.filter((todo) => todo.checked === false);

  complateTodolist = allTodolist.filter((todo) => todo.checked === true);

  renderTodoList();
}

export function setTodoListFilter(newFilter) {
  filter = newFilter;

  renderTodoList();
}
