import  { useContext } from 'react'
import { FaArrowLeft ,FaLocationDot} from "react-icons/fa6";
import { Link, useLocation} from 'react-router-dom';
import '../components/home.css'
//components
import Navbar from '../components/Navbar';

import { ThemeContext } from '../../context/theme/Theme';
import {JobIdType, SingleJob} from '../components/types'
import toast from 'react-hot-toast';
import {deleteJob} from '../redux/jobSlice/JobSlice.js'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/Store.js';
const Job = () => {
 
  const dipatch:AppDispatch = useDispatch();
  const location = useLocation();
  const {singleJob}:{singleJob:SingleJob} = location.state || {singleJob:null};
 const theme = useContext(ThemeContext)
  // const handleDeleteJob = async ()=>{
  //   try {
  //     let response = await axios.delete(`http://localhost:5000/jobs/${singleJob.id}`)
  //     toast.success("Delete Job api call")
  //   } catch (error) {
  //     console.log("Delete Job Error",error)
  //   }
  // }
  const handleDeleteJob =(jobId:JobIdType)=>{
    if(window.confirm("are you sure to delete this job?")){
      dipatch(deleteJob(jobId));

    }
    toast.success("Job Deleted Successfully")
  }

  return (
    <>
     <Navbar></Navbar>

    {/* <!-- Go Back --> */}
    <section>
      <div className={`container m-auto job ${theme} py-6 px-6`}>
        <Link
          to="/jobs"
          className="text-green-500 hover:text-green-600 flex items-center"
        >
          <FaArrowLeft className='mr-2'/>
           Back to Job Listings
        </Link>
      </div>
    </section>

    <section className="bg-green-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              className={`job ${theme} p-6 rounded-lg shadow-md text-center md:text-left`}
            >
              <div  className={`mb-4 card-title  ${theme}`}>{singleJob.type}</div>
              <h1 className="text-3xl font-bold mb-4">{singleJob.title}</h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <FaLocationDot
                  className={`text-lg text-orange-700 card-location ${theme} mr-2 `}
                ></FaLocationDot>
                <p className={`text-orange-700 card-location ${theme}`}>{singleJob.location}</p>
              </div>
            </div>

            <div className={`job ${theme} p-6 rounded-lg shadow-md mt-6`}>
              <h3 className=" text-lg font-bold mb-6">
                Job Description
              </h3>

              <p className="mb-4">
               {singleJob.description}
              </p>

              <h3 className=" text-lg font-bold mb-2">Salary</h3>

              <p className="mb-4">{singleJob.salary}</p>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside>
            {/* <!-- Company Info --> */}
            <div className={`job ${theme} p-6 rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold mb-6">Company Info</h3>

              <h2 className="text-2xl">{singleJob.company.name}</h2>

              <p className="my-2">
                {singleJob.company.description}
              </p>

              <hr className="my-4" />

              <h3 className="text-xl">Contact Email:</h3>

              <p className={`my-2 bg-green-100 contact ${theme} p-2 font-bold`}>
                {singleJob.company.contactEmail}
              </p>

              <h3 className="text-xl">Contact Phone:</h3>

              <p className={`my-2 bg-green-100 contact ${theme} p-2 font-bold`}>{singleJob.company.contactPhone}</p>
            </div>

            {/* <!-- Manage --> */}
            <div className={`job ${theme} p-6 rounded-lg shadow-md mt-6`}>
              <h3 className="text-xl font-bold mb-6">Manage Job</h3>
              <Link
                to="/add-job" state={{singleJob}}
                className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job</Link>
              <button onClick={()=>handleDeleteJob(singleJob.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  )
}

export default Job