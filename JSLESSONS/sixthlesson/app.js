// 1) Подключение JS к HTML

// const title = document.getElementById("title") -> Обращение к DOM элементу
// console.log(title)

// console.log(document)
// console.log(document.body)
// console.log(document.title)

// // 1.
// getElementById получение одного элемента через ID

// 2.getElementsByClassName Возвращает коллекцию элементов
// const texts = document.getElementsByClassName("text")
// console.log(texts)

// 3. getElementsByTagName -> вовщращает коллекцию элементов по тегу
// const paras = document.getElementsByTagName("p")
// console.log(paras)

// 4.
// querySelector -> универсальный метод, который возвращает первый элемент по CSS селектору
// const sub = document.querySelector(".subtitle")
// console.log(sub)
// .main
// #main
// p

// 5.
// quertySelectorAll

// const allTexts = document.querySelectorAll(".text")
// console.log(allTexts)

// 2) Что такое NODELIST и HTMLCollection
// NodeLIST -> это массив с индексами
// HTMLCOLLECTION это обьект

// 3) Изменение содержимого элемента
// 1. Поменять текст
// const title = document.getElementById("title")
// title.textContent = "Новый текст"

// 2.
// const title = document.getElementById("title")
// title.innerHTML = "<div><b>ЭТО ИННЕР ХТМЛ</b></div>"
// innerText

// 3.
// const photo = document.getElementById("photo")
// const link = document.getElementById("link")

// console.log(photo.getAttribute("src"))
// photo.setAttribute("src", "https://play-lh.googleusercontent.com/KQnKLnS1L-rNVd3fVFwrdc-7H2ODB2wpU8jmjq6vp3W6SITiQV180s5022V3-QlcfZc")
// photo.setAttribute("alt", "Pixel")

// console.log(link.getAttribute("href"))
// link.setAttribute("href","https://www.pexels.com/ru-ru/")
// link.textContent = "Pixel"

// 4.
// const text = document.getElementById("title")

// text.style.color = "red"
// text.style.fontSize = "5px"
// text.style.backgroundColor = "yellow"
// text.style.width = "200px"
// text.style.height = "200px"


// const allTexts = document.querySelectorAll(".text")
// allTexts.style.color = "blue"

// const paras = document.getElementsByTagName("p")
// paras.style.color = "blue"
// const texts = document.getElementsByClassName("text")
// texts.style.color = "blue"

// const p = document.querySelectorAll(".text")
// p.forEach(item => {
//     item.style.color = "blue"
// })
// for(let i = 0; i< p.length; i++){
//     p[i].style.color ="blue"
// }



// const message = document.getElementById("message")
// const btn = document.getElementById("btn")

// btn.addEventListener("mouseleave", () =>{
//     message.classList.toggle("dark")
// })


// const btn = document.getElementById("btn")

// btn.addEventListener("keydown", () =>{
//     alert("Кнопка нажата")
// })

// click
// mouseover
// mouseout
// change
// submit
// keydown -> q

// event
// event.target.value
// preventDefault
// input -> 
// BOM


// const title = document.getElementById("title")
// const changeBtn = document.getElementById("btn")

// btn.addEventListener("click", () =>{
//     title.textContent = "Новый текст"
// })


// const countEl = document.getElementById("count")
// const plusBtn = document.getElementById("plus")
// const minusBtn = document.getElementById("minus")

// let count = 0

// plusBtn.addEventListener("click",() =>{
//     count++
//     countEl.textContent = count
// })
// minusBtn.addEventListener("click",() =>{
//     count--
//     countEl.textContent = count
// })

// const password = document.getElementById("password")
// const toggle = document.getElementById("togglePass")

// toggle.addEventListener("click", () =>{
//     if(password.type == "password"){
//         password.type = "text"
//         toggle.textContent = "Скрыть"
//     }
//     else{
//         password.type = "password"
//         toggle.textContent = "Показать"
//     }
// })


const card = document.getElementById("card")
const red = document.getElementById("red")
const green = document.getElementById("green")

red.addEventListener("click", () =>{
    card.style.backgroundColor = "red"
})
green.addEventListener("click", () =>{
    card.style.backgroundColor = "green"
})


