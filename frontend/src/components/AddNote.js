import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {
    const context = useContext(noteContext)
    const { add_ } = context
    const [text, setText] = useState({ title: "", desc: "", tag: "default" })
    const onChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value })
    }
    const handle = (e) => {
        e.preventDefault()
        add_(text.title, text.desc, text.tag)
    }
    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form className="my-3">
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Enter Title" name="title" onChange={onChange} value={text.title} />
                </div>
                <div className="mb-3 form-group">
                    <label for="desc">Description</label>
                    <input type="text" className="form-control" id="desc" placeholder="Enter Description" name="desc" onChange={onChange} value={text.desc} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handle}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
