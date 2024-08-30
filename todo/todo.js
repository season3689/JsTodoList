const todoList = document.querySelector("#todo-list")
const todoForm = document.querySelector("#todo-form")
let todoArr = []

function displayTodos(){
    todoList.innerHTML = ""
    todoArr.forEach(function(aTodo){
        const todoItem = document.createElement("li")
        const todoDelBtn = document.createElement("span")
        todoDelBtn.innerText = 'x'
        todoDelBtn.title = '클릭시 삭제'
        todoItem.innerText = aTodo.todoText
        todoItem.title = '클릭시 완료'
        todoItem.classList.add(aTodo.todoDone ? 'done' : 'yet')
        todoItem.appendChild(todoDelBtn)
        todoDelBtn.addEventListener('click', function(){
            handleTodoDelBtnClick(aTodo.todoId)
        })
        todoItem.addEventListener('click', function(){
            handleTodoItemClick(aTodo.todoId)
        })
        todoList.appendChild(todoItem)
    })
}

function handleTodoDelBtnClick(clickedId){
    todoArr = todoArr.filter(function(aTodo){
        return aTodo.todoId !== clickedId
    })
    displayTodos()
    saveTodos()
}

function handleTodoItemClick(clickedId){
    todoArr = todoArr.map(function(aTodo){
        return aTodo.todoId !== clickedId ?
        aTodo : { ...aTodo, todoDone: !aTodo.todoDone}
    })
    displayTodos()
    saveTodos()
}

function saveTodos(){
    const todoString = JSON.stringify(todoArr)
    localStorage.setItem('myTodos', todoString)
    displayTodos()
}

function loadTodos(){
    const myTodos = localStorage.getItem('myTodos')
    todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr
    displayTodos()
}

todoForm.addEventListener('submit', function(e){
    e.preventDefault()
    const toBeAdded = {
        todoText: todoForm.todo.value,
        todoId: new Date().getTime(),
        todoDone:false
    }
    todoForm.todo.value = ""
    todoArr.push(toBeAdded)
    displayTodos()
    saveTodos()
})

loadTodos()