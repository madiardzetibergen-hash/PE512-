// const express = require("express")

// const app = express()

// const PORT = 5000

// // Middleware для автоматического парсинга JSON из тела запроса (req.body)
// app.use(express.json())

// // Имитация базы данных
// let books = [
//   { id: 1, title: "Мастер и Маргарита", author: "Михаил Булгаков", year: 1967 },
//   { id: 2, title: "Преступление и наказание", author: "Фёдор Достоевский", year: 1866 },
//   { id: 3, title: "1984", author: "Джордж Оруэлл", year: 1949 }
// ]

// // Главная страница
// app.get("/", (req, res) => {
//   res.json({
//     name: "Books API",
//     version: 1
//   })
// })

// // О проекте
// app.get("/about", (req, res) => {
//   res.json({
//     project: "Library API",
//     technology: "Node.js and Express"
//   })
// })

// // --- READ (Получение данных) ---

// // 1. Получить список всех книг
// app.get("/books", (req, res) => {
//   res.json(books)
// })

// // 2. Получить одну книгу по ID
// app.get("/books/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const book = books.find(b => b.id === id)

//   if (!book) {
//     return res.status(404).json({ message: "Книга не найдена" })
//   }

//   res.json(book)
// })

// // --- CREATE (Создание данных) ---

// // 3. POST — Добавить новую книгу
// app.post("/books", (req, res) => {
//   const { title, author, year } = req.body

//   if (!title || !author) {
//     return res.status(400).json({ message: "Укажите название (title) и автора (author)" })
//   }

//   const newBook = {
//     id: books.length > 0 ? books[books.length - 1].id + 1 : 1, // Генерация ID
//     title,
//     author,
//     year: year || null
//   }

//   books.push(newBook)
//   res.status(201).json(newBook)
// })

// // --- UPDATE (Обновление данных) ---

// // 4. PUT — Полное обновление книги
// app.put("/books/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const index = books.findIndex(b => b.id === id)

//   if (index === -1) {
//     return res.status(404).json({ message: "Книга не найдена" })
//   }

//   const { title, author, year } = req.body

//   if (!title || !author) {
//     return res.status(400).json({ message: "При PUT нужно передать все обязательные поля (title, author)" })
//   }

//   books[index] = { id, title, author, year: year || null }
//   res.json(books[index])
// })

// // 5. PATCH — Частичное обновление книги
// app.patch("/books/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const book = books.find(b => b.id === id)

//   if (!book) {
//     return res.status(404).json({ message: "Книга не найдена" })
//   }

//   const { title, author, year } = req.body

//   if (title !== undefined) book.title = title
//   if (author !== undefined) book.author = author
//   if (year !== undefined) book.year = year

//   res.json(book)
// })

// // --- DELETE (Удаление данных) ---

// // 6. DELETE — Удалить книгу по ID
// app.delete("/books/:id", (req, res) => {
//   const id = Number(req.params.id)
//   const index = books.findIndex(b => b.id === id)

//   if (index === -1) {
//     return res.status(404).json({ message: "Книга не найдена" })
//   }

//   const deletedBook = books.splice(index, 1)
//   res.json({ message: "Книга успешно удалена", book: deletedBook[0] })
// })

// app.listen(PORT, () => {
//   console.log(`Сервер запущен: http://localhost:${PORT}`)
// })


const express = require("express")
require("dotenv").config()

const app = express()
const pool = require("./db")

const PORT = Number(process.env.PORT) || 5000

app.use(express.json())

app.get("/health", async(req,res) =>{
    try{
        const result = await pool.query(
            "SELECT NOW() AS database_time"
        )
        res.status(200).json({
            success: true,
            message: "Postgresql is working",
            databaseTime: result.rows[0].database_time
        })
    }catch(error){
        console.log(error)

        res.status(500).json({
            success: false,
            message: "Error connecting with PostgreSQL"
        })
    }
})

app.get("/books", async(req,res) =>{
    try{
        const result = await pool.query(
            "SELECT * FROM books ORDER BY id ASC"
        )
        res.status(200).json({
            success: true,
            count: result.rowCount,
            data: result.rows
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Cannot get books"
        })
    }
})


app.get("/books/:id", async(req,res) =>{
    const id = Number(req.params.id)

    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({
            success: false,
            message: "Id must be positive"
        })
    }

    try{
        const result = await pool.query(`
            SELECT * FROM books WHERE id = $1
            `, [id])
        if (result.rowCount === 0){
            return res.status(404).json({
                success:false,
                message: "Book not found"
            })
        }
        res.status(200).json({
            success:true,
            data:result.rows[0]
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
})

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`)
})