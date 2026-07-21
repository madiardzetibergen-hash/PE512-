import { useCounter } from "./useCounter";
import { useInput } from "./hooks/useInput"

export default function App(){
  const {count, increment} = useCounter()
  const noteText = useInput("")

  function handleAddNote(){
    console.log(noteText.value)
    noteText.clear()
  }

  return(
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>

      <div>
        <h1>useInput</h1>

        <input 
        value={noteText.value}
        onChange = {noteText.onChange}
        placeholder="Введите заметку"
        
        />
        <button onClick={handleAddNote}>Добавить</button>
      </div>
    </div>
  )
}