import http from "node:http"
import db from "./database/database.js"

const PORT = 8000

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json;charset=utf-8")
    res.end(JSON.stringify(data)) 
}

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = ""

        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            try {
                const data = body ? JSON.parse(body) : {}
                resolve(data)
            } catch {
                reject(new Error("Некорректный JSON"))
            }
        })
        req.on("error", () => {
            reject(new Error("Ошибка чтения запроса"))
        })
    })
}

function getIdFromPath(pathname, resourceName) {
    const parts = pathname.split("/").filter(Boolean)

    if (parts.length !== 2) {
        return null
    }
    if (parts[0] !== resourceName) {
        return null
    }
    const id = Number(parts[1])

    if (!Number.isInteger(id) || id <= 0) {
        return null
    }
    return id
}

// Добавлено ключевое слово async, чтобы работал await внутри
const server = http.createServer(async (req, res) => {
    // Безопасное чтение пути (pathname) из req.url
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
    const pathname = parsedUrl.pathname

    console.log(`${req.method} === ${pathname}`)

    // 1. Главная страница
    if (req.method === "GET" && pathname === "/") {
        return sendJson(res, 200, {
            success: true,
            message: "Student API работает"
        })
    }

    // 2. Получение списка всех студентов
    if (req.method === "GET" && pathname === "/students") {
        try {
            const students = db.prepare(`
                SELECT id, name, age, course
                FROM students
                ORDER BY id ASC
            `).all()

            return sendJson(res, 200, {
                success: true,
                count: students.length,
                data: students
            })
        } catch (error) {
            return sendJson(res, 500, { success: false, message: "Ошибка базы данных" })
        }
    }

    // 3. Получение студента по ID
    if (req.method === "GET") {
        const studentId = getIdFromPath(pathname, "students")

        if (studentId !== null) {
            try {
                const student = db.prepare(`
                    SELECT id, name, age, course
                    FROM students
                    WHERE id = ?
                `).get(studentId)

                if (!student) {
                    return sendJson(res, 404, {
                        success: false,
                        message: "Студент не найден"
                    })
                }
                return sendJson(res, 200, {
                    success: true,
                    data: student
                })
            } catch (error) {
                return sendJson(res, 500, { success: false, message: "Ошибка базы данных" })
            }
        }
    }

    // 4. Создание нового студента (Перемещено ВЫШЕ дефолтного 404 ответа)
    if (req.method === "POST" && pathname === "/students") {
        try {
            const body = await readJsonBody(req)

            // Исправлено: добавлены скобки () к методу .trim()
            const name = typeof body.name === "string" ? body.name.trim() : ""
            const age = Number(body.age)
            // Исправлено: парсим body.course, а не body.name
            const course = typeof body.course === "string" ? body.course.trim() : ""

            // Валидация входных данных
            if (!name || !course || Number.isNaN(age) || age <= 0) {
                return sendJson(res, 400, {
                    success: false,
                    message: "Поля name, course и корректный age обязательны"
                })
            }

            // Исправлено: передаем параметры в метод .run(...)
            const insertResult = db.prepare(`
                INSERT INTO students(name, age, course)
                VALUES(?, ?, ?)
            `).run(name, age, course)

            const createdStudent = db.prepare(`
                SELECT id, name, age, course
                FROM students
                WHERE id = ?
            `).get(insertResult.lastInsertRowid)
            
            return sendJson(res, 201, {
                success: true,
                message: "Студент создан",
                data: createdStudent
            })
        } catch (error) {
            return sendJson(res, 400, {
                success: false,
                message: error.message
            })
        }
    }

    // 5. Дефолтный ответ (в самом конце)
    return sendJson(res, 404, {
        success: false,
        message: "Маршрут не найден"
    })
})

server.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`)
})