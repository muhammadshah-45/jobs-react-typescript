import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { JobIdType ,Job ,JobsState} from "../../components/types";

 export const fetchJobs = createAsyncThunk<Job[],void>("jobs/fetchJobs", async () => {
    
    let response = await axios.get<Job[]>("http://localhost:5000/jobs");
    return response.data;
  });

  export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId:JobIdType)=>{
     await axios.delete(`http://localhost:5000/jobs/${jobId}`)
     return jobId;
  })

  export const addJob = createAsyncThunk<Job,Partial<Job>>('jobs/addJob',async (newjob)=>{
     let response = await axios.post<Job>("http://localhost:5000/jobs",newjob)
      return response.data;
  })
  export const updateJob = createAsyncThunk('jobs/updateJob',async (updatedJob:Job)=>{
      let response = await axios.put<Job>(`http://localhost:5000/jobs/${updatedJob.id}`,updatedJob);
      return response.data;
  })
const initialState:JobsState = {
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
    filterJobs:(state,action:PayloadAction<string>)=>{
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
      .addCase(fetchJobs.fulfilled, (state, action:PayloadAction<Job[]>) => {
        state.status = "succeeded";
        state.jobs = action.payload; // Store fetched jobs
        state.allJobs = action.payload;
        state.jobData = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching jobs"; // Capture error message
      })
      .addCase(deleteJob.pending,(state)=>{
        state.status = 'loading'
      })
      .addCase(deleteJob.fulfilled,(state,action:PayloadAction<number>)=>{
        state.status ='succeeded';
        state.jobData = state.jobData.filter(job=> job.id !== action.payload)
      })
      .addCase(deleteJob.rejected,(state,action)=>{
        state.status = 'failed';
        state.error = action.error.message || "Error deleting job";
      })
      .addCase(addJob.fulfilled,(state,action:PayloadAction<Job>)=>{
          state.jobs.push(action.payload)
      })
      .addCase(updateJob.fulfilled, (state, action:PayloadAction<Job>) => {  
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
export const { filterJobs } = JobSlice.actions;
export default JobSlice.reducer;
