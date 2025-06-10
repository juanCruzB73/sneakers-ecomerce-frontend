import { configureStore } from "@reduxjs/toolkit";
import { popUpSlice } from "./slices/modals-states/modalSlice";
import { productSlice } from "./slices/product/productSlice";
import { addressSlice } from "./slices/address/addressSlice";
import { discountSlice } from "./slices/discount/discountSlice";
import { imgSlice } from "./slices/img/imgSlice";
import { orderSlice } from "./slices/order/orderSlice";
import { userSlice } from "./slices/user/userSlice";
import { cartSlice } from "./slices/cart/cartSlice";
import { authSlice } from "./slices/auth/authSlice";

export const store = configureStore({
    reducer:{
        popUp:popUpSlice.reducer,
        product:productSlice.reducer,
        address:addressSlice.reducer,
        discount:discountSlice.reducer,
        img:imgSlice.reducer,
        order:orderSlice.reducer,
        user:userSlice.reducer,
        cart:cartSlice.reducer,
        auth:authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
