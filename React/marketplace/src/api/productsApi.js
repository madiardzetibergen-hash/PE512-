import axios from "axios"

const API_URL = "https://dummyjson.com"

export async function getProducts(){
    const response = await axios.get(`${API_URL}/products`)
    return response.data
}
export async function getProductById(id){
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data
}
export async function searchProducts(query){
    const response = await axios.get(`${API_URL}/products/search?q=${query}`)
    return response.data
}


