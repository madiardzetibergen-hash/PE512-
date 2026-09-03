package main

import (
	"fmt"
	"time"
)

func printNumbers(){
	for i := 1; i <= 5; i++{
		fmt.Println("Number: ", i)

		time.Sleep(500 * time.Millisecond)
	}
}

func printLetters(){
	letters := []string{
		"A",
		"B",
		"C",
		"D",
		"E",
	}

	for _,letter := range letters{
		fmt.Println("Letter:",letter)

		time.Sleep(500 * time.Millisecond)
	}
}
func main(){
	go printNumbers()
	go printLetters()
	time.Sleep(3 * time.Second)
}

// Пример Последовательности
// func task1(){
// 	fmt.Println("Task 1 started")

// 	time.Sleep(2 * time.Second)

// 	fmt.Println("Task1 finished")
// }
// func task2(){
// 	fmt.Println("Task2 started")

// 	time.Sleep(2 * time.Second)

// 	fmt.Println("Task2 finished")
// }

// func main(){
// 	task1()
// 	task2()
// }

// конкурентность

// конкурентность -> все работает физически одновременно
// Процессор 

// goroutine

