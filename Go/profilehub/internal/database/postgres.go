package database


import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func Open(databaseURL string)(*sql.DB, error){
db, err := sql.Open("postgres",databaseURL)

if err != nil{
	return nil,err
}
if err := db.Ping(); err != nil{
	return nil,err
}

fmt.Println("PostgreSQL connected")
return db,nil

}