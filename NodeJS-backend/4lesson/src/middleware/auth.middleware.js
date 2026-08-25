const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    // 1. Получаем заголовок Authorization
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Токен авторизации отсутствует"
        })
    }

    // 2. Ожидаем формат "Bearer <TOKEN>"
    const parts = authHeader.split(" ")

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Некорректный формат заголовка Authorization (ожидается 'Bearer <token>')"
        })
    }

    const token = parts[1]

    try {
        // 3. Проверяем валидность токена
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4. Сохраняем расшифрованные данные (userId, role) в req.user
        req.user = decoded

        // Передаём управление следующему обработчику
        next()
    } catch (error) {
        // Различаем истёкший токен и поддельный/повреждённый
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Срок действия токена истёк"
            })
        }

        return res.status(401).json({
            message: "Недействительный токен"
        })
    }
}

module.exports = { authMiddleware }