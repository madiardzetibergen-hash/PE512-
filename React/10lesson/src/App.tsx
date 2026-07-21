

function App() {
  // let username: string = "Qwerty"
  // username = "React student"
  // let age: number = 20
  // let price: number = 4990
  // let raiting: number = 4.8
  // let isAuth: boolean = true
  // let isLoading: boolean = false

  // let token: string | null | number = null
  // let userName: string | undefined = undefined

  // // Type inference
  // let city = "Almaty"

  // // arrays
  // const students: string[] = ["Qwerty", "Dias", "Bayaman"]
  // const students2: number[] = [15, 16, 17]

  // // обьект, type - interface

  // // const product = {
  // //   id:1,
  // //   title: "Iphone",
  // //   price: 500000
  // // }

  // // type
  // type Product = {
  //   id: number,
  //   title: string,
  //   price: number,
  //   isAvailable?: boolean
  // }
  // const product: Product = {
  //   id: 1,
  //   title: "String",
  //   price: 500000,
  //   isAvailable: true
  // }
  // // optional property
  // type Product2 = {
  //   id: number,
  //   title: string,
  //   price: number,
  //   isAvailable?: boolean
  // }
  // const product2: Product = {
  //   id: 1,
  //   title: "String",
  //   price: 500000
  // }

  // // interface
  // interface User{
  //   id: number,
  //   name: string,
  //   email: string
  // }
  // interface Admin extends User{
  //   role:string
  // }


  // const user: Admin = {
  //   id: 1,
  //   name: "Ali",
  //   email: "ali@gmail.com",
  //   role: "owner"
  // }
  // function sum(a: number, b: number): number{
  //   return a + b
  // }

  // const multiply = (a: number, b: number): number => {
  //   return a + b
  // }

  // type Product3 = {
  //   title: string
  //   price: number
  // }
  // function showProduct(product: Product3): void{
  //   console.log(`${product.title} стоит ${product.price}`)
  // }
  // showProduct({
  //   title: "Iphone",
  //   price: 500000
  // })

  // // union types and literal types

  // let status: string = "loading"
  // status = "succsess"
  // status = "error"
  // status = "hello"

  // // literal types

  // type Status = "loading" | "success" | "error"

  // let status2: Status = "loading"
  // status = "success"
  // status = "error"

  // type ButtonVariant = "primary" | "secondary" | "danger"

  // type ButtonProps = {
  //   text: string
  //   variant: ButtonVariant
  // }

type Course = {
  id: number
  title: string
  duration: number
  level: "beginner" | "middle" | "advanced"
  isActive: boolean
}

const courses: Course[] = [
  {
    id: 1,
    title: "React",
    duration: 24,
    level: "beginner",
    isActive: true
  },
  {
    id: 2,
    title: "Next.js",
    duration: 20,
    level: "middle",
    isActive: true
  },
  {
    id: 3,
    title: "TS",
    duration: 8,
    level: "middle",
    isActive: false
  },
]

function getActiveCourses(courses: Course[]): Course[]{
  return courses.filter((course) => course.isActive)
}
console.log(getActiveCourses(courses))

function findCourseById(courses: Course[], id: number): Course | undefined{
  return courses.find((course) => course.id === id)
}
console.log(findCourseById(courses,4))

  return(
    <>
      <h1>TYPESCRIPT</h1>
    </>
  )
}

export default App
