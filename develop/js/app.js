// TODO: Use JsDoc for functions
// TODO: Create guards and input validation
// TODO: Re-factor code (especially re-used code)
// TODO: Add drag and drop capabilities
// TODO: Host it and turn it into Chrome's homepage (since the url bar also works as a search bar, its okay to give up the one in the middle of the page)

// SUDO CODE

// High Level
// 1) When something is typed in the input and either enter is pressed or button is clicked, save data somewhere ✅
// 2) When user inputs text, create a new todo ✅
// 3) When delete button is pressed, get rid of todo ✅
// 4) Save todo's ✅

// Low Level
// 1) Create event listener for form element and create a singleton that will hold the user inputs
// 2) Create new list item (and delete btn) on event and give it the value of the user input
// 3) Listen for click event on delete button, delete todo and remove it from localStorage

// GLOBAL VARIABLES
const form = document.querySelector('[data-form]');
const input = document.querySelector('[data-formInput]');
const addBtn = document.querySelector('[data-addBtn]');
const list = document.querySelector('[data-list]');

let tempStorageList = [];
if (localStorage.listItem == null) {
  localStorage.listItem = tempStorageList;
} else {
  tempStorageList = JSON.parse(localStorage.listItem);
}

// FUNCTIONS

/**
 * @param  {Event} e
 */
function createTodo(e) {
  e.preventDefault();

  // save data
  tempStorageList.push(input.value);
  localStorage.setItem('listItem', JSON.stringify(tempStorageList));

  // create new todo
  const li = document.createElement('li');
  li.dataset.listItem = input.value;
  li.textContent = input.value;

  const deleteBtn = document.createElement('button');
  deleteBtn.dataset.deleteBtn = 'delete';
  deleteBtn.classList.add('btn', 'btn--delete');
  deleteBtn.textContent = 'X';

  li.append(deleteBtn);
  list.append(li);

  // clear input field
  input.value = '';
}

/**
 * @param  {Event} e
 */
function deleteTodo(e) {
  if (e.target.dataset.deleteBtn == 'delete') {
    const item = e.target.parentElement.dataset.listItem;
    const index = tempStorageList.indexOf(item);
    // remove item from array
    tempStorageList.splice(index, 1);
    localStorage.setItem('listItem', JSON.stringify(tempStorageList));
    // remove item from todo list
    e.target.parentElement.remove();
  }
}

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', () => {
  let storedListItems;
  if (localStorage.listItem != null) {
    storedListItems = JSON.parse(localStorage.listItem);
  }

  for (const listItem of storedListItems) {
    const li = document.createElement('li');
    li.dataset.listItem = listItem;
    li.textContent = listItem;

    const deleteBtn = document.createElement('button');
    deleteBtn.dataset.deleteBtn = 'delete';
    deleteBtn.classList.add('btn', 'btn--delete');
    deleteBtn.textContent = 'X';

    li.append(deleteBtn);
    list.append(li);
  }
});

form.addEventListener('submit', createTodo);

list.addEventListener('click', deleteTodo);
