const title = document.getElementById("title")
const btn = document.getElementById("btn")
const form = document.getElementById("form")

title.textContent = "Новый текст"
title.style.backgroundColor = "red"
title.style.color = "white"

btn.addEventListener("click", () =>{
    btn.textContent = "Это новая кнопка"
    btn.style.backgroundColor = "#BC18D5"
    btn.style.padding = "20px"
    btn.style.color = "white"
})

form.addEventListener("submit", (event) =>{
    event.preventDefault()
})

// getData() -> получает данные сервера

async function loadData(){
    const data = await getData()
    console.log(data)
}