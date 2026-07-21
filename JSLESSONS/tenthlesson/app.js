// console.log(1)
// console.log(2)
// console.log(3)

// console.log(1)
// setTimeout(() =>{
//     console.log(2)
// }, 5000)
// console.log(3)

// const title = document.getElementById("title")

// setTimeout(() =>{
//     title.textContent = "Данные загружены"
// }, 3000)

// const startBtn = document.getElementById("startBtn")
// const cancelBtn = document.getElementById("cancelBtn")
// const qwerty = document.getElementById("status")

// let timerId

// startBtn.addEventListener('click', ()=>{
//    qwerty.textContent = "Таймер запущен"

//    timerId = setTimeout(() =>{
//     qwerty.textContent = "Время вышло"
//    }, 3000)
// })

// cancelBtn.addEventListener('click', ()=>{
//     clearTimeout(timerId)
//     qwerty.textContent = "Таймер отменен"
// })

// setInterval(() =>{
//     console.log("Прошла еще 1 секунда")
// },1000)

// const counter = document.getElementById("counter")

// let number = 0

// setInterval(() =>{
//     number++
//     counter.textContent = number
//     stop()
// },1000)
// function stop(){
//     if(number >= 5){
//         clearInterval()
//         counter.textContent = 0
//     }
// }

// const time = document.getElementById("time")
// const start = document.getElementById("start")
// const stop1 = document.getElementById("stop1")
// const reset = document.getElementById("reset")

// let seconds = 0
// let intervalID = null

// start.addEventListener("click", () =>{
//     if(intervalID !== null){
//         return
//     }
//     intervalID = setInterval(() =>{
//         seconds++
//         time.textContent = seconds
//     },1000)
// })

// stop1.addEventListener("click",() =>{
//     clearInterval(intervalID)
// },1000)

// reset.addEventListener("click", () =>{
//     clearInterval(intervalID)
//     intervalID = null
//     seconds = 0
//     time.textContent = seconds
// })

// function sayHello(callback){
//     console.log("Привет")
//     callback()
// }

// function showMessageLater(callback){
//     setTimeout(() =>{
//         console.log("Прошло 2 секунды")
//         callback()
//     },2000)
// }

// showMessageLater(() =>{
//     console.log("Callback сработал")
// })

// const promise = new Promise((resolve, reject) =>{
//     setTimeout(() =>{
//         resolve("Данные получены")
//     },2000)
// })

// Полный пример
// const promise = new Promise((resolve, reject) =>{
//     setTimeout(() =>{
//         resolve("Данные получены")
//     },2000)

// })
//  promise.then((data) =>{
//         console.log(data)
//     })

// const promise = new Promise((resolve, reject) =>{
//     setTimeout(() =>{
//         reject("Ошибка")
//     },2000)

// })
// promise
//     .then((data) =>{
//         console.log(data)
//     })
//     .catch((error) =>{
//         console.log(error)
//     })

// function getUser(){
//     return new Promise((resolve, reject) =>{
//         setTimeout(() =>{
//             resolve({
//                 id:1,
//                 name:"Dias",
//                 age:20
//             },5000)
//         })
//     })
// }
// getUser().then((user) =>{
//     console.log(user)
//     console.log(user.name)
// })

// function loginUser(login, password) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (login === "admin" && password === "12345") {
//         resolve("Вход выполнен");
//       } else {
//         reject("Неверный логин или пароль");
//       }
//     }, 1000);
//   });
// }

// loginUser("admin", "1234")
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((error) => {
//     console.log("Ошибка:", error);
//   });


//   function fetchUsers() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const users = [
    
//       ];

//       resolve(users);
//     }, 1500);
//   });
// }

// fetchUsers()
//   .then((users) => {
//     console.log("Пользователи загружены:");
//     console.log(users);
//   })
//   .catch((error) => {
//     console.log("Ошибка:", error);
//   });

// function loginUser(email, password) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (email === "admin@mail.com" && password === "12345") {
//         resolve("Успешный вход");
//       } else {
//         reject("Неверный email или пароль");
//       }
//     }, 3000);
//   });
// }

// async function handleLogin() {
//   try {
//     const result = await loginUser("admin@mail", "12345");
//     console.log(result);
//   } catch (error) {
//     console.log("Ошибка:", error);
//   }
// }

// handleLogin();

// const user = {
//     name: "Qwerty",
//     secondname: "Asd"
// }
// localStorage.setItem("user", user)

// const userJSON = JSON.stringify(user)
// localStorage.setItem("user",userJSON)


// const savedUser = localStorage.getItem("user")
// const reverseJSON = JSON.parse(savedUser)
// console.log(savedUser)
// console.log(reverseJSON) 

const prouducts = [
    {id:1, title: "Phone"},
    {id:1,title: "Laptop"}
]

localStorage.setItem("PRODUCTS", JSON.stringify(prouducts))

const savedProducts = localStorage.getItem("PRODUCTS")
const reverseJSON = JSON.parse(savedProducts)

console.log(savedProducts)
console.log(reverseJSON)
