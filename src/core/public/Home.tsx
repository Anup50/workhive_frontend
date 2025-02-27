import Hero from "../../components/Hero";
import JobCard from "../../components/JobCard";
import { useGetJobs } from "../../shared/Jobs/Query";

const Home: React.FC = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();

  return (
    <div>
      <Hero />
      <div>
        <main className="w-full p-6">
          {" "}
          {/* Removed mx-auto */}
          {!isLoading && !isError && (
            <>
              <div className="flex items-center w-full my-6">
                <hr className="flex-grow border-t border-gray-300" />
                <h2 className="text-xl font-semibold text-gray-700 mx-4">
                  Recent Jobs
                </h2>
                <hr className="flex-grow border-t border-gray-300" />
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
    </div>
  );
};

export default Home;
