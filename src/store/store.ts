import { configureStore } from "@reduxjs/toolkit";
import { popUpSlice } from "./slices/modals-states/modalSlice";
import { productSlice } from "./slices/product/productSlice";

export const store = configureStore({
    reducer:{
        popUp:popUpSlice.reducer,
        product:productSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
