"use client";
import useLocalStorage from "./useLocalStorage";

export default function useNotes() {
  const [notes, setNotes] = useLocalStorage("my-notes", []);

  const addNote = (title, text) => {
    if (!title.trim() || !text.trim()) return;
    
    const newNote = {
      id: Date.now(),
      title,
      text,
      createdAt: new Date().toLocaleDateString("ru-RU"),
    };
    
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return { notes, addNote, deleteNote };
}