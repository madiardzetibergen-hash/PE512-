import http from "node:http"
import { json } from "node:stream/consumers"

// const server = http.createServer((request,response) =>{
//     response.end("Hello from node.js server")
// })


// request -> req
// URL
// HTPP-method
// заголовок Header -> json 
// данные запросы body -> POST,PUT UPDATE

// response -> res 
// Установить статус
// добавить заголовки
// отправить данные
// завершить ответ
// const server = http.createServer((req,res) =>{
//     console.log("Method: ", req.method)
//     console.log("Address: ", req.url)
//     res.setHeader("Content-Type", "text/plain; charset=utf-8")

//     res.end("Привет")
// })

// const server = http.createServer((req,res) =>{
//     console.log("Method: ", req.method)
//     console.log("Address: ", req.url)
//     res.setHeader("Content-Type", "text/html; charset=utf-8")

//     res.end(`
//         <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     <h1>Мой первый сервер</h1>
//     <p>Эта страница отправлена сервером Node.jss</p>
// </body>
// </html>
//         `)
// })


// const server = http.createServer((req,res) =>{
//     console.log("Method: ", req.method)
//     console.log("Address: ", req.url)
//     res.setHeader("Content-Type", "text/html; charset=utf-8")

//     if(req.url === "/"){
//         res.statusCode = 200
//         res.end("Главная страница")
//     }
//     else if(req.url === "/about"){
//         res.statusCode = 200
//         res.end("О нас")
//     }
//     else if(req.url === "/contacts"){
//         res.statusCode = 200
//         res.end("Контакты")
//     }
//     else{
//         res.statusCode = 404
//         res.end("Страница не найдена")
//     }
// })

// res
// req
// end
// statusCode
// req.url
// req.method

// 200 успешный запрос
// 201 контент создан
// 400 неправильный запрос
// 401 пользователь не авторизован
// 403 доступ запрещен
// 500 внутренняя ошибка сервера

const products = [
    {
        id:1,
        name: "Laptop",
        price: 500000
    },
    {
        id:2,
        name: "Smartphone",
        price: 300000
    },
    {
        id:1,
        name: "Headphones",
        price: 650000
    }
]

const server = http.createServer((req,res) =>{
    if(req.method === "GET" && req.url === "/"){
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.end("Добро пожаловать на сервер магазина")
    }
    else if(req.method === "GET" && req.url === "/products"){
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json; charset=utf-8")
        res.end(JSON.stringify(products))
    }else{
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json; charset=utf-8")
        res.end(
            JSON.stringify({
                success: false,
                message: "Маршрут не найден"
            })
        )
    }
})


server.listen(5000, () =>{
    console.log("Сервер запущен: http://localhost:5000")
})
