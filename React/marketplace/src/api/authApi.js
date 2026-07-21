import axios from "axios"

const API_URL = "https://dummyjson.com"

export async function loginUser(username, password){
    const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
    })
    return response.data
}

export async function getCurrentUser(token){
    const response = await axios.get(`${API_URL}/auth/me`, {
        headers:{
            Authorization: `Bearer ${token}` 
        }
    })
    return response.data
}


