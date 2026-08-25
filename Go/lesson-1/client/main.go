package main

import (
	"fmt"
	"net"
)

func main(){
	conn, err := net.Dial("tcp", "localhost:8000")

	if err != nil{
		fmt.Println("Ошибка подключения",err)
		return
	}
	fmt.Println("Подключение успешно")

	conn.Close()
}