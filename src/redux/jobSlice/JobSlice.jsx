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
        allJobs:[],
        jobData:[],
        status:"idle",
        error:null,
    },
    reducers:{
        filterJobs:(state,action)=>{
            if(action.payload !== ''){
                const filtered = state.allJobs.filter((job)=>job.title.toLowerCase().includes(action.payload.toLowerCase()));
                state.jobData = filtered
            }else{
                state.jobData = state.allJobs;
            }
         
        },
        clearFilteredJobs: (state,action) => { 
            state.jobData = action.payload;
            state.allJobs = action.payload; 
        }, 
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchJobs.pending,state=>{
          state.status = 'loading';
        })
        .addCase(fetchJobs.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.jobs =action.payload;
            state.allJobs =action.payload;
            state.jobData=action.payload;
            
        })
        .addCase(fetchJobs.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export const {filterJobs ,clearFilteredJobs}= JobSlice.actions;

export default JobSlice.reducer;