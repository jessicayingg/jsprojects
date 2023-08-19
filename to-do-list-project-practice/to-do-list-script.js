// add-button event listener
document.querySelector('.js-add')
    .addEventListener('click', () => {
        addToList();
        displayList();
    });

const toDoList = [];

function addToList() {
    // DON'T FORGET THAT IT'S .VALUE FOR INPUT ELEMENTS!
    const inputElement = document.querySelector('.js-task-input');
    const dateElement = document.querySelector('.js-date-input');

    const inputObject = {
        name: inputElement.value,
        date: dateElement.value
    } ;

    toDoList.push(inputObject);

    //console.log(toDoList.length);

    inputElement.value = '';

}

function displayList() {
    let listHTML = ''
    const containerElement = document.querySelector('.js-list-container');
    const numTasks = toDoList.length;

    // Using a for each method to do this (supposed to look cleaner)
    toDoList.forEach((task, index) => {
        listHTML += `
            <div>${task.name}</div>
            <div>${task.date}</div>
            <button class="js-delete delete-button">Delete</button>
        `;
    });

    // ALTERNATIVE TO THE FOR-EACH LOOP
    // How to do it with a for loop
    /*
    for(let i = 0; i < numTasks; i++) {
        // Our big list gets a new paragraph element each time
        listHTML += `
            <div>${toDoList[i].name}</div>
            <div>${toDoList[i].date}</div>
            <button class="delete-button" onclick="
                toDoList.splice(${i}, 1);
                displayList();
            ">Delete</button>
        `;
        // There is a delete button that causes the item at index i to be removed
        // Then the list is redisplayed
    } */

    // This is added to our div's HTML, which would consequently load a new paragraph element onto the page
    containerElement.innerHTML = listHTML;

    // selects all .js-delete buttons
    // adding an event listener for each delete button
    document.querySelectorAll('.js-delete')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                toDoList.splice(index, 1);
                displayList();
            });
        });

}