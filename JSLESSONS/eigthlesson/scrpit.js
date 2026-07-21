// const title = document.getElementById("title")
// const texts = document.getElementsByClassName("text")
// const btn = document.getElementById("btn")
// const nameInput = document.getElementById("nameInput")
// const username = document.getElementById("username")
// const email = document.getElementById("email")
// const password = document.getElementById("password")
// const registerForm = document.getElementById("registerForm")

// const para = document.getElementsByTagName("p")

// const title2 = document.querySelector("#title")
// const text2 = document.querySelector(".text")
// const para2 = document.querySelector("p")

// const texts3 = document.querySelectorAll("#text")

// title.textContent = "Новый заголовок"
// // title.innerHTML = "<span>Новый текст со span</span>"
// title.style.color = "red"
// title.style.fontSize = "100px"

// const newwPara = document.createElement("p")
// newwPara.textContent = "Я новый абзац"
// document.ul.appendChild(newwPara)
// newwPara.remove()

// btn.addEventListener("click", () =>{
//     title.textContent = "Текст изменился"
// })

// title.classList.toggle("active")

// btn.addEventListener("click", () =>{
//     console.log("Кнопка была нажата")
// })

// btn.addEventListener("click", (event) =>{
//     console.log(event)
// })

// btn.addEventListener("click", function(event){
//     console.log("Тип события", event.type)
//     console.log("Тип события", event.target)
// })

// nameInput.addEventListener("input", function(event){
//     console.log(event.target.value)
// })

// registerForm.addEventListener("submit", (event)=>{
//     event.preventDefault()
//     if(username.value.trim() === ""){
//         alert("Имя не заполнено")
//     }
//     if(email.value.trim() === ""){
//         alert("Почта не заполнено")
//     }
//     if(password.value.trim() === ""){
//         alert("Пароль не заполнен")
//     }

// })

// Новая тема Делегирование

// const parent = document.getElementById("parent")
// const child = document.getElementById("child")

// child.addEventListener("click", () =>{
//     console.log("Клик по кнопке")
// }) 
// parent.addEventListener("click",() =>{
//     console.log("Клик дошел до родителя")
// })

// parent.addEventListener("click", (event) => {
//     console.log("target:", event.target)
//     console.log("currentTarget:", event.currentTarget)
// })

// const buttons = document.querySelectorAll("#btn")

// buttons.forEach((button) => {
//     button.addEventListener("click", () =>{
//         console.log("Кнопка нажата")
//     })
// })

// const buttonWrapper = document.getElementById("buttonWrapper")

// buttonWrapper.addEventListener("click", function(event){
//     if(event.target.classList.contains("btn")){
//         console.log("Нажата:", event.target.textContent)
//     }
// })
const taskList = document.getElementById("taskList")
const addTaskBtn = document.getElementById("addTaskBtn")
const textInput = document.getElementById("textInput")

taskList.addEventListener("click", (event) =>{
    if(event.target.classList.contains("delete-btn")){
        event.target.parentElement.remove()
    }
    if(event.target.classList.contains("task_item")){
        event.target.classList.toggle("done")
    }
})
addTaskBtn.addEventListener("click", () =>{
    const taskText = textInput.value.trim()

    if(taskText !== ""){
        const li = document.createElement("li")
        li.innerHTML = `<li class="task_item">
                        ${taskText}
                        <button class="delete-btn">Удалить</button>
                        </li>`
        taskList.appendChild(li)
        textInput.value = ""
    }

})



