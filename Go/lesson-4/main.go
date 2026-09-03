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