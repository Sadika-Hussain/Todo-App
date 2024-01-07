// Selecting DOM elements
const submit = document.querySelector('#submit');
const ul = document.querySelector('ul');
const input = document.querySelector('#task');
let hasCheckedToDo = false;

// Load stored items from localStorage on page load
if (localStorage.toDos) {
    const storedItems = JSON.parse(localStorage.toDos);
    for (let item of storedItems) {
        const newLi = createListItem(item);
        ul.append(newLi);
    }
}

// Event listener for adding a new item to the list
submit.addEventListener('click', function(e) {
    e.preventDefault();
    const inputValue = input.value.trim();
    if (inputValue !== '') {
        const newLi = createListItem({ text: inputValue, completed: false });
        ul.prepend(newLi);
        saveToLocalStorage();
    }
    input.value = '';
});

// Event listener for handling actions on list items
ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'DIV' || e.target.classList.contains('list-bullet')) {
        e.target.parentElement.children[1].classList.toggle('completed');
        e.target.parentElement.children[0].classList.toggle('checked');
        saveToLocalStorage();
    }
    if (e.target.tagName === 'BUTTON') {
        const liToRemove = e.target.parentElement;
        const indexOfLi = Array.from(ul.children).indexOf(liToRemove);
        liToRemove.remove();
        removeFromLocalStorage(indexOfLi);
    }
});

// Function to create a new list item
function createListItem(item) {
    const newLi = document.createElement('li');
    const listBullet = document.createElement('span');
    const listText = document.createElement('div');

    listBullet.classList.add('list-bullet');
    listText.classList.add('list-text');
    listText.innerText = item.text;

    if (item.completed) {
        listText.classList.add('completed');
        listBullet.classList.add('checked');
        hasCheckedToDo = true;
    }
    newLi.append(listBullet, listText);
    if(!listText.classList.contains('completed')) {
        appendDeleteBtn(newLi);
    }
    return newLi;
}

// Function to append a delete button to a list item
function appendDeleteBtn(element) {
    const btn = document.createElement('button');
    btn.innerText = "Delete";
    element.appendChild(btn);
}

// Function to save the current state to localStorage
function saveToLocalStorage() {
    const items = [];
    for (let element of ul.children) {
        const text = element.children[1].textContent; 
        const completed = element.children[1].classList.contains('completed');
        items.push({ text, completed });
    }
    localStorage.setItem('toDos', JSON.stringify(items));
}

// Function to remove an item from localStorage
function removeFromLocalStorage(index) {
    if (localStorage.toDos) {
        const storedItems = JSON.parse(localStorage.toDos);
        storedItems.splice(index, 1);
        localStorage.setItem('toDos', JSON.stringify(storedItems));
        if (storedItems.length === 0) {
            localStorage.removeItem('toDos');
        }
    }
}

// Create 'Remove Checked' button if there are completed items
if (hasCheckedToDo) {
    const removeCheckedBtn = document.createElement('button');
    removeCheckedBtn.innerText = "Remove Checked";
    document.getElementById('removeChecked').append(removeCheckedBtn);

    removeCheckedBtn.addEventListener('click', function(e) {
        const checked = document.querySelectorAll('.checked');
        for (let item of checked) {
            const liToRemove = item.parentElement;
            const indexOfLi = Array.from(ul.children).indexOf(liToRemove);
            liToRemove.remove();
            e.target.remove();
            removeFromLocalStorage(indexOfLi);
        }
    });
}




















































// const submit = document.querySelector('#submit');
// const ul = document.querySelector('ul');
// const input = document.querySelector('#task');
// let hasCheckedToDo = false;

// if (localStorage.toDos) {
//     const storedItems = JSON.parse(localStorage.toDos);
//     for (let item of storedItems) {
//         const newLi = document.createElement('li');
//         const listBullet = document.createElement('span');
//         const listText = document.createElement('div');
//         const { completed } = item;
//         if(completed) {
//             listText.classList.add('completed');
//             listBullet.classList.add('checked');    
//             hasCheckedToDo = true;
//         } else { 
//             listText.classList.remove('completed');
//         }
//         const content = item.text;
//         listBullet.classList.add('list-bullet');
//         listText.classList.add('list-text');
//         listText.innerText = content;
//         newLi.append(listBullet);
//         newLi.append(listText);
//         if(!listText.classList.contains('completed')) {
//             appendDeleteBtn(newLi);
//         }
//         ul.append(newLi);
//     }
// }

// submit.addEventListener('click', function(e) {
//     e.preventDefault();
//     const inputValue = input.value.trim(); 
//     if (inputValue !== '') {
//         const newLi = document.createElement('li');
//         const listBullet = document.createElement('span');
//         const listText = document.createElement('div');
//         listBullet.className = ('list-bullet');
//         listText.className = ('list-text');
//         listText.innerText = inputValue;
//         newLi.append(listBullet);
//         newLi.append(listText);
//         appendDeleteBtn(newLi);
//         ul.prepend(newLi);
//         saveToLocalStorage();
//     }
//     input.value = '';
// });

// ul.addEventListener('click', function(e) {
//     if (e.target.tagName === 'DIV' || e.target.classList.contains('list-bullet')) {
//         e.target.parentElement.children[1].classList.toggle('completed');
//         e.target.parentElement.children[0].classList.toggle('checked');
//         saveToLocalStorage();
//     }
//     if (e.target.tagName === 'BUTTON') {
//         const liToRemove = e.target.parentElement;
//         const indexOfLi = Array.from(ul.children).indexOf(liToRemove);
//         liToRemove.remove();
//         removeFromLocalStorage(indexOfLi);
//     }
// });

// function appendDeleteBtn (element) {
//     const btn = document.createElement('button');
//     btn.innerText = "Delete";
//     element.appendChild(btn);
// }

// function saveToLocalStorage() {
//     const items = [];
//     for (let element of ul.children) {
//         const text = element.children[1].textContent;
//         const item = {
//             text: text,
//             completed: false
//         }; 
//         if(element.children[1].classList.contains('completed')) {
//             item.completed = true;
//         }
//         items.push(item);
//     }
//     localStorage.setItem('toDos', JSON.stringify(items));
// }

// function removeFromLocalStorage(index) {
//     if (localStorage.toDos) {
//         const storedItems = JSON.parse(localStorage.toDos);
//         storedItems.splice(index, 1);
//         localStorage.setItem('toDos', JSON.stringify(storedItems));
//         const checking = localStorage.getItem('toDos');
//         if(JSON.parse(checking).length === 0) {
//             localStorage.removeItem('toDos');
//         }
//     }
// }
// console.log(ul.children.length)

// if(hasCheckedToDo) {
//     const btn = document.createElement('button');
//     btn.innerText = "Remove Checked";
//     document.getElementById('removeChecked').append(btn);
//     btn.addEventListener('click', function(e) {
//         const checked = document.querySelectorAll('.checked');
//         for(let item of checked) {
//             const liToRemove = item.parentElement;
//             const indexOfLi = Array.from(ul.children).indexOf(liToRemove);
//             item.parentElement.remove();
//             e.target.remove();
//             removeFromLocalStorage(indexOfLi);
//         }
//     });
// }









 



