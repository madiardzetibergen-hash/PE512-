export default function Courses({title,lessons,description,duration}){
    return(
        <>
            <h2>{title}</h2>
            <p>{lessons}</p>
            <p>{description}</p>
            <p>{duration}</p>
        </>
    )
}