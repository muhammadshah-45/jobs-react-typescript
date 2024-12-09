import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


 export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
    
    let response = await axios.get("http://localhost:5000/jobs");
    return response.data;
  });

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

    // filterJobs: (state, action) => {
    //   if (action.payload !== "") {
    //     const filtered = state.allJobs.filter((job) =>
    //       job.title.toLowerCase().includes(action.payload.toLowerCase())
    //     );
    //     state.jobData = filtered;
    //   } else {
    //     state.jobData = state.allJobs;
    //   }
    // },
    // setJobs: (state, action) => {
    //   state.jobData = action.payload;
    //   state.allJobs = action.payload;
    // },
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
      });
  },
});
export const { filterJobs, setJobs } = JobSlice.actions;
export default JobSlice.reducer;
