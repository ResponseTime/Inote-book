import { useState } from "react";
import NoteContext from "./noteContext";

const NoteSate = (props) => {
    const notesInit = []
    const [notes, setNotes] = useState(notesInit)
    return (
        <NoteContext.Provider value={{ notes, setNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteSate;