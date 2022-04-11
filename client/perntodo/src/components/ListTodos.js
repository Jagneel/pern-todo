import React, {Fragment, useState, useEffect} from 'react'
import EditTodo from "./EditTodos"

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5001/todos/${id}`, {
            method: 'DELETE'
            })
            setTodos(todos.filter(todo => todo.todo_id !== id))
            console.log(deleteTodo)
        } catch (err) {
            console.error(err.message)
        }
    }

    const getTodo = async () => {
        try {
            
            const response = await fetch("http://localhost:5001/todos")
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodo();
    }, [])

    console.log(todos)
    return (
    <Fragment>
            <table className="table mt-5">
                <thead>
                <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Id</th>
                <th>Delete</th>
                </tr>
                </thead>
                {todos.map(todo => (
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td>
                        <EditTodo todo={todo} />
                    </td>
                    <td>
                        {todo.todo_id}
                    </td>
                    <td>
                        <button className="btn btn-danger"
                        onClick = {() => deleteTodo(todo.todo_id)}>
                        Delete
                        </button>
                    </td>
                </tr>
            ))}
            <tbody>

            </tbody>
        </table>

    </Fragment>)
}

export default ListTodos
