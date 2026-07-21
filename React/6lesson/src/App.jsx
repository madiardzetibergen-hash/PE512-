import { useReducer, useMemo, useState } from "react";

const initialState = {
  count: 0
}
function counterReducer(state,action){
  switch(action.type){
    case "increment":
      return{
        count: state.count + 1
      }
    case "decrement":
      return{
        count: state.count - 1
      }
    case "reset":
      return{
        count: 0
      }
    default:
      return state
  }
}

const students = [
  "Ali",
  "Azamat",
  "Miras",
  "Artem",
  "Sasha",
  "Diana"
]

export default function App(){
  const[ state,dispatch ] = useReducer(counterReducer, initialState)
  const [count2, setCount2] = useState(0)
  const [text, setText] = useState("")

  const [search, setSearch] = useState("")

  const filteredStudents = useMemo(() =>{
    console.log("Фильтрация студентов")
    return students.filter((student) => student.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  const doubleCount = useMemo(() =>{
    console.log("Считаю DoubleCount")
    return count2 * 2
  }, [count2])

  return(
    <div>
      <h1>useReducer</h1>
        <div>
          <h2>Count: {state.count}</h2>

          <div>
            <button onClick={()=> dispatch({type: "increment"})}>+</button>
          </div>
          <div>
            <button onClick={()=> dispatch({type: "decrement"})}>-</button>
          </div>
          <div>
           <button onClick={()=> dispatch({type: "reset"})}>Reset</button>
          </div>
        </div>

        <div>
          <h2>{count2}</h2>
          <h2>{doubleCount}</h2>

          <button onClick={() => setCount2(count2 + 1)}>Increase</button>

          <input 
          type="text"
          placeholder="Введите текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
          />

          <div>
            <h1>Search</h1>
            <input 
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
              {filteredStudents.map((student) => <li key={student}>{student}</li>)}
            </ul>
          </div>
        </div>

    </div>
  )
}