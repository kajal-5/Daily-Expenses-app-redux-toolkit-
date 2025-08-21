import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth";
import cartSlice from "./cart";
import themeReducer from "./themeSlice";

const store = configureStore({
    reducer:{
        auth:authSlice , 
        cart:cartSlice ,
        theme: themeReducer,
    }
});



export default store;