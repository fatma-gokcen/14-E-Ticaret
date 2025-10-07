import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import ProductDetails from '../Components/ProductDetails'
import Cart from '../Pages/Cart'

export default function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/product-details/:id' element={<ProductDetails />} />

                <Route path='/cart' element={<Cart />} />



            </Routes>


        </div>
    )
}
