// const nameInput = document.getElementById("nameInput")
// const saveBtn = document.getElementById("saveBtn")
// const showBtn = document.getElementById("showBtn")
// const result = document.getElementById("result")
// const removeBtn = document.getElementById("removeBtn")
// const clearBtn = document.getElementById("clearBtn")


// saveBtn.addEventListener("click", () =>{
//     localStorage.setItem("username", nameInput.value)
// })

// showBtn.addEventListener("click", () =>{
//     const savedName = localStorage.getItem("username")
//     result.textContent = savedName
// })

// removeBtn.addEventListener("click", () =>{
//     localStorage.removeItem("username")
// })

// clearBtn.addEventListener("click", () => {
//     localStorage.clear()
// })

// const user = {
//     name: "Dias",
//     age: "21",
// }
// localStorage.setItem("user", JSON.stringify(user))

// const savedUser = localStorage.getItem("user")

// const parsedUser = JSON.parse(savedUser)

// console.log(savedUser)
// console.log(parsedUser)
// console.log(parsedUser.name)

const themeBtn = document.getElementById("themeBtn")

const loginInput = document.getElementById("loginInput")
const loginText = document.getElementById("loginText")

loginInput.addEventListener("input", () =>{
    sessionStorage.setItem("current", loginInput.value)
})

const savedLogin = sessionStorage.getItem("current")

if(savedLogin){
    loginInput.value = savedLogin
    loginText.textContent = savedLogin
}

function applyTheme(){
    const savedTheme = localStorage.getItem("theme")

    if(savedTheme === "dark"){
        document.body.classList.add("dark")
    }
}
themeBtn.addEventListener("click", () =>{
    document.body.classList.toggle("dark")

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark")
    }
    else{
        localStorage.setItem("theme", "light")
    }
})

applyTheme()

