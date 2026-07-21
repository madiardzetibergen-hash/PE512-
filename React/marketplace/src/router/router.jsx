import {Routes, Route} from "react-router-dom"

import MainLayout from "../layout/MainLayout"

import HomePage from "../pages/HomePage/HomePage"
import ProductsPage from "../pages/ProductsPage/ProductsPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import NotFound from "../pages/NotFound/NotFound"
import CartPage from "../pages/CartPage/CartPage"

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"

export default function AppRouter(){
    return(
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/products/:id" element={<ProductDetailPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                
                <Route path="/profile" 
                element ={
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<NotFound/>}/>

             
            </Route>
        </Routes>
    )
}
