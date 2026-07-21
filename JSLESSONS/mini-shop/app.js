// Переменные регистрация
const registerScreen = document.querySelector("#registerScreen")
const registerForm = document.querySelector("#registerForm")
const registerName = document.querySelector("#registerName")
const registerEmail = document.querySelector("#registerEmail")
const registerPassword = document.querySelector("#registerPassword")
const registerError = document.querySelector("#registerError")
const goToLoginBtn = document.querySelector("#goToLoginBtn")

// Переменные логина
const loginScreen = document.querySelector("#loginScreen")
const loginForm = document.querySelector("#loginForm")
const loginEmail = document.querySelector("#loginEmail")
const loginPassword = document.querySelector("#loginPassword")
const loginError = document.querySelector("#loginError")
const goToRegisterBtn = document.querySelector("#goToRegisterBtn")

// Переменные магазина
const shopScreen = document.querySelector("#shopScreen")
const userInfo = document.querySelector("#userInfo")
const logoutBtn = document.querySelector("#logoutBtn")
const productList = document.querySelector("#productList")
const cartList = document.querySelector("#cartList")
const cartTotal = document.querySelector("#cartTotal")

// Функции переключения экранов
function showRegisterScreen(){
    registerScreen.hidden = false
    loginScreen.hidden = true
    shopScreen.hidden = true
}
function showLoginScreen(){
    registerScreen.hidden = true
    loginScreen.hidden = false
    shopScreen.hidden = true
}
function showShopScreen(){
    registerScreen.hidden = true
    loginScreen.hidden = true
    shopScreen.hidden = false
}

// Кнопки перехода
goToLoginBtn.addEventListener("click", ()=>{
    showLoginScreen()
})
goToRegisterBtn.addEventListener("click", () =>{
    showRegisterScreen()
})

// Функция для localStorage users
// Добавление юзера в LS
function saveUser(user){
    localStorage.setItem("user", JSON.stringify(user))
}
// Вызов данных из LS
function getUser(){
    const user = localStorage.get("user")

    if(user === null){
        return null
    }
    return JSON.parse(user)
}

// РЕГИСТРАЦИЯ
registerForm.addEventListener("submit", (event) =>{
    event.preventDefault()

    const name = registerName.value.trim()
    const email = registerEmail.value.trim()
    const password = registerPassword.value.trim()

    registerError.textContent = ""

    if(name.length < 2){
        registerError.textContent ="Имя должно быть минимум 2 символа"
        registerError.style.color = "red"
        return
    }
    if(!email.includes("@")){
        registerError.textContent = "Email должен содержать @"
        registerError.style.color = "red"
        return
    }
    if(password.length < 6){
        registerError.textContent ="Пароль должно быть минимум 6 символов"
        registerError.style.color = "red"
        return
    }
    const user = {
        name: name,
        email: email,
        password: password
    }
    saveUser(user)
    registerForm.reset()
    showShopScreen()
})



