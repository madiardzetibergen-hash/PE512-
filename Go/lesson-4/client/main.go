package main

import (
	"bufio"
	"fmt"
	"net"
	"sync"
	"time"
)

func runClient(id int, wg *sync.WaitGroup) {
	defer wg.Done()

	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		fmt.Printf("[Клиент %d] Ошибка подключения: %v\n", id, err)
		return
	}
	defer conn.Close()

	reader := bufio.NewReader(conn)

	for i := 1; i <= 3; i++ {
		msg := fmt.Sprintf("Сообщение %d от клиента %d\n", i, id)
		
		// Отправка
		_, err := conn.Write([]byte(msg))
		if err != nil {
			fmt.Printf("[Клиент %d] Ошибка отправки: %v\n", id, err)
			return
		}

		// Чтение ответа
		response, err := reader.ReadString('\n')
		if err != nil {
			fmt.Printf("[Клиент %d] Ошибка чтения: %v\n", id, err)
			return
		}

		fmt.Printf("[Клиент %d] Получено: %s", id, response)
		time.Sleep(500 * time.Millisecond) // Пауза между сообщениями
	}
}

func main() {
	var wg sync.WaitGroup

	// Запускаем 3 клиентов одновременно
	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go runClient(i, &wg)
	}

	wg.Wait()
	fmt.Println("Все клиенты завершили работу.")
}