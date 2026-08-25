package main

import (
	"fmt"
	"net"
)

func main(){
	listener, err := net.Listen("tcp",":8000")

	if err != nil {
		fmt.Println("Ошибка запуска сервера: ",err)
		return
	}

	fmt.Println("Сервер запущен на порту 8000")
	fmt.Println("Ожидание клиента...")

	conn, err := listener.Accept()

	if err != nil{
		fmt.Println("Ошибка подключения: ", err)
	}
	fmt.Println("Клиент подключился:", conn.RemoteAddr())
}
