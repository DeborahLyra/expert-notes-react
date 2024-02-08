import NoteCard from "./components /note-card/NoteCard"
import NewNoteCard from "./components /new-note-card/NewNoteCard"
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react"

interface Note {
  id: string
  date: Date
  content: string
}

function App() {

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes') //para iniciar com as notas previamentes salvas

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray)) //salva os dados no local storage, transformando em json
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes = search !== ''
    ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return (
            <NoteCard note={note} key={note.id} />
          )
        })}

      </div>
    </div>
  )
}

export default App
