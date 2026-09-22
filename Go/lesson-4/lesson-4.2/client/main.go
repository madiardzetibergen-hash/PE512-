package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
)

func main() {
	// Подключаемся к нашему чат-серверу
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Println("Ошибка подключения к серверу:", err)
		return
	}
	defer conn.Close()

	// Горутина для постоянного чтения incoming-сообщений от сервера
	go func() {
		reader := bufio.NewReader(conn)
		for {
			message, err := reader.ReadString('\n')
			if err != nil {
				fmt.Println("\nСоединение с сервером потеряно.")
				os.Exit(0)
			}
			fmt.Print(message)
		}
	}()

	// В главном потоке читаем ввод пользователя из консоли и отправляем на сервер
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		text := scanner.Text()
		_, err := conn.Write([]byte(text + "\n"))
		if err != nil {
			fmt.Println("Ошибка отправки сообщения:", err)
			break
		}
	}
}