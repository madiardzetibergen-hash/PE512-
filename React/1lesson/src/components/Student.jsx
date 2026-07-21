export default function Student({ student }) {
  return (
    <div>
      <h2>{student.name}</h2>
      <p>Направление: {student.direction}</p>
      <p>Возраст: {student.age}</p>
    </div>
  )
}