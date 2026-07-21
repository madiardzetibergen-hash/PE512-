// // import { useState } from "react";

// import { useEffect, useState } from "react"

// export default function App(){
//   const [name,setName] = useState("")
//   const [count,setCount] = useState(0)

//   function inc(){
//     setCount(count + 1)
//   }
//    function dec(){
//     setCount(count - 1)
//   }
//    function reset(){
//     setCount(0)
//   }

//   return(
//     <div>
//       <input
//        type="text"
//        value={name}
//        onChange={(event) => setName(event.target.value)}
//        />
//        <h2>Привет, {name}</h2>
//        <div>
//           <h1>{count}</h1>
//           <button onClick={inc}>+</button>
//           <button onClick={dec}>-</button>
//           <button onClick={reset}>Reset</button>
//        </div>
//     </div>
//   )
// }

// import {useEffect,useState } from "react";
// import axios from "axios"


// export default function App(){
//   const [count,setCount] = useState(0)
//   const [name, setName] = useState("")
//   const [tasks, setTasks] = useState(["Выучить Jsx", "Повторить props"])

//   // useEffect(() =>{
//   //   console.log("Компонент отрисовался")
//   // })
//   //   useEffect(() =>{
//   //   console.log("Компонент отрисовался2")
//   // },[count])
//   //   useEffect(() =>{
//   //   console.log("Компонент отрисовался3")
//   // },[])

//   useEffect(() =>{
//     const savedName = localStorage.getItem("name")

//     if (savedName){
//       setName(savedName)
//     }
//     console.log("GETITEM")
//   },[])

//   useEffect(() =>{
//     localStorage.setItem("name", name)
//     console.log("Имя было записано")
//   },[name])

//   const numbers = [1,2,3]
//   const newNumbers = [...numbers,4]
//   console.log(numbers,newNumbers)

//   function addTask(){
//     setTasks([...tasks, "Выучить useEffect"])
//   }

//   const numbers2 = [1,2,3,4,5]
//   const [first,second,...others] = numbers2
//   console.log(first)
//   console.log(second)
//   console.log(others)

//   const user = {
//     name: "Aidar",
//     age: 34,
//     city: "Almaty"
//   }
//   const {name1, ...otherInfo} = user
//   console.log(name1)
//   console.log(otherInfo)

//   // fetch("https://dummyjson.com/todos")
//   //   .then((response) => response.json())
//   //   .then((data) => console.log(data))
    
//   // axios.get("https://dummyjson.com/todos")
//   //   .then((response) => console.log(response.data))

//   return(
//     <div>
//       <h1>React useEffect</h1>
//       <div>
//         <h1>{count}</h1>
//         <button onClick={() => setCount(count + 1)}>click</button>
//       </div>

//       <div>
//         <h1>{name}</h1>
//         <input
//        type="text"
//        value={name}
//        onChange={(event) => setName(event.target.value)}
//        />
//       </div>

//       <div>
//         <button onClick={addTask}>Добавить задачу</button>
//         {tasks.map((task,index) => (
//           <p key={index}>{task}</p>
//         ))}
//       </div>
//     </div>
//   )
// }


import {useEffect, useState} from "react"
import axios from "axios"

export default function App(){
  const [todos,setTodos] = useState([])

  useEffect(() =>{
    axios.get("https://dummyjson.com/todos")
    .then((response) =>{
      console.log(response.data)
      setTodos(response.data.todos)
    })
  },[])

  return(
    <div>
      <h1>Todos from API</h1>
      
      {todos.map((todo) => (
        <p key={todo.id}>{todo.todo}
          <h1>{todo.completed}</h1>
          <h1>{todo.userId}</h1>
        </p>
      
      ))}
    </div>
  )
}