import { configureStore } from "@reduxjs/toolkit";
import { JobSlice } from "./jobSlice/JobSlice";

export const Store = configureStore({
    reducer:{
       name:JobSlice.reducer,
    }
});