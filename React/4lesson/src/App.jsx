import {Routes, Route} from "react-router-dom"

import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"

export default function App(){
    return(
        <div>
            <Header/>
            <main>
                <Routes>
                    <Route element={<HomePage/>} path="/"/>
                    <Route element={<AboutPage/>} path="/about"/>
                    <Route element={<ProductsPage/>} path="/products"/>
                    <Route element={<ProductDetailPage/>} path="/products/:id"/>
                    <Route element={<NotFound/>} path="*"/>
                </Routes>
            </main>
            
        </div>
    )
}