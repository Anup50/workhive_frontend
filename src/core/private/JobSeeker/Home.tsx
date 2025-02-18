import JobCard from "../../../components/JobCard";
import { useGetJobs, useGetRecommendedJobs } from "../../../shared/Jobs/Query";
import { useGetJobSeekerId } from "../JobSeeker/Query";
import UserNavbar from "./UserNabbar";

const Home: React.FC = () => {
  const { data: jobSeekerId } = useGetJobSeekerId();

  const {
    data: recommendedJobs,
    isLoading: isRecLoading,
    isError: isRecError,
  } = useGetRecommendedJobs(jobSeekerId);

  const { data: jobs, isLoading, isError, error } = useGetJobs();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <UserNavbar />
      <main className="w-full max-w-4xl p-6 flex flex-col items-center">
        {isLoading && <div className="p-4 text-gray-600">Loading jobs...</div>}

        {isError && (
          <div className="p-4 bg-red-100 text-red-600 rounded-lg">
            Error: {error?.message || "Failed to load jobs"}
          </div>
        )}
        {/* Recommended Jobs Section */}
        {!isRecLoading && !isRecError && recommendedJobs && (
          <>
            <div className="flex items-center w-full my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <h2 className="text-xl font-semibold text-gray-700 mx-4">
                Recommended Jobs
              </h2>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="w-full flex flex-col items-center space-y-4">
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
              <hr className="flex-grow border-t border-gray-300" />
              <h2 className="text-xl font-semibold text-gray-700 mx-4">
                Jobs for You
              </h2>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="w-full flex flex-col items-center space-y-4">
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
