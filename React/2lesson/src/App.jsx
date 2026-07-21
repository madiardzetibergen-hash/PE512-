import { useState } from "react"
import CourseCard from "./components/CourseCard"

export default function App(){

const [count,setCount] = useState(0)

const [name,setName] = useState("Али")

const [isVisible, setIsVisible] = useState(true)

const [isLoggedIn, setIsLoggedIn] = useState(false)

const [title, setTitle] = useState("")

function toggleLogin(){
  setIsLoggedIn(!isLoggedIn)
}

function toggleText(){
  setIsVisible(!isVisible)
}

function changeName(){
  setName("Мария")
}

function increase(){
    setCount(count + 1)
}
function decrease(){
    setCount(count - 1)
}
function reset(){
    setCount(0)
}
// function sayHello(){
//   alert("Привет из React")
// }
// function sayName(name){
//   alert("Привет, " + name)
// }

const courses = [
  "HTML",
  "JS",
  "CSS",
  "React"
]

const courses2 = [
  {id: 1, title: "HTML"},
  {id: 2, title: "CSS"},
  {id: 3, title: "JS"},
  {id: 4, title: "REACT"},
]

const courses3 = [
  {id: 1, title: "HTML",price: 2500},
  {id: 2, title: "CSS",price: 2000},
  {id: 3, title: "JS",price: 4000},
  {id: 4, title: "REACT",price: 7000},
]

return(
  <>
    <h1>Счетчик {count}</h1>
    <button onClick={increase}>+</button>
    <button onClick={decrease}>-</button>
    <button onClick={reset}>Reset</button>

    <div>
      <h1>Привет, {name}</h1>

      <button onClick={changeName}>Изменить имя</button>
    </div>

    <div>
      <button onClick={toggleText}>Показать / Скрыть</button>
      {isVisible && <p>Этот текст можно скрывать</p>}
    </div>

    <div>
      <p>Личный кабинет</p>

      {isLoggedIn ? (<p>Добро пожаловать в аккаунт</p>) : (<p>Пожалуйста войдите</p>)}
      <button onClick={toggleLogin}>{isLoggedIn ? "Выйти" : "Войти"}</button>
    </div>

    <div>
      <h1>Курсы</h1>

      {courses.map((course) =>(
        <p>{course}</p>
      ))}
    
    </div>
    
    <div>
      {courses2.map((course) =>(
        <p key={course.id}>{course.title}</p>
      ))}
    </div>
      <hr />
    <div>
      {courses3.map((course) =>(
        <CourseCard key={course.id}
        title = {course.title}
        price = {course.price}/>
      ))}
    </div>

    <div>
      <h1>Название: {title}</h1>

      <input 
      type="range"
      placeholder="Введите название"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      />
    </div>
     

  </>
)

}