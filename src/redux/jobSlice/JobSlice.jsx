import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',async ()=>{
    let response = await axios.get("http://localhost:5000/jobs");
    return response.data;
})

export const JobSlice = createSlice({
    name:"jobs",
    initialState:{
        jobs:[],
        
        filteredJobs:[],
        status:"idle",
        error:null,
    },
    reducers:{
        filterJobs:(state,action)=>{
         const searchTerm = action.payload.toLowerCase();
         state.filteredJobs = state.jobs.filter(job=> job.title.toLowerCase().includes(searchTerm))
        },
        clearFilteredJobs: (state) => {  
            state.filteredJobs = [...state.jobs]; // Reset to all jobs  
        }, 
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchJobs.pending,state=>{
          state.status = 'loading';
        })
        .addCase(fetchJobs.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.jobs =action.payload;
            state.filteredJobs=action.payload;
            
        })
        .addCase(fetchJobs.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export const {filterJobs ,clearFilteredJobs}= JobSlice.actions;

export default JobSlice.reducer;