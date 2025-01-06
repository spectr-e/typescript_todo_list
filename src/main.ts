import "./style.css"

// Define the structure of a Todo item
type Todo = {
	id: string
	text: string
	completed: boolean
}

// Select the form, input, and list elements from the DOM
const form = document.querySelector<HTMLFormElement>("#new-todo-form")
const input = document.querySelector<HTMLInputElement>("#todo-input")!
const list = document.querySelector<HTMLUListElement>("#list")!

// Render a single Todo item in the list
const renderTodo = (todo: Todo) => {
	const listItem = document.createElement("li")
	listItem.classList.add("list-item")

	const label = document.createElement("label")
	label.classList.add("list-item-label")
	label.htmlFor = todo.id

	// Marking the todo as completed
	const checkBox = document.createElement("input")
	checkBox.classList.add("label-input")
	checkBox.type = "checkbox"
	checkBox.checked = todo.completed
	checkBox.addEventListener("change", () => {
		// Update the completed status and save changes to localStorage
		todo.completed = checkBox.checked
		saveTodos()
	})

	// The todo text description
	const textElem = document.createElement("span")
	textElem.classList.add("label-text")
	textElem.innerText = todo.text

	// A delete button to remove the todo
	const delBtn = document.createElement("button")
	delBtn.classList.add("delete-btn")
	delBtn.innerText = "Delete"
	delBtn.addEventListener("click", () => {
		// Remove the list item from UI and update the todos array in localStorage
		listItem.remove()
		todos = todos.filter((todoItem) => todo.id !== todoItem.id)
		saveTodos()
	})

	// Append the elements
	label.append(checkBox, textElem)
	listItem.append(label, delBtn)
	list.append(listItem)
}

// Function to save the todos array to local storage
const saveTodos = () => {
	localStorage.setItem("todos", JSON.stringify(todos))
}

// Load todos from local storage and render them
const loadTodos = () => {
	return JSON.parse(localStorage.getItem("todos") || "[]") as Todo[]
}
let todos: Todo[] = loadTodos()
todos.forEach(renderTodo)

// Handle new todo submissions
form?.addEventListener("submit", (e) => {
	e.preventDefault()
	const inputVal = input.value.trim()

	if (inputVal === "") {
		return // Exit if the input is empty
	}

	// Create a new todo object
	const todo: Todo = {
		id: crypto.randomUUID(),
		text: inputVal,
		completed: false,
	}

	// Add the new todo to the array, render it, and save the updated array
	todos.push(todo)
	renderTodo(todo)
	saveTodos()
	input.value = "" // Clear the input field
})
