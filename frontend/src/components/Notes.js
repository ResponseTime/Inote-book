import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

export default function Notes() {
    const context = useContext(noteContext)
    const { notes, edit_ } = context

    const ref = useRef(null)
    const refc = useRef(null)
    const [text, setText] = useState({ id: "", title: "", desc: "", tag: "default" })
    const update = (note) => {
        ref.current.click()
        setText(note)
    }
    const onChange = (e) => {
        setText({ ...text, [e.target.name]: e.target.value })
    }
    const handle = (e) => {
        e.preventDefault()
        edit_(text.id, text.title, text.desc, text.tag)
    }
    const close = (e) => {
        refc.current.click()
    }
    return (
        <>
            <AddNote />
            <button type="button" className="d-none btn btn-primary" data-toggle="modal" data-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                    <div className="mb-3 form-group">
                                        <label for="tag">Tag</label>
                                        <input type="text" className="form-control" id="tag" placeholder="Enter Description" name="tag" onChange={onChange} value={text.tag} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handle}>Add Note</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refc} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={close}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                {notes.map((note) => {
                    return <Noteitem note={note} update={update} />
                })}
            </div>
        </>
    )
}
