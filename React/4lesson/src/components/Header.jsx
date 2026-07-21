import {NavLink} from "react-router-dom"
import "./Header.css";

export default function Header(){
    return(
        <header>
            <nav>
                <NavLink to="/">Главная страница</NavLink>
                <NavLink to="/about">О нас</NavLink>
                <NavLink to="/products">Товары</NavLink>
            </nav>
        </header>
    )
}