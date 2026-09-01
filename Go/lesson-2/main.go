package main

import (
	// "errors"
	"fmt"
	// "net"
	"net/http"
)

// func divide(a float64, b float64)(float64,error){
// 	if b == 0{
// 		return 0,
// 		errors.New("нельзя делить на ноль")
// 	}
// 	return a / b, nil
// }

	func homeHandler(w http.ResponseWriter, r *http.Request){
		fmt.Fprintln(w, "Hello from Go server")
	}

func main(){
	// var name string = "Qwerty"
	// name2 := "Asd"
	// // string
	// // int
	// // float64
	// // bool

	// // if age >= 18 {
	// // 	result
	// // }else

	// // for i := 0: i < 5; i++{
	// // 	result
	// // }
	// fmt.Println(name)
	// fmt.Println(name2)
	// // Scan

	// // Новые темы

	// var names [3]string

	// names[0] = "Qwe"
	// names[1] = "Asd"
	// names[2] = "Zxc"

	// names2 := [3]string{"Alex", "John", "Anna"}

	// // for i := 0; i < len(names); i++{
	// // 	fmt.Println(names[i])
	// // }

	// for _,value := range names{
	// 	fmt.Println(value)
	// }

	// // fmt.Println(names)
	// fmt.Println(names2[1])
	// // fmt.Println(len(names))

	// names := []string{"Alex", "John", "Emma", "King"}
	// names = append(names,"Choo")
	// fmt.Println(names)

	// numbers := []int{10,20,30,40,50}
	// part := numbers[1:4]
	// fmt.Println(numbers)
	// fmt.Println(part)

	// make создает некоторые встроенные структуры GO,
	// наример slice,map и channel

	// users := make([]string, 0)

	// len -> сколько элементов сейчас доступно
	// capacity -> сколько элементов может вместить без расширения

	// MAP

	// user := map[string]string{
	// 	"name": "Alex",
	// 	"city": "New-York",
	// }

	// ages := map[string]int{
	// 	"Alex": 20,
	// 	"John": 25,
	// 	"Emma": 30,
	// }
	// // fmt.Println(ages["Alex"])
	// // fmt.Println(ages)
	// ages["Qwerty"] = 19
	// ages["Alex"] = 21
	// delete(ages, "John")

	// for key,value := range ages{
	// 	fmt.Println(key,value)
	// }

	// struct = структура, которая обьединяет связанные поля в один тип.

	type User struct{
		Name string
		Age int
		Email string
		Active bool
	}

	// user := User{
	// 	Name: "Alex",
	// 	Age: 20,
	// 	Email: "alex@gmail.com",
	// 	Active: true,
	// }

	// fmt.Println(user.Name)
	// fmt.Println(user.Age)

	// Slice структур

	// users := []User{
	// 	{
	// 		Name: "Alex",
	// 		Age: 20,
	// 		Email: "alex@gmail.com",
	// 		Active: true,
	// 	},

	// 	{
	// 		Name: "John",
	// 		Age: 21,
	// 		Email: "john@gmail.com",
	// 		Active: true,
	// 	},
	// }

	// struct -> класс
	// methods -> методы
	// interfaces -> интерфейсы
	// композиция -> наследование

	// result, err := someFunction()

	// if err != nil{
	// 	fmt.Println("Ошибка", err)
	// 	return
	// }

	// result,err := divide(10,0)

	// if err != nil{
	// 	fmt.Println("Ошибка", err)
	// }
	// fmt.Println(result)

	// net.Listen("tcp", ":8080")

	// net.Listen("tcp", "localhost:8080")

	// принимать http request
	// разбирать method
	// разбирать url
	// читать headers
	// читать body
	// отправлять http response
	// запускать http-server
	// делать httl-client запросы

	// TCP bytes

	// GET
	// POST
	// JSON
	// status
	// headers
	// body


	http.HandleFunc("/", homeHandler)
	fmt.Println("Server started on http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)

	if err != nil{
		fmt.Println("Server error", err)
	}

}
