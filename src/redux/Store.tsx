import { configureStore } from "@reduxjs/toolkit";
import { JobSlice } from "./jobSlice/JobSlice";
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const Store = configureStore({
    reducer:{
       jobs:JobSlice.reducer,
    }
});

