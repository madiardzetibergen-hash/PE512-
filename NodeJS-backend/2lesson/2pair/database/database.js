// new Database -> Открыть или создать базу данных

// exec() -> Выполнение SQL без получение строк

// prepare() Подготовить sql-запрос

// .run() выполнить изменения

// .get() получить одну строку

// .all() получить массив строк

import Database from "better-sqlite3";

const db = new Database("database/school.db")


db.exec(`
    CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        course TEXT NOT NULL
    )
`)

// const insertStudent = db.prepare(`
//         INSERT INTO students(name,age,course)
//         VALUES(?,?,?)
//     `)
// const result = insertStudent.run("Али",17,"NodeJS")
// console.log(result)

export default db