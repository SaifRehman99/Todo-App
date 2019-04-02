//array of objects
let todos = getSavedData();



//making object of filter items
searchedTodos = {
    search: '',
    hideCompleted: false,
}



//search todo input field
document.querySelector('#searchTodo').addEventListener('input', function (e) {

    //to watch the latest input values in the property
    searchedTodos.search = e.target.value;

    //rerender things
    displayTodos(todos, searchedTodos);

})


displayTodos(todos, searchedTodos);


//submit form to add todos
document.querySelector('#formSubmit').addEventListener('submit', (e) => {

    const text = e.target.elements.todo.value.trim();
    //cancel the form default behaviour
    e.preventDefault();
    //adding submit data to the todos array

    if (text.length > 0) {

        todos.push({
            text: e.target.elements.todo.value,
            completed: false,
            id: uuidv4()
        })

        savingData(todos);

        // rerender the data
        displayTodos(todos, searchedTodos);

        // clearing the sumbit data in the input field
        e.target.elements.todo.value = '';

    }
})


//eventhandler for the checkbox
document.querySelector('#checkbx').addEventListener('change', (e) => {

    //returns the boolen value
    searchedTodos.hideCompleted = e.target.checked;

    //update the searchTodos array
    displayTodos(todos, searchedTodos)

})