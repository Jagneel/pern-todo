import React, {Fragment, useState} from 'react'

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    const updateDescription = async (e) => {

        try {
            const body = { description };
            const response = await fetch(`http://localhost:5001/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <button type="button" 
            className="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}>
            Edit
            </button>

            <div className="modal fade" id={`id${todo.todo_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Please edit below</h5>
                    <button type="button" 
                    className="close" 
                    data-dismiss="modal"
                    onClick={() => setDescription(todo.description)} 
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <input type='text' className ="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" onClick={e => updateDescription(e)} data-dismiss="modal">Edit</button>
                    <button type="button" 
                        className="btn btn-danger" 
                        data-dismiss="modal"
                        onClick={() => setDescription(todo.description)} 
                        >Close
                        </button>

                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default EditTodo