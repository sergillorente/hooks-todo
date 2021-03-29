import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

import TodosContext from './context'
import todosReducer from './reducer'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import axios from 'axios';

const useAPI = endpoint => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(endpoint)
    setData(response.data)
  }

  return data
}

const App = () => {
  const initialState = useContext(TodosContext)
  const [state, dispatch] = useReducer(todosReducer, initialState)
  const savedTodos = useAPI("https://hooks-api-eosin.vercel.app/todos")

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos
    })
  }, [savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
