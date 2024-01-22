import { useState } from "react";
import NoteContext from "./noteContext";

const NoteSate = (props) => {
    const notesInit = [{ "id": 2323, "title": "my title", "description": "my description" }, { "id": 2323, "title": "my title", "description": "my description" }, { "id": 25323, "title": "my title", "description": "my description" }, { "id": 234323, "title": "my title", "description": "my description" }]
    const [notes, setNotes] = useState(notesInit)
    const add_ = (title, description, tag) => {
        const note = { "title": title, "description": description, "tag": tag };
        setNotes(notes.concat(note))
    }
    const delete_ = (id) => {
        setNotes(notes.filter((note) => { return note.id !== id }))
    }
    const edit_ = (id, title, description, tag) => {

    }
    return (
        <NoteContext.Provider value={{ notes, add_, delete_, edit_ }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteSate;