import { useState, useEffect } from "react";

export default function NotesPage(){
    const [notes,setNotes] = useState(() =>{
        const savedNotes = localStorage.getItem("notes")

    if (savedNotes){
        return JSON.parse(savedNotes)
    }
    return []
    })

    const [text,setText] = useState("")
    const [search, setSearch] = useState("")
    const [showOnlyImportant, setShowOnlyImportant] = useState(false)

    useEffect(() =>{
        localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])

    function addNote(){
        if(text.trim === "") return

        const newNote = {
            id: Date.now(),
            text,
            important: false
        }
        setNotes([...notes,newNote])
        setText("")
    }
    function deleteNote(id){
        setNotes(notes.filter(note => note.id !== id))
    }
}