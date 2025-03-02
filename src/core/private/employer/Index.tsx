import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployer } from "../../../Api";
import AboutEmployer from "../../../components/AboutEmployer";
import AnimationWrapper from "../../../components/AnimationWrapper";
import { InPageNavigation } from "../../../components/InPageNavigation";
import JobCard from "../../../components/JobCard";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/AuthContext";

export const employerDataStructure = {
  employer: {
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    companyLogo: "",
    location: "",
    createdAt: "",
  },
  post_info: {
    total_vacancies: 0,
    active_vacancies: 0,
  },
  jobs: {
    allJobs: [],
    activeJobs: [],
  },
};

const EmployerProfile = () => {
  const { employerId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (employerId == "undefined") {
      navigate("/employer/form");
    }
  }, [employerId]);

  let [loading, setLoading] = useState(true);
  let [employerProfile, setEmployerProfile] = useState(employerDataStructure);
  let {
    employer: {
      companyName: employer_name,
      companyWebsite,
      companyLogo,
      companyDescription,
      location,
      createdAt,
    },
    post_info: { total_vacancies, active_vacancies },
    jobs: { allJobs, activeJobs },
  } = employerProfile;

  const fetchEmployerProfile = async () => {
    console.log("fetchEmployerProfile called with employerId:", employerId);

    if (employerId) {
      try {
        const response = await getEmployer(employerId);

        if (response && response.data) {
          let employer = response.data;
          console.log(employer);
          setEmployerProfile(employer);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching employer profile:", error);
        setLoading(false);
      }
    } else {
      console.error("employerId is undefined");
      setLoading(false);
    }
  };
  useEffect(() => {
    resetState();
    fetchEmployerProfile();
  }, [employerId]);

  const resetState = () => {
    setEmployerProfile(employerDataStructure);
    setLoading(true);
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <section className="min-h-[calc(100vh-80px)] md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 pt-3 px-5 md:px-10">
          <div className="flex flex-col items-center gap-5 min-[250px] md:sticky md:top-[100px] md:w-[30%] md:min-w-[350px] p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {/* Company Logo */}
            <div className="relative group">
              <img
                src={companyLogo}
                className="w-48 h-48 bg-green-100 rounded-full md:w-48 md:h-48 lg:w-52 lg:h-52 mb-6 object-cover border-4 border-primary/10"
              />
            </div>

            {/* Company Name */}
            <h1 className="text-2xl font-medium mb-1 text-center">
              {employer_name}
            </h1>

            {/* Vacancies */}
            <p className="mb-4 text-gray-600 px-4">
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <span className="block text-lg font-medium text-primary">
                    {total_vacancies.toLocaleString()}
                  </span>
                  <span className="text-sm">Total Vacancies</span>
                </div>

                <div className="text-center">
                  <span className="block text-lg font-medium text-primary">
                    {active_vacancies.toLocaleString()}
                  </span>
                  <span className="text-sm">Active Vacancies</span>
                </div>
              </div>
            </p>

            {/* Edit Button */}
            <div className="flex justify-center w-full ">
              <Link
                to="/settings/editprofile"
                className="btn btn-primary rounded-full px-8 py-2 text-lg"
              >
                Edit Profile
              </Link>
            </div>

            {/* Company Details */}
            <AboutEmployer
              className="max-md:hidden space-y-4 text-justify px-2"
              companyDescription={companyDescription}
              companyWebsite={{ companyWebsite }}
              joinedAt={createdAt}
              location={location}
            />
          </div>

          <div className="max-wd:mt12 w-full flex-1 md:w-[60%] md:pl-6 lg:pl-8 pt-3">
            <InPageNavigation routes={[`Active Jobs`, "All jobs"]}>
              <div className="max-h-[800px] overflow-y-auto p-2 space-y-4">
                {activeJobs == null ? (
                  <Loader />
                ) : activeJobs.length > 0 ? (
                  activeJobs.map((job: any) => (
                    <JobCard
                      key={job?._id}
                      id={job.id}
                      title={job?.title}
                      company={employer_name}
                      location={job?.location}
                      jobType={job?.jobType}
                      description={job.description}
                      applyLink={`/employer/job/${job?._id}`}
                      logoSrc={companyLogo}
                      experienceLevel={job.experienceLevel}
                      salary={job.salary}
                    />
                  ))
                ) : (
                  <h1 className="text center">No Active Jobs</h1>
                )}
              </div>
              <div className="max-h-[800px] overflow-y-auto p-2 space-y-4">
                {allJobs == null ? (
                  <Loader />
                ) : allJobs.length > 0 ? (
                  allJobs.map((job: any) => (
                    <JobCard
                      key={job?._id}
                      id={job.id}
                      title={job?.title}
                      company={employer_name}
                      location={job?.location}
                      jobType={job?.jobType}
                      description={job.description}
                      applyLink={`/employer/job/${job?._id}`}
                      logoSrc={companyLogo}
                      experienceLevel={job.experienceLevel}
                      salary={job.salary}
                    />
                  ))
                ) : (
                  <h1>No jobs found</h1>
                )}
              </div>
            </InPageNavigation>
          </div>
        </section>
      )}
    </AnimationWrapper>
  );
};

export default EmployerProfile;
