// TODO: Create guards and input validation
// TODO: Add drag and drop capabilities

// GLOBAL VARIABLES
const form = document.querySelector('[data-form]');
const input = document.querySelector('[data-formInput]');
const addBtn = document.querySelector('[data-addBtn]');
const list = document.querySelector('[data-list]');

let tempStorageList = [];
// localStorage will be what ever tempStorage holds and at load time, tempStorage will be what ever value is stored in localStorage as long as the listItem key exists
if (localStorage.listItem == null) {
  localStorage.listItem = tempStorageList;
} else {
  tempStorageList = JSON.parse(localStorage.listItem);
}

// FUNCTIONS
/**
 * @param  {String} input
 */
function handleElementCreation(input) {
  const li = document.createElement('li');
  li.dataset.listItem = input;
  li.textContent = input;

  const deleteBtn = document.createElement('button');
  deleteBtn.dataset.deleteBtn = 'delete';
  deleteBtn.classList.add('btn', 'btn--delete');
  deleteBtn.textContent = 'X';

  li.append(deleteBtn);
  list.append(li);
}

/**
 * @param  {Event} e
 */
function createTodo(e) {
  e.preventDefault();

  // save data
  tempStorageList.push(input.value);
  localStorage.setItem('listItem', JSON.stringify(tempStorageList));

  // create new todo
  handleElementCreation(input.value);

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

  // add saved todo's on page load
  for (const listItem of storedListItems) {
    handleElementCreation(listItem);
  }
});

form.addEventListener('submit', createTodo);

list.addEventListener('click', deleteTodo);
