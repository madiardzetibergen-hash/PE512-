import "./globals.css"
import Header from "./components/Header"

export const metadata = {
  title: "Custom Hooks Next",
  description: "Учебный сайт на Next.js с кастомными хуками"
}

export default function RootLayout({children}){
  return(
    <html lang="ru">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}