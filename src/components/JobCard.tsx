
import { FaLocationDot } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const JobCard = ({singleJob} ) => {
   
  return (
    <>
   
    
            <div className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">{singleJob.type}</div>
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