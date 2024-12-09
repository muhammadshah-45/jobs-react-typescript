import { configureStore } from "@reduxjs/toolkit";
import { JobSlice } from "./jobSlice/JobSlice";

export const Store = configureStore({
    reducer:{
       jobs:JobSlice.reducer,
    }
});