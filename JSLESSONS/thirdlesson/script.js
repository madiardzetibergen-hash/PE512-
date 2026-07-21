//  ========= Функции =========

// function sayHello(){
//     console.log("Hello")
// }

// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()

// function greet(name){
//     console.log(`Привет ${name}`)
// }

// greet("Alex")
// greet("John")
// greet("Edward")
// greet(123)

// function sum(a,b){
//     return a + b 
// }
// let numbers1 = sum(1,1)
// console.log(sum(4,5))
// console.log(sum(1,2))
// console.log(sum(3,3))
// console.log(numbers1)


// function multiply(a,b){
//     return a * b 
// }
// console.log(multiply(4,5))
// console.log(multiply(7,8))

// function checkAge(age){
//     if(age >= 18){
//         console.log("Доступ разрещен")
//     }
//     else{
//         console.log("Доступ запрещен")
//     }
// }

// checkAge(20)
// checkAge(15)


// function shout(word){
//     console.log(word.toLowerCase())
// }
// shout("hello")
// shout("javascript")


// function getDiscount(price){
//     return price * 0.9
// }
// let newPrice = getDiscount(1000);
// console.log("Цена со скидкой" + newPrice)

// function test(){
//     console.log("Начало")
//     return 10
//     console.log("Конец")
// }
// console.log(test())

// function getUpper(num){
//     if(num < 5){
//         console.log("Да твое число больше 5")
//     }
   
//     return

// }
// getUpper(6)
// getUpper(2)

// Удвоить число 
// Найти квадрат числа num * num
// найти сумму двух чисел
// Найти разницу(минус)
// Проверка на четность


// function square(num){
//     return num * num
// }

// const square2 = (num) =>{
//     return num * num
// }
// const square3 = (num) => num * num

// const add = (a,b) => {
//     return a + b
// }
// const add2 = (a,b) => a + b

// const isEven = num => num % 2 === 0

// const isAdult = age => age >= 18

// const getLength = text => text.length
// console.log(getLength("Javascript"))

// const getDiscount = price => price * 0.7


// console.log(getDiscount(5000))
// console.log(isAdult(19))
// console.log(isAdult(16))
// console.log(isEven(6))
// console.log(isEven(9))
// console.log(add(1,2))
// console.log(add2(2,2))

// ========= Массивы =========

// let numbers = [10,20,30,40,50,60]

// numbers.push(70)
// numbers.pop()
// numbers.unshift(0)
// numbers.shift()
// console.log(numbers.includes(100))
// console.log(numbers.indexOf(60))
// console.log(numbers.slice(1,3))


// for(let i = 0; i < numbers.length; i++){
//     console.log(i,numbers[i]) 
// }

// let words = ["Я", "Учу", "Javascript"]
// let a = words.join(" ")
// console.log(a)

// map -> Создать новый массив

// let nums = [1,2,3,4]
// let doubled = nums.map(num => num * 2)

// console.log(doubled)

// filter -> оставить только подходящие элементы

// let nums = [1,2,3,4,5,6,7,8]
// let evenNums = []

// for(let i = 0; i < nums.length; i++){
//     if(nums[i] % 2 === 0){
//         evenNums.push(nums[i])
//     }
// }
// console.log(evenNums)

// let nums = [1,2,3,4,5,6,7,8]
// let evenNums = nums.filter(num => num % 2 === 0)

// console.log(evenNums)

// let result = nums.find(clock => clock )
// console.log(result)

// let fruits = ["🍓", "🍐","🥑"]

// fruits.forEach(fruit =>{
//     console.log("Фрукт:", fruit)
// } )

let arr = [10, 20, 30, 40];
arr.splice(1,3,50,30);

console.log(arr);


