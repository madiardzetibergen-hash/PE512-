import http from "node:http"

const students = [
    {
        id: 1,
        name: "Alex",
        age: 21,
        course: "Nodejs"
    }
]
students.push({
        id: 2,
        name: "AlexM",
        age: 22,
        course: "Nodejs"
})


function sendJson(res,statusCode,data){
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json;charset=utf-8")
    res.end(JSON.stringify(data)) 
}

const server = http.createServer((req,res) => {
    if (req.method === "GET" && req.url == "/students"){
        return sendJson(res, 200,{
            success: true,
            count: students.length,
            data: students
        })
    }
    return sendJson(res, 404,{
        success: false,
        message: "Маршрут не найден",
    })
})

server.listen(8000, () =>{
    console.log("Сервер запущен: http://localhost:8000")
})