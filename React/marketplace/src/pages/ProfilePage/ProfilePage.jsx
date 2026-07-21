import { useEffect, useState } from "react"
import { getCurrentUser } from "../../api/authApi"
import "./ProfilePage.css"

export default function ProfilePage(){
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user")
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadCurrentUser(){
            const token = localStorage.getItem("token")

            if(!token || token === "local-register-token"){
                return
            }
            try{
                setLoading(true)
                const data = await getCurrentUser(token)
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))
            }
            catch(err){
                console.log("Не удалось загрузить пользователя")
            }
            finally{
                setLoading(false)
            }
        }
        loadCurrentUser()
    }, [])

    // 1. Состояние загрузки (Красивый скелетон)
    if (loading) {
        return (
            <div className="profile_container">
                <div className="profile_card skeleton_card">
                    <div className="skeleton_avatar"></div>
                    <div className="skeleton_text title"></div>
                    <div className="skeleton_text subtitle"></div>
                    <div className="profile_info_grid">
                        <div className="skeleton_info_box"></div>
                        <div className="skeleton_info_box"></div>
                    </div>
                </div>
            </div>
        )
    }

    // 2. Если пользователя нет
    if (!user) {
        return (
            <div className="profile_container">
                <div className="profile_card text_center">
                    <h2 className="profile_name">Пользователь не найден</h2>
                    <p className="profile_label">Пожалуйста, войдите в систему, чтобы просмотреть профиль.</p>
                </div>
            </div>
        )
    }

    // 3. Основной контент профиля
    return (
        <div className="profile_container">
            <div className="profile_card">
                {/* Хедер профиля с аватаром */}
                <div className="profile_header">
                    <div className="profile_avatar">
                        {user.image ? (
                            <img src={user.image} alt={user.username} />
                        ) : (
                            user.firstName ? user.firstName[0].toUpperCase() : "U"
                        )}
                    </div>
                    <h1 className="profile_name">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="profile_username">@{user.username}</p>
                </div>

                <hr className="profile_divider" />

                {/* Сетка с личной информацией */}
                <div className="profile_info_grid">
                    <div className="info_box">
                        <span className="info_label">Email</span>
                        <span className="info_value">{user.email || "не указан"}</span>
                    </div>

                    <div className="info_box">
                        <span className="info_label">Пол</span>
                        <span className="info_value">
                            {user.gender === "female" ? "Женский" : user.gender === "male" ? "Мужской" : "Не указан"}
                        </span>
                    </div>

                    <div className="info_box">
                        <span className="info_label">ID Пользователя</span>
                        <span className="info_value"># {user.id}</span>
                    </div>

                    <div className="info_box">
                        <span className="info_label">Статус аккаунта</span>
                        <span className="info_value status_active">Активен</span>
                    </div>
                </div>
            </div>
        </div>
    )
}