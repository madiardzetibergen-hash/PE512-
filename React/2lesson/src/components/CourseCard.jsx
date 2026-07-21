export default function CourseCard({title,price}){
    return(
        <div>
            <h2>{title}</h2>
            <p>Цена: {price} тг</p>
        </div>
    )
}