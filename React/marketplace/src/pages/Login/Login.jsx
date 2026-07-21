import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../api/authApi"
import "./Login.css"

export default function Login(){
    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: "emilys",
        password: "emilyspass"
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    function handleChange(e){
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(!form.username || !form.password){
            setError("Заполните все поля")
            return
        }

        try{
            setLoading(true)
            setError("")
            const data = await loginUser(form.username, form.password)

            localStorage.setItem("token", data.accessToken)
            localStorage.setItem("user", JSON.stringify(data))

            navigate("/profile")
        }
        catch(err){
            setError("Неверный логин или пароль")
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="login_container">
            <div className="login_card">
                <h1 className="login_title">Войти в аккаунт</h1>
                
                {error && <div className="login_error">{error}</div>}

                <form onSubmit={handleSubmit} className="login_form">
                    <div className="input_group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input 
                            type="text" 
                            id="username"
                            name="username" 
                            value={form.username} 
                            onChange={handleChange} 
                            placeholder="Введите ваш логин"
                            disabled={loading}
                        />
                    </div>

                    <div className="input_group">
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            value={form.password} 
                            onChange={handleChange} 
                            placeholder="Введите пароль"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="login_button" disabled={loading}>
                        {loading ? <span className="spinner"></span> : "Войти"}
                    </button>
                </form>

                <p className="login_redirect">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    )
}