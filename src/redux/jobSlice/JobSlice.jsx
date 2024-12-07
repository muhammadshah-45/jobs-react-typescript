import { createSlice } from "@reduxjs/toolkit";

export const JobSlice = createSlice({
    name:"jobs",
    initialState:{
        jobs:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    // extraReducers:(builder)=>{
    //     builder.addCase(state=>{
    //      return state
    //     })
    // }
});

export default JobSlice.reducer;