package main

import (
	"fmt"
)

// func sendMessage(ch chan string){
// 	ch <- "Hello from goroutine"
// }
// func calculate(a int, b int, result chan int){
// 	result <- a + b
// }

func main(){

	// result := make(chan int)

	// go calculate(10,20,result)

	// answer := <-result
	// fmt.Println(answer)
	// messages := make(chan string)

	// go sendMessage(messages)

	// message := <-messages
	// fmt.Println(message)
}


// package main

// import (
// 	"bufio"
// 	"fmt"
// 	"net"
// )

// func handleClient(conn net.Conn){
// 	defer conn.Close()

// 	fmt.Println("Client connected:", conn.RemoteAddr())

// 	reader := bufio.NewReader(conn)

// 	for {
// 		message, err := reader.ReadString('\n')

// 		if err != nil{
// 			fmt.Println("Client disconnected:", conn.RemoteAddr())
// 			return
// 		}
// 		fmt.Println("Received: ", message,)

// 		_, err = conn.Write([]byte("Server: " + message))

// 		if err != nil{
// 			return
// 		}
		
// 	}
// }

// func main(){
// 	listener, err := net.Listen("tcp", ":8080")
	
// 	if err != nil{
// 		fmt.Println("Server error:", err,)
// 		return
// 	}
// 	defer listener.Close()

// 	fmt.Println("TCP SERVER STARTED ON :8080")
	
// 	for {
// 		conn, err := listener.Accept()

// 		if err != nil {
// 			fmt.Println("Accept error:",err,)
// 			continue
// 		}
// 		go handleClient(conn)
		
// 	}
	
// }

// package main

// import (
// 	"fmt"
// 	"net"
// )

// func handleClient(conn net.Conn){
// 	defer conn.Close()

// 	fmt.Println("Worknig with:", conn.RemoteAddr())
// }

// func main(){
// 	listener, err := net.Listen("tcp", ":8080")

// 	if err != nil {
// 		fmt.Println("Server error", err)
// 	}

// 	defer listener.Close()

// 	fmt.Println("TCP server started on :8080")

// 	for {
// 		conn, err := listener.Accept()

// 		if err != nil{
// 			fmt.Println("Accept error", err)
// 			continue
// 		}
// 		fmt.Println("New client:", conn.RemoteAddr())
// 		conn.Close()
// 	}
// }

// // Последовательное выполнение