// const form = document.getElementById("taskForm")

// form.addEventListener("submit", () =>{
//     alert("Форма отправлена")
// })

// form.addEventListener("submit", function(event){
//     event.preventDefault();
//     alert("Форма отправлена без перезагрузки")
// })

// document.addEventListener("keydown", (event) =>{
//     console.log(event.key)
// })

// const btn = document.getElementById("btn")
// btn.addEventListener("click", (event) =>{
//     console.log(event)
// })

// const form = document.getElementById("taskForm")
// const input = document.getElementById("taskInput")
// const result = document.getElementById("result")

// form.addEventListener("submit", function(event){
//     event.preventDefault()
//     const text = input.value.trim()
//     if(text == ""){
//         alert("Введите задачу")
//         return
//     }

//     result.textContent = "Вы ввели: " + text
// })

// const form = document.getElementById("taskForm")
// const input = document.getElementById("taskInput")
// const success = document.getElementById("success")
// const error = document.getElementById("error")

// form.addEventListener("submit", (event) =>{
//     event.preventDefault()

//     const text = input.value.trim()
//     error.textContent = ""
//     success.textContent = ""


//     if(text === ""){
//         error.textContent = "Поле не должно быть пустым"
//         error.style.color = "red"
//         return
//     }
//     if(text.length < 3){
//         error.textContent = "Минимум 3 символа"
//         error.style.color = "red"
//         return
//     }
//     if(text.length > 20){
//         error.textContent = "Максимум 20 символов"
//         error.style.color = "red"
//         return
//     }
//     success.textContent = "Задача добавлена " + text
//     success.style.color = "green"
//     input.value = ""
// })



// Login register validation practice

const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

const loginPassword = document.getElementById("loginPassword")
const regPassword = document.getElementById("regPassword")

const showLoginPassword = document.getElementById("showLoginPassword")
const showRegisterPassword = document.getElementById("showRegisterPassword")

const textShowLoginPassword = document.getElementById("textShowLoginPassword")

if(showLoginPassword && loginPassword){
    showLoginPassword.addEventListener("click", function(){
        if(loginPassword.type === "password"){
            loginPassword.type = "text"
            textShowLoginPassword.textContent = "Hide"
        }
        else{
            loginPassword.type = "password"
            textShowLoginPassword.textContent = "Show password"
        }
    })

}

if(showRegisterPassword && regPassword){
    showRegisterPassword.addEventListener("click", function(){
        if(regPassword.type === "password"){
            regPassword.type = "text"
            showRegisterPassword.textContent = "Hide"
        }
        else{
            regPassword.type = "password"
            showRegisterPassword.textContent = "Show password"
        }
    })

}
if(loginForm){


    loginForm.addEventListener("submit", function(e){
        e.preventDefault()
    const name = document.getElementById("loginName").value.trim()
    const password = loginPassword.value.trim()

    if(name.length < 5 || name.length > 20){
        const loginNameError = document.getElementById("loginNameError")
        loginNameError.style.color = "red"
        loginNameError.textContent = "Mininum 5 Maximum 20"
        return
    }
     if(password.length < 5 || name.length > 20){
        const loginPasswordError = document.getElementById("loginPasswordError")
        loginPasswordError.style.color = "red"
        loginPasswordError.textContent = "Mininum 5 Maximum 20"
        return
    }
    alert("Логин прошел")

    })
}

if(registerForm){
    registerForm.addEventListener("submit", function(e){
        e.preventDefault()

        const name = document.getElementById("regName").value.trim()
        const email = document.getElementById("regEmail").value.trim()
        const number = document.getElementById("regNumber").value.trim()
        const password = document.getElementById("regPassword").value.trim()

        document.getElementById("regNameError").textContent = ""
        document.getElementById("regEmailError").textContent = ""
        document.getElementById("regNumberError").textContent = ""
        document.getElementById("regPasswordError").textContent = ""

        if(name.length < 5 || name.length > 20){
            const regNameError = document.getElementById("regNameError")
            regNameError.style.color = "red"
            regNameError.textContent = "Minimum 5 Maximum 20"
            return
        }

        if(email.length < 5 || email.length > 30 || !email.includes("@")){
            const regEmailError = document.getElementById("regEmailError")
            regEmailError.style.color = "red"
            regEmailError.textContent = "Email must contain @"
            return
        }

        if(!/^\d+$/.test(number)){
            const regNumberError = document.getElementById("regNumberError")
            regNumberError.style.color = "red"
            regNumberError.textContent = "Only numbers allowed"
            return
        }

        if(password.length < 5 || password.length > 20){
            const regPasswordError = document.getElementById("regPasswordError")
            regPasswordError.style.color = "red"
            regPasswordError.textContent = "Minimum 5 Maximum 20"
            return
        }

        alert("Регистрация прошла успешно")
    })
}