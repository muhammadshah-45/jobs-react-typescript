
import { FaLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/theme/Theme'
import { useContext } from 'react'
import '../components/home.css'
export interface SingleJob {
  type:string;
  title:string;
  description:string;
  salary:string;
  location:string;
  
}
export type singleJobProps = {
  singleJob:SingleJob
}
const JobCard = ({singleJob}:singleJobProps) => {
   const theme = useContext(ThemeContext)
  return (
    <>
    <div className={`bg-white card ${theme} rounded-xl shadow-md relative`}>
              <div className="p-4">
                <div className="mb-6">
                  <div className={`card-title ${theme} my-2`}>{singleJob.type}</div>
                  <h3 className="text-xl font-bold">{singleJob.title}</h3>
                </div>

                <div className="mb-5">
                  {singleJob.description}
                </div>

                <h3 className="text-green-500 mb-2">{singleJob.salary}</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <FaLocationDot className=" text-lg"></FaLocationDot>
                    {singleJob.location}
                  </div>
                  <Link
                    to="/job" state={{singleJob}}
                    className="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            
      
    </>
  )
}

export default JobCard