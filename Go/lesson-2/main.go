package main
import "fmt"

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

	numbers := []int{10,20,30,40,50}
	part := numbers[1:4]
	fmt.Println(numbers)
	fmt.Println(part)

	// make создает некоторые встроенные структуры GO,
	// наример slice,map и channel

	users := make([]string, 0)

	// len -> сколько элементов сейчас доступно
	// capacity -> сколько элементов может вместить без расширения

}
