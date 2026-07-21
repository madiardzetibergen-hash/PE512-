import UserCard from "@/components/UserCard";
import Counter from "@/components/Counter";

export default function HomePage(){
  return(
    <main>
      <h1>TS</h1>
      <UserCard
        name = "Dias"
        age = {19}
        isOnline ={true}/>
      <Counter/>
    </main>
  )
}