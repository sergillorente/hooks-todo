import { v4 as uuid } from 'uuid'

export default function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_TODO':
            const toggledTodos = state.todos.map(t => t.id === action.payload.id
                ? { ...action.payload, complete: !action.payload.complete }
                : t
            )
            return {
                ...state,
                todos: toggledTodos
            }
        case 'REMOVE_TODO':
            const filteredTodos = state.todos.filter(t => t.id !== action.payload.id)
            const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo
            return {
                ...state, 
                currentTodo: isRemovedTodo,
                todos: filteredTodos
            }
        case 'ADD_TODO':
            const newTodo = {
                id: uuid(),
                text: action.payload,
                complete: false
            }
            const addedTodos = [...state.todos, newTodo]
            return {
                ...state, 
                addedTodos
            }
        case 'SET_CURRENT_TODO':
            return {
                ...state,
                currentTodo: action.payload
            }
        case 'UPDATE_TODO':
            const updatedTodo = {
                ...state.currentTodo, text: action.payload
            }
            const updatedTodoIndex = state.todos.findIndex(
                t => t.id === state.currentTodo.id
            )
            const updatedTodos = [
                ...state.todos.slice(0, updatedTodoIndex), 
                updatedTodo,
                ...state.todos.slice(updatedTodoIndex + 1)
            ]
            return {
                ...state,
                currentTodo: {},
                todos: updatedTodos
            }
        default:
            return state
    }
}