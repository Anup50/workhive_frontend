import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchEmployer, searchJobs } from "../../../Api";
import AnimationWrapper from "../../../components/AnimationWrapper";
import EmployerCard from "../../../components/EmployerCard";
import { InPageNavigation } from "../../../components/InPageNavigation";
import JobCard from "../../../components/JobCard";
import Loader from "../../../components/Loader";

const SearchPagee = () => {
  let { query } = useParams();
  let [jobs, setJobs] = useState<any[] | null>(null);
  let [employers, setEmployer] = useState<any[] | null>(null);

  const searchJobsHandler = async () => {
    const response = await searchJobs(query);

    const jobs = Array.isArray(response.data) ? response.data : [response.data];
    setJobs(jobs);
  };
  const fetchEmployers = async () => {
    const response = await searchEmployer(query);

    const employers = Array.isArray(response.data)
      ? response.data
      : [response.data];
    setEmployer(employers);
  };
  console.log("ff" + employers);
  useEffect(() => {
    if (query) {
      resetState();
      searchJobsHandler();
      fetchEmployers();
    }
  }, [query]);
  const resetState = () => {
    setJobs(null);
    setEmployer(null);
  };

  const EmployerCardWrapper = () => {
    return (
      <>
        {employers == null ? (
          <Loader />
        ) : employers.length ? (
          employers.map((employer, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <EmployerCard employer={employer}></EmployerCard>
              </AnimationWrapper>
            );
          })
        ) : (
          <h1>No jobs found</h1>
        )}
      </>
    );
  };

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full pl-6 pt-3">
        <InPageNavigation
          routes={[`Search Results for "${query}"`, "Business Matched"]}
          defaultHidden={["Business Matched"]}
        >
          {jobs == null ? (
            <Loader />
          ) : jobs.length > 0 ? (
            jobs.map((job: any) => (
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
            ))
          ) : (
            <h1>No jobs found</h1>
          )}
          <EmployerCardWrapper />
        </InPageNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[360px] max-w-min border-l border-gray-50 p-3 pt-3 max-md:hidden">
        <h1 className="font-medium text-xl mb-8">
          Users related to search<i className="fi fi-rr-user mt-1"></i>
        </h1>
        <EmployerCardWrapper />
      </div>
    </section>
  );
};

export default SearchPagee;
