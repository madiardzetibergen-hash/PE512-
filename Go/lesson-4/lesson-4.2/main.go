package main

import(
	"bufio"
	"fmt"
	"net"
	"strings"
	"sync"
)

var clients = make(map[net.Conn]bool,)

var clientsMutex sync.Mutex

var messages = make(chan string,)

func addClient(conn net.Conn){
	clientsMutex.Lock()
	clients[conn] = true
	clientsMutex.Unlock()
}

func removeClient(conn net.Conn){
	clientsMutex.Lock()
	delete(clients, conn)
	clientsMutex.Unlock()
}

func broadcast(){
	for message := range messages{
		fmt.Print(message)
		clientsMutex.Lock()

		for client := range clients{
			_,err := client.Write([]byte(message),)
			if err != nil{
				client.Close()
				delete(
					clients,
					client,
				)
			}
		}
		clientsMutex.Unlock()
	}
}

func handleClient(conn net.Conn){
	defer conn.Close()
	defer removeClient(conn)

	addClient(conn)

	reader := bufio.NewReader(conn)

	_, err := conn.Write(
		[]byte("Enter your name:"),
	)

	if err != nil{
		return
	}
	name,err := reader.ReadString('\n')

	if err != nil{
		return
	}

	name = strings.TrimSpace(name)

	if name == ""{
		name = "Anonymous"
	}
	messages <- fmt.Sprintf("%s joined the chan \n", name,)

	for {
		message, err := reader.ReadString('\n')

		if err != nil{
			messages <- fmt.Sprintf("%s left the chat\n",name)
			return
		}
		message = strings.TrimSpace(message,)

		if message == ""{
			continue
		}

		messages <- fmt.Sprintf("%s: %s\n", name,message)
	}
}

func main(){
	listener, err := net.Listen("tcp", ":8080")

	if err != nil{
		fmt.Println("Server error", err)
		return
	}

	defer listener.Close()

	fmt.Println("Chat server started on :8080")

	go broadcast()

	for{
		conn, err := listener.Accept()

		if err != nil{
			fmt.Println("Accept error:",err)
			continue
		}
		fmt.Println("New collection:", conn.RemoteAddr(),)

		go handleClient(conn)
	}
}