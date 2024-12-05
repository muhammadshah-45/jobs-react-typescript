import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
//components
import Navbar from './Navbar'
import JobCard from './JobCard'


const Home = () => {
  const [data,setData] = useState([])

  const getJobs = async ()=>{
    try {
      let response = await axios.get("http://localhost:5000/jobs");
      setData(response.data)
   
    } catch (error) {
      console.log("getJob API Error",error)
    }

  }

  useEffect(()=>{
  getJobs()
  },[])

  return (
    <>
    {/* Navbar Section */}
      <Navbar/>

      {/* <!-- Hero Section --> */}
      <section className="bg-green-700 py-20 mb-4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
        >
          <div className="text-center">
            <h1
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              Become a Vue Dev
            </h1>
            <p className="my-4 text-xl text-white">
              Find the Vue job that fits your skills and needs
            </p>
          </div>
        </div>
      </section>

      {/* <!-- Developers and Employers --> */}
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">For Developers</h2>
              <p className="mt-2 mb-4">
                Browse our Vue jobs and start your career today
              </p>
              <Link
                to="/jobs"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Browse Jobs
              </Link>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">For Employers</h2>
              <p className="mt-2 mb-4">
                List your job to find the perfect developer for the role
              </p>
              <Link
                to="/add-job"
                className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
              >
                Add Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Browse Jobs --> */}
      <section className="bg-green-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
            Browse Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <!-- Job Listing 1 --> */}
          
            {data.map((singleJob,index)=> index < 3 ? <div key={singleJob.id}> <JobCard  singleJob={singleJob}/> </div> : null
            )}
            {/* 
          <!-- Job Listing 2 --> */}
          
            {/* <!-- Job Listing 3 --> */}
           
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          to="/jobs"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</Link>
      </section>
    </>
  )
}

export default Home;
