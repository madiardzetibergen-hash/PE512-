"use client";
import useNotes from "../hooks/useNotes";
import useInput from "../hooks/useInput";

export default function NotesClient() {
  const { notes, addNote, deleteNote } = useNotes();
  
  // Хуки для формы создания
  const titleInput = useInput("");
  const textInput = useInput("");
  
  // Хук для строки поиска
  const searchInput = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(titleInput.value, textInput.value);
    titleInput.reset();
    textInput.reset();
  };

  // Фильтрация заметок по названию или тексту
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    note.text.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  return (
    <div className="notes-container">
      {/* Форма добавления заметки */}
      <form onSubmit={handleSubmit} className="note-form">
        <h3>Новая заметка</h3>
        <input
          type="text"
          placeholder="Заголовок"
          value={titleInput.value}
          onChange={titleInput.onChange}
          required
        />
        <textarea
          placeholder="Текст заметки..."
          value={textInput.value}
          onChange={textInput.onChange}
          rows="4"
          required
        ></textarea>
        <button type="submit">Добавить</button>
      </form>

      <hr />

      {/* Поиск */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск заметок..."
          value={searchInput.value}
          onChange={searchInput.onChange}
        />
      </div>

      {/* Список заметок */}
      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p className="no-notes">Заметки не найдены</p>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <h4>{note.title}</h4>
                <button onClick={() => deleteNote(note.id)} className="delete-btn">
                  &times;
                </button>
              </div>
              <p className="note-text">{note.text}</p>
              <span className="note-date">{note.createdAt}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}