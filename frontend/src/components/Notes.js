import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'

export default function Notes() {
    const context = useContext(noteContext)
    const { notes } = context
    return (
        <>
            <AddNote />
            <div className='row my-3'>
                {notes.map((note) => {
                    return <Noteitem note={note} />
                })}
            </div>
        </>
    )
}
