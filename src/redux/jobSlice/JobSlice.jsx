import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    
    let response = await axios.get("http://localhost:5000/jobs");
    return response.data;
  });

  export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId)=>{
     await axios.delete(`http://localhost:5000/jobs/${jobId}`)
     return jobId;
  })

  export const addJob = createAsyncThunk('jobs/addJob',async (newjob)=>{
     let response = await axios.post("http://localhost:5000/jobs",newjob)
      return response.data;
  })
  export const updateJob = createAsyncThunk('jobs/updateJob',async (updatedJob)=>{
      let response = await axios.put(`http://localhost:5000/jobs/${updatedJob.id}`,updatedJob);
      return response.data;
  })
const initialState = {
  jobs: [],
  jobData: [],
  allJobs: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const JobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    filterJobs:(state,action)=>{
      if(action.payload !== ''){
        const filtered = state.jobData.filter((job)=>job.title.toLowerCase().includes(action.payload.toLowerCase()));
        state.jobData = filtered;
      }else{
        state.jobData = state.allJobs;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload; // Store fetched jobs
        state.allJobs = action.payload;
        state.jobData = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture error message
      })
      .addCase(deleteJob.pending,(state)=>{
        state.status = 'loading'
      })
      .addCase(deleteJob.fulfilled,(state,action)=>{
        state.status ='succeeded';
        state.jobData = state.jobData.filter(job=> job.id !== action.payload)
      })
      .addCase(deleteJob.rejected,(state,action)=>{
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addJob.fulfilled,(state,action)=>{
          state.jobs.push(action.payload)
      })
      .addCase(updateJob.fulfilled, (state, action) => {  
        const index = state.jobs.findIndex(job => job.id === action.payload.id);  
        if (index !== -1) {  
          state.jobs[index] = action.payload; // Update the existing job  
        }  
      })
      // .addCase(updateJob.fulfilled, (state, action) => {  
      //   const index = state.jobs.findIndex(job => job.id === action.payload.id);  
      //   if (index !== -1) {  
      //     state.jobs[index] = action.payload; // Update the existing job  
      //   }  
      // });
  },
});
export const { filterJobs, setJobs } = JobSlice.actions;
export default JobSlice.reducer;
