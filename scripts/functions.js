//read and saving data in array
let getSavedData = ()=> {


    //checking for the data in the local storage to be added
    let savedData = localStorage.getItem('todo');

    //if found add in the array
    return savedData !== null ? JSON.parse(savedData) : []
}

//saving todo to the local storage

let savingData = (todos) => {

    //saving in the localstorage
    localStorage.setItem('todo', JSON.stringify(todos))
}

//rendering data in the browser
//filtering todos when search and making new array of searched items
const displayTodos = (todos, searchedTodos) => {



    let searchTodo = todos.filter(function (item) {
        let searchItem = item.text.toLowerCase().includes(searchedTodos.search.toLowerCase());

        //if checkbox is checked,the completed todo hide
        let filterItem = !searchedTodos.hideCompleted || !item.completed;

        return searchItem && filterItem;
    })




    //printing the how many incomlete todos left
    const incompleteTodos = searchTodo.filter((item) => !item.completed)


    //to clear the div when searching
    document.querySelector('#todoContents').innerHTML = '';


    //generating text for incomplete todos text
    document.querySelector('#todoContents').appendChild(incompleteTodoText(incompleteTodos));


    //to display the search input in the browser
    searchTodo.forEach((item) =>{

        document.querySelector('#todoContents').appendChild(generatingDOM(item));
    })

}


//generating Dom elements
let generatingDOM = (item) => {
    const div = document.createElement('div');
    const label = document.createElement('label')
    const chckBox = document.createElement('input'); 
    const p = document.createElement('span');
    const btn = document.createElement('button');

    //setting up checkbox
    chckBox.setAttribute('type', 'checkbox');

    //if todo is complete, tick the todo with a tick mark
    chckBox.checked = item.completed;
    div.classList.add('divv')
    div.appendChild(chckBox);



    //event listener for checkbox to change the state of uncompleted todos
    chckBox.addEventListener('change',  ()=> {
        changeCompletedData(item.id);
        savingData(todos);
        displayTodos(todos, searchedTodos);
    })



    //setting the para
    div.appendChild(p);
    p.textContent = item.text;
    p.classList.add('gap', 'grey-text' , 'text-darken-2');

    //setting the close button 
    btn.textContent = `x`;
    btn.classList.add('btn' , 'waves-effect',  'btnn') 
    div.appendChild(btn);

    //event listner to delete when clicked
    btn.addEventListener('click',  ()=> {
        deleteTodo(item.id);
        savingData(todos);
        displayTodos(todos, searchedTodos);
    })
    label.appendChild(div)

    return label;
}

//delete a todo

let deleteTodo = (id) =>{

    let todoId = todos.findIndex((item) => item.id === id)

    if (todoId > -1) {

        todos.splice(todoId, 1);
    }
}


//changing the state of todo when checkbox checked

let changeCompletedData = (data) =>{

    let todo = todos.find( (item) => item.id === data)

    if (todo !== undefined) {
        todo.completed = !todo.completed;
    }
}

//generating the text for incompletetodos
let incompleteTodoText =  (incompleteTodos) => {

    const res = document.createElement('h3');
    res.textContent = `${incompleteTodos.length} todos left`;
    return res;
}