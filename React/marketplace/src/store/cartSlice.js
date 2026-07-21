import {createSlice} from "@reduxjs/toolkit"
import { act } from "react"

function loadCartFromLocalStorage(){
    const savedCart = localStorage.getItem("cart")

    if(savedCart){
        return JSON.parse(savedCart)
    }
    return []
}

function saveCartToLocalStorage(cartItems){
    localStorage.setItem("cart", JSON.stringify(cartItems))
}

const initialState ={
    items: loadCartFromLocalStorage()
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload

            const exitingProduct = state.items.find((item) => item.id === product.id)

            if(exitingProduct){
                exitingProduct.quantity += 1
            }
            else{
                state.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thuhmnail: product.thuhmnail,
                    quantity: 1
                })
            }
            saveCartToLocalStorage(state.items)
        },
        increaseQuantity: (state, action) =>{
            const productId = action.payload

            const product = state.items.find((item) => item.id === productId)

            if(product){
                product.quantity += 1
            }
            saveCartToLocalStorage(state.items)
        },
        decreaseQuantity: (state, action) =>{
            const productId = action.payload

            const product = state.items.find((item) => item.id === productId)

            if(product && product.quantity > 1){
                product.quantity -= 1
            }
            else{
                state.items = state.items.filter((item) => item.id !== productId)
            }
            saveCartToLocalStorage(state.items)
        },
        removeFromCart: (state, action) =>{
            const productId = action.payload

            state.items = state.items.filter((item) => item.id !== productId)

            saveCartToLocalStorage(state.items)
        },
        clearCartToLocalStorage: (state) =>{
            state.items = []
            localStorage.removeItem("cart")
        }
    }
})

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCartToLocalStorage
} = cartSlice.actions
export default cartSlice.reducer