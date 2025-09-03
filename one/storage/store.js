import { configureStore } from "@reduxjs/toolkit";
import clothReducer from "../slices/clothSlice";
import cartReducer from "../slices/cartSlice"
import authReducer from "../slices/authSlice"

const store = configureStore({
    reducer: {
        cloths: clothReducer,
        cart: cartReducer,
        auth: authReducer,
    }
});

export default store;