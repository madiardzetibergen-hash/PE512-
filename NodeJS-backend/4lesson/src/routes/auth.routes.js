const express = require("express")
const bcrypt = require("bcrypt")
const {authMiddleware} = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken")
const pool = require("../db")

const router = express.Router()

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


router.post("/register", async(req,res) => {
    try{
        const {name,email,password} = req.body

        if(typeof name !== "string" || typeof email !== "string" || password !== "string"){
        return res.status(400).json({
            message: "Имя, email и пароль обязательны"
        })
    }

    const cleanName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()

    if (cleanName.length < 2){
        return res.status(400).json({
            message: "Имя должно содержать минимум 2 символа"
        })
    }
    if (password.length < 8){
        return res.status(400).json({
            message: "Пароль должен содержать минимум 8 символов"
        })
    }

    }

    
})