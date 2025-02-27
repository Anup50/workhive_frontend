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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      {/* <UserNavbar /> */}
      <main className="w-full p-6">
        {isLoading && (
          <div className="p-4 text-gray-600 dark:text-gray-300">
            Loading jobs...
          </div>
        )}

        {isError && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg">
            Error: {error?.message || "Failed to load jobs"}
          </div>
        )}
        {/* Recommended Jobs Section */}
        {!isRecLoading && !isRecError && recommendedJobs && (
          <>
            <div className="flex items-center w-full my-6">
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mx-4">
                Recommended Jobs
              </h2>
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedJobs.map((job) => (
                <JobCard
                  key={job._id}
                  title={job.title}
                  company={job.employer?.companyName}
                  location={job.location}
                  jobType={job.jobType}
                  description={job.description}
                  applyLink={`/user/${job._id}/apply`}
                  logoSrc={job.employer?.companyLogo}
                />
              ))}
            </div>
          </>
        )}
        {/* Jobs For You Section */}
        {!isLoading && !isError && (
          <>
            <div className="flex items-center w-full my-6">
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mx-4">
                Recent Jobs
              </h2>
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs?.map((job) => (
                <JobCard
                  key={job?._id}
                  title={job?.title}
                  company={job?.employer?.companyName}
                  location={job?.location}
                  jobType={job?.jobType}
                  description={job?.description}
                  applyLink={`/user/${job?._id}/apply`}
                  logoSrc={job?.employer?.companyLogo}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
