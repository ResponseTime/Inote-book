import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { delete_ } = context
    const { note, update } = props;
    return (
        <div className="col-md-3">
            <div class="card my-3" >
                <div class="card-body">
                    <div className="d-flex align-items-center">
                        <h5 class="card-title">{note.title}</h5>
                        <i class="fa-solid fa-trash mx-2" onClick={() => { delete_(note.id) }}></i>
                        <i class="fa-solid fa-pen-to-square mx-2" onClick={() => { update(note) }}></i>
                    </div>
                    <p class="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
