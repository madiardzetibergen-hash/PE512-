import {createSlice} from "@reduxjs/toolkit"

const counterSlice = createSlice({
    name:"counter",
    initialState:{
        value:0
    },
    reducers:{
        increment: (state) =>{
            state.value += 1
        },
        decrement: (state) =>{
            state.value -= 1
        },
        reset: (state) =>{
            state.value = 0
        }
    }
})
export const {increment,decrement,reset} = counterSlice.actions
export default counterSlice.reducer


// import {create} from "zustand"

// export const useCartStore = create((set) =>{
//     items: [],

//     addToCart: (product) => set((state) => ({
//         items: [...state.items, product]
//     }))
//     clearCart: () => set({items: []})
// })

// import {atom} from "jotai"

// export const cartAtom = atom([])

// import {useAtom} from "jotai"
// use {cartAtom} from "../store/cartAtom"

// export default Product({product}){
//     const [cart, setCart] = useAtom(cartAtom)

//     function addToCart(){
//         setCart([...cart, product])
//     }
// }