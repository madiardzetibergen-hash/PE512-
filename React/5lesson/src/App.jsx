// import Button from "@mui/material/Button"
// import Card from "@mui/material/Card"
// import CardContent from "@mui/material/CardContent"
// import Typography from "@mui/material/Typography"


// export default function App(){
//   return(
//     <div >
//       <Button variant="contained">
//         Войти
//       </Button>
//       <Button variant="outlined">
//         Регистрация
//       </Button>
//       <div>
//         <Card sx={{maxWidth: 300}}>
//           <CardContent>
//             <Typography variant="h5">
//               Iphone 15
//             </Typography>
//             <Typography>
//               Цена: 999$
//             </Typography>
//             <Button variant="contained">Подробнее</Button>
//             </CardContent>   
//         </Card>
//       </div>
//     </div>
//   )
// }

import {Button, Input, Card} from "antd"

export default function App(){
  return(
    <Card title ="Вход" style={{width: 300}}>
      <Input placeholder="Email"/>
      <Input.Password placeholder="Пароль"/>
      <Button type="primary">Войти</Button>
    </Card>
  )
}
