import { useState } from "react";
import NoteContext from "./noteContext";

const NoteSate = (props) => {
    const notesInit = [{ "id": 2323, "title": "my title", "description": "my description" }, { "id": 2323, "title": "my title", "description": "my description" }, { "id": 25323, "title": "my title", "description": "my description" }, { "id": 234323, "title": "my title", "description": "my description" }]
    const [notes, setNotes] = useState("")
    const get_ = async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': ""
            }
        })
        const json = response.json()
        setNotes(json)
    }
    const add_ = async (title, description, tag) => {
        const note = { "title": title, "description": description, "tag": tag };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': ""
            },
            body: JSON.stringify(note)
        })
        const json = response.json()
        setNotes(notes.concat(note))
    }
    const delete_ = async (id) => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': ""
            }
        })
        const json = response.json()
        setNotes(notes.filter((note) => { return note.id !== id }))
    }
    const edit_ = async (id, title, description, tag) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': ""
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = response.json()
        for (let ind = 0; ind < notes.length; ind++) {
            const ele = notes[ind];
            if (ele.id === id) {
                ele.title = title;
                ele.description = description;
                ele.tag = tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, add_, delete_, edit_ }}>
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteSate;