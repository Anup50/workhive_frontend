import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployer } from "../../Api";
import AboutEmployer from "../../components/AboutEmployer";
import AnimationWrapper from "../../components/AnimationWrapper";
import { InPageNavigation } from "../../components/InPageNavigation";
import JobCard from "../../components/JobCard";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";

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
  let { employerId: employerId } = useParams();
  let { employerId: authEmployerId } = useAuth();
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
      // Check if employerId is defined
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
          <div className="flex flex-col max-md:items-center gap-5 min-[250px]">
            <img
              src={companyLogo}
              className="w-48 h-48 bg-green-100 rounded-full md:w-32 md:h-32"
            />
            <h1 className="text-2xl font-medium">{employer_name}</h1>
            <p>
              {total_vacancies.toLocaleString()} Total Vacancies -{" "}
              {active_vacancies.toLocaleString()} Active Vacancies
            </p>

            {employerId === authEmployerId && (
              <div className="flex gap-4 mt-2">
                <Link
                  to="/settings/editprofile"
                  className="btn-square rounded-md"
                >
                  Edit Profile
                </Link>
              </div>
            )}

            <AboutEmployer
              className={"max-md:hidden"}
              companyDescription={companyDescription}
              companyWebsite={{ companyWebsite }}
              joinedAt={createdAt}
              location={location}
            />
          </div>
          <div className="max-wd:mt12 w-full   ">
            <InPageNavigation routes={[`Active Jobs`, "All jobs"]}>
              <div className="max-h-[800px] overflow-y-auto p-2 space-y-4">
                {activeJobs == null ? (
                  <Loader />
                ) : activeJobs.length > 0 ? (
                  activeJobs.map((job: any) => (
                    <JobCard
                      key={job?._id}
                      title={job?.title}
                      company={employer_name}
                      location={job?.location}
                      jobType={job?.jobType}
                      description={job?.description}
                      applyLink={`/user/${job?._id}/apply`}
                      logoSrc={companyLogo}
                    />
                  ))
                ) : (
                  <h1>No jobs found</h1>
                )}
                {allJobs == null ? (
                  <Loader />
                ) : activeJobs.length > 0 ? (
                  allJobs.map((job: any) => (
                    <JobCard
                      key={job?._id}
                      title={job?.title}
                      company={employer_name}
                      location={job?.location}
                      jobType={job?.jobType}
                      description={job?.description}
                      applyLink={`/user/${job?._id}/apply`}
                      logoSrc={companyLogo}
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
