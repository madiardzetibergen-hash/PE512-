const express = require("express")
require("dotenv").config()

const pool = require("./db")
const authRoutes = require("./routes/auth.routes")

const app = express()

app.use(express.json())

app.get("/health", (req,res) =>{
    res.json({
        message: "Сервер работает"
    })
})

app.get("/", (req,res) =>{
    res.json({
        message: "Главная страница Shop API"
    })
})

app.use("/api/auth", authRoutes)

app.use((req,res) =>{
    res.status(404).json({
        message:"Маршрут не найден"
    })
})

const PORT = process.env.PORT || 8000

async function startServer(){
    try{
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET отсутствует в .env")
        }
        await pool.query("SELECT 1")
        console.log("POSTGRES работает")

        app.listen(PORT, () =>{
            console.log(`Сервер запущен: http://localhost:${PORT}`)
        })
    }catch(error){
        console.error("Не удалось запустить сервер",error.message)
        process.exit(1)
    }
}
startServer()

