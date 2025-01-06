import "./style.css"

type Todo = {
	id: string
	text: string
	completed: boolean
}

const form = document.querySelector<HTMLFormElement>("#new-todo-form")
const input = document.querySelector<HTMLInputElement>("#todo-input")!
const list = document.querySelector<HTMLUListElement>("#list")!
let todos: Todo[] = []

form?.addEventListener("submit", (e) => {
	e.preventDefault()
	const inputVal = input.value.trim()

	if (inputVal === "") {
		return
	}

	const todo: Todo = {
		id: crypto.randomUUID(),
		text: inputVal,
		completed: false,
	}

	todos.push(todo)
	renderTodo(todo)
	input.value = ""
})

const renderTodo = (todo: Todo) => {
	const listItem = document.createElement("li")
	listItem.classList.add("list-item")

	const label = document.createElement("label")
	label.classList.add("list-item-label")
	label.htmlFor = todo.id

	const checkBox = document.createElement("input")
	checkBox.classList.add("label-input")
	checkBox.type = "checkbox"
	checkBox.checked = todo.completed
	checkBox.addEventListener("change", () => {
		todo.completed = checkBox.checked
	})

	const textElem = document.createElement("span")
	textElem.classList.add("label-text")
	textElem.innerText = todo.text

	const delBtn = document.createElement("button")
	delBtn.classList.add("delete-btn")
	delBtn.innerText = "Delete"

	label.append(checkBox, textElem)
	listItem.append(label, delBtn)
	list.append(listItem)
}
