const express = require("express")
const bcrypt = require("bcrypt")
const {authMiddleware} = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken")
const pool = require("../db")
const router = express.Router()

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        // 1. Проверка типов входящих данных (Исправлено)
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({
                message: "Имя, email и пароль обязательны"
            })
        }

        const cleanName = name.trim()
        const normalizedEmail = email.trim().toLowerCase()

        // 2. Валидация полей
        if (cleanName.length < 2) {
            return res.status(400).json({
                message: "Имя должно содержать минимум 2 символа"
            })
        }

        // Вызов функции валидации email (Добавлено)
        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                message: "Некорректный формат email"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Пароль должен содержать минимум 8 символов"
            })
        }

        // 3. Проверка существования пользователя
        const existingUserResult = await pool.query(
            `SELECT id FROM users WHERE email = $1`,
            [normalizedEmail]
        )

        if (existingUserResult.rows.length > 0) {
            return res.status(409).json({
                message: "Пользователь с таким email уже существует"
            })
        }
        
        // 4. Хеширование пароля
        const passwordHash = await bcrypt.hash(password, 10)

        // 5. Создание нового пользователя
        const newUserResult = await pool.query(
            `
                INSERT INTO users (name, email, password_hash)
                VALUES ($1, $2, $3)
                RETURNING id, name, email, role, created_at
            `,
            [cleanName, normalizedEmail, passwordHash]
        )

        return res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
            user: newUserResult.rows[0]
        })

    } catch (error) {
        console.error("Ошибка регистрации:", error)

        // Обработка race condition на уровне базы данных (Уникальный индекс email)
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Пользователь с таким email уже существует"
            })
        }

        return res.status(500).json({
            message: "Внутренняя ошибка сервера"
        })
    }
})

router.post("/login", async(req,res) =>{
    try{
        const {email,password} = req.body
        
        if(typeof email !== "string" || typeof password !== "string"){
            return res.status(400).json({
                message: "Email и пароль обязательны"
            })
        }

        const normalizedEmail = email.trim().toLowerCase()

        const userResult = await pool.query(
            `
                SELECT
                id,
                name,
                email,
                password_hash,
                role,
                created_at
                FROM users 
                WHERE email = $1
            `, [normalizedEmail])

        if(userResult.rows.length === 0){
            return res.status(401).json({
                message: "Неверный email или пароль"
            })
        }
        const user = userResult.rows[0]

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password_hash
        )

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Неверный email или пароль"
            })
        }

        const token = jwt.sign(
        {
            userId: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,{
            algorithm: "HS256",
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    )
    return res.status(200).json({
        message: "Вход выполнен успешно",
        token,
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at
        }
    })

    }
    catch(error){
        console.error("Ошибка входа", error)
        return res.status(500).json({
            message:"Внутренняя ошибка сервера"
        })
    }
})


module.exports = router;