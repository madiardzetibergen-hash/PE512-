type UserCardProps = {
    name: string
    age: number
    isOnline: boolean
}

export default function UserCard({name, age, isOnline}: UserCardProps){
    return(
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>{isOnline ? "Online" : "Offline"}</p>
        </div>
    )
}