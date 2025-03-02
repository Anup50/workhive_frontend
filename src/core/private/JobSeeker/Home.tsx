// import { Navigate } from "react-router-dom";
// import JobCard from "../../../components/JobCard";
// import { useAuth } from "../../../context/AuthContext";
// import { useGetJobs, useGetRecommendedJobs } from "../../../shared/Jobs/Query";

// const Home: React.FC = () => {
//   const { jobSeekerId } = useAuth();
//   if (jobSeekerId == "null") {
//     return <Navigate to="/user/form" />;
//   }

//   const {
//     data: recommendedJobs,
//     isLoading: isRecLoading,
//     isError: isRecError,
//   } = useGetRecommendedJobs(jobSeekerId);

//   const { data: jobs, isLoading, isError, error } = useGetJobs();

//   return (
//     <div className="bg-base-200 min-h-screen">
//       <main className="w-full p-6">
//         {/* Recommended Jobs Section */}
//         {!isRecLoading && !isRecError && recommendedJobs && (
//           <section className="mb-12">
//             <div className="flex items-center mb-8">
//               <hr className="flex-grow border-t border-base-content/20" />
//               <h2 className="text-2xl font-semibold px-4 text-base-content">
//                 Recommended Jobs
//               </h2>
//               <hr className="flex-grow border-t border-base-content/20" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedJobs.map((job) => (
//                 <div
//                   key={job?._id}
//                   className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <JobCard
//                     id={job?._id}
//                     title={job?.title}
//                     company={job?.employer?.companyName}
//                     location={job?.location}
//                     jobType={job?.jobType}
//                     salary={job?.salary}
//                     description={job.description}
//                     applyLink={`/user/job/${job?._id}`}
//                     logoSrc={job?.employer?.companyLogo}
//                     experienceLevel={job?.experienceLevel}
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Loading State */}
//         {(isLoading || isRecLoading) && (
//           <div className="flex justify-center my-8">
//             <span className="loading loading-spinner loading-lg text-primary"></span>
//           </div>
//         )}

//         {/* Error State */}
//         {(isError || isRecError) && (
//           <div className="alert alert-error my-8">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="stroke-current shrink-0 h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             <span>Error: {error?.message || "Failed to load jobs"}</span>
//           </div>
//         )}

//         {/* Recent Jobs Section */}
//         {!isLoading && !isError && (
//           <section>
//             <div className="flex items-center mb-8">
//               <hr className="flex-grow border-t border-base-content/20" />
//               <h2 className="text-2xl font-semibold px-4 text-base-content">
//                 Recent Jobs
//               </h2>
//               <hr className="flex-grow border-t border-base-content/20" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {jobs?.map((job) => (
//                 <div
//                   key={job?._id}
//                   className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
//                 >
//                   <JobCard
//                     id={job?._id}
//                     title={job?.title}
//                     company={job?.employer?.companyName}
//                     location={job?.location}
//                     jobType={job?.jobType}
//                     salary={job?.salary}
//                     description={job.description}
//                     applyLink={`/user/job/${job?._id}`}
//                     logoSrc={job?.employer?.companyLogo}
//                     experienceLevel={job?.experienceLevel}
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Home;

import { Navigate } from "react-router-dom";
import JobCard from "../../../components/JobCard";
import { useAuth } from "../../../context/AuthContext";
import { useGetJobs, useGetRecommendedJobs } from "../../../shared/Jobs/Query";

const Home: React.FC = () => {
  const { jobSeekerId } = useAuth();
  if (jobSeekerId == "null") {
    return <Navigate to="/user/form" />;
  }

  const {
    data: recommendedJobs,
    isLoading: isRecLoading,
    isError: isRecError,
  } = useGetRecommendedJobs(jobSeekerId);

  const { data: jobs, isLoading, isError, error } = useGetJobs();

  return (
    <div className="bg-base-200 min-h-screen">
      <main className="w-full p-6">
        {/* Recommended Jobs Section */}
        {!isRecLoading && !isRecError && recommendedJobs && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <hr className="flex-grow border-t border-base-content/20" />
              <h2 className="text-2xl font-semibold px-4 text-base-content">
                Recommended Jobs
              </h2>
              <hr className="flex-grow border-t border-base-content/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedJobs.map((job) => (
                <div>
                  <JobCard
                    id={job?._id}
                    title={job?.title}
                    company={job?.employer?.companyName}
                    location={job?.location}
                    jobType={job?.jobType}
                    salary={job?.salary}
                    description={job.description}
                    applyLink={`/user/job/${job?._id}`}
                    logoSrc={job?.employer?.companyLogo}
                    experienceLevel={job?.experienceLevel}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Loading State */}
        {(isLoading || isRecLoading) && (
          <div className="flex justify-center my-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Error State */}
        {(isError || isRecError) && (
          <div className="alert alert-error my-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error: {error?.message || "Failed to load jobs"}</span>
          </div>
        )}

        {/* Recent Jobs Section */}
        {!isLoading && !isError && (
          <section>
            <div className="flex items-center mb-8">
              <hr className="flex-grow border-t border-base-content/20" />
              <h2 className="text-2xl font-semibold px-4 text-base-content">
                Recent Jobs
              </h2>
              <hr className="flex-grow border-t border-base-content/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs?.map((job) => (
                <div>
                  <JobCard
                    id={job?._id}
                    title={job?.title}
                    company={job?.employer?.companyName}
                    location={job?.location}
                    jobType={job?.jobType}
                    salary={job?.salary}
                    description={job.description}
                    applyLink={`/user/job/${job?._id}`}
                    logoSrc={job?.employer?.companyLogo}
                    experienceLevel={job?.experienceLevel}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
