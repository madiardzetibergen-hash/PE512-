

// function App(){
//   const name = "Ali"
//   const age = 18
//   const isLogginIn = true
//   const games = ["Ведьмак 3", "Космические ренджеры", "Diablo"]

//   return(
//     <>
//         <h1>Привет, {name}</h1>
//         <p>Это мой первый компонент</p>
//         <p>Через год: {age + 1}</p>
//         {isLogginIn ? (<p>Вы вошли в аккаунт</p>) : (<p>Пожалуйста, войдите</p>)}
//         {/* <h1>Список игр</h1>
//         {games.map((game) => (
//           <p>{game}</p>
//         ))} */}
//         <div>Список игр</div>
//         {games.map((game, index) =>(
//           console.log(game,index)
//         ))}
        
//     </>
//   )
// }
// export default App
import Header from "./components/Header"
import Footer from "./components/Footer"
import Courses from "./components/Courses"
import Student from "./components/Student"
import "./App.css"

function App(){
  return(
    <>
      <Header />

      <Courses title = "React Basic" 
      description = "React Basic React Basic React Basic" 
      duration = "1 month" />

      <Courses title = "React Middle" 
      description = "React Middle React Middle React Middle" 
      duration = "2 month" />

      <Courses title = "React Advanced" 
      description = "React Advanced React Advanced React Advanced" 
      duration = "3 month" />

      <Courses title = "React Advanced" 
      description = "React Advanced React Advanced React Advanced" 
      duration = {3} />

      <Courses title = "NextJS" 
      description = "NextJS NextJSNextJS NextJSNextJS NextJS" 
      duration = {3} lessons = {["SSR", "SPA", "Client run", "Server run"]} />
      
      {/* <Student  name = "Ali" direction="Software Eng" age={20}/> */}
      <Student student ={{
        name: "Dias",
        direction: "Cybersecurity",
        age: 19
      }}/>
      <Footer />

    </>
  )
}
export default App