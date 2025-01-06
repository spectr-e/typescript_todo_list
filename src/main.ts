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
