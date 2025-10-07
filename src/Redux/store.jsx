import { configureStore } from '@reduxjs/toolkit'
import appReducer from "../Redux/slices/appSlice"
import productReducer from "../Redux/slices/productSlice"


export const store = configureStore({
    reducer: {
        app: appReducer,
        product: productReducer
    },
})