package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Разрешаем подключение с любых доменов
	},
}

type Client struct {
	conn *websocket.Conn
	name string
}

var (
	clients      = make(map[*websocket.Conn]string)
	clientsMutex sync.Mutex
	messages     = make(chan string)
)

func broadcast() {
	for message := range messages {
		fmt.Print(message)

		clientsMutex.Lock()
		for conn := range clients {
			err := conn.WriteMessage(websocket.TextMessage, []byte(message))
			if err != nil {
				conn.Close()
				delete(clients, conn)
			}
		}
		clientsMutex.Unlock()
	}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Апгрейдим HTTP соединение до WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer func() {
		clientsMutex.Lock()
		name := clients[conn]
		delete(clients, conn)
		clientsMutex.Unlock()

		conn.Close()
		if name != "" {
			messages <- fmt.Sprintf("%s left the chat\n", name)
		}
	}()

	// 1. Читаем первое сообщение как имя пользователя
	_, nameBytes, err := conn.ReadMessage()
	if err != nil {
		return
	}

	name := string(nameBytes)
	if name == "" {
		name = "Anonymous"
	}

	clientsMutex.Lock()
	clients[conn] = name
	clientsMutex.Unlock()

	messages <- fmt.Sprintf("%s joined the chat\n", name)

	// 2. Слушаем все последующие сообщения
	for {
		_, msgBytes, err := conn.ReadMessage()
		if err != nil {
			break
		}

		msg := string(msgBytes)
		if msg != "" {
			messages <- fmt.Sprintf("%s: %s\n", name, msg)
		}
	}
}

func main() {
	// Обслуживаем статический HTML фронтенд
	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.HandleFunc("/ws", handleWebSocket)

	go broadcast()

	fmt.Println("Чат-сервер запущен на http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}