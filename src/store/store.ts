import { configureStore } from "@reduxjs/toolkit";
import { popUpSlice } from "./slices/modals-states/modalSlice";

export const store = configureStore({
    reducer:{
        popUp:popUpSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
