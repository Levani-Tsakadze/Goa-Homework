import { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  const addNote = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newNote }),
    })
      .then((res) => res.json())
      .then((note) => setNotes([...notes, note]));

    setNewNote("");
  };

  const deleteNote = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <div className="mb-4 flex">
        <input
          className="border p-2 flex-grow"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 ml-2" onClick={addNote}>
          Add
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="border p-2 mb-2 flex justify-between items-center"
          >
            {note.text}
            <button
              className="bg-red-500 text-white p-1"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
