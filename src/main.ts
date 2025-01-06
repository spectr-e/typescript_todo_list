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
	// renderTodo(todo)
	input.value = ""
})
