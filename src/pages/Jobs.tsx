import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

//logo
import logo from "../assets/react.svg";
//component
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import {RootState,AppDispatch} from '../redux/Store.js'
import { fetchJobs, filterJobs } from "../redux/jobSlice/JobSlice.js";
import { JobEType } from "../components/types.js";


const Jobs = () => {
  const {  jobData, status, error } = useSelector((state:RootState) => state.jobs);
  
  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs());
    }
  }, [dispatch, status]);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterJobs(e.target.value));
  };

 
  // const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value !== "") {
  //     const temperaryarray = allJobs.filter((singleJob: SingleJob) => {
  //       return singleJob.title
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase());
  //     });
  //     setJobData(temperaryarray);
  //   } else {
  //     setJobData(allJobs);
  //   }
  // };

  return (
    <>
      <nav className="bg-green-700 border-b border-green-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 px-24 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              {/* <!-- Logo --> */}
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img className="h-10 w-auto" src={logo} alt="Vue Jobs" />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Vue Jobs
                </span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <Link
                    to="/"
                    className="text-white  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Home
                  </Link>

                  <Link
                    to="/jobs"
                    className="text-white bg-green-900 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/add-job"
                    className="text-white hover:bg-green-900  hover:text-white  rounded-md px-3 py-2"
                  >
                    Add Job
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- Filter Jobs --> */}
      <section className="bg-green-50 py-4">
        <div className="container mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => handleChangeValue(e)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Filter jobs..."
            />
          </div>
        </div>
      </section>

      {/* <!-- All Jobs --> */}
      <section className="bg-green-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
            Browse Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>{error}</p>}
            {jobData.length > 0 ? (
              jobData.map((job:JobEType) => (
                <div key={job.id}>
                  <JobCard singleJob ={job} />
                </div>
              ))
              ) : (
                <p className="text-center">No Job available yet...</p>
                )}
                
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
