import NoteCard from "./components /note-card/NoteCard"
import NewNoteCard from "./components /new-note-card/NewNoteCard"

const note = {
  date: new Date(),
  content: 'hello'
}

function App() {

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder: text-slate-500"
        />
      </form>
      <div className="h-px bg-slate-700"></div>

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />
        <NoteCard note= {note}/>
        <NoteCard note= {note}/>
      </div>
    </div>
  )
}

export default App
