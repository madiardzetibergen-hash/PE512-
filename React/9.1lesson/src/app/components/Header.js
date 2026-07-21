import Link from "next/link"

export default function Header(){
    return(
        <header className="header">
            <Link href="/" className="logo">
                Hooks Next
            </Link>
            <nav className="nav">
                <Link href = "/">Главная</Link>
                <Link href="/notes">Заметки</Link>
            </nav>
        </header>
    )
}