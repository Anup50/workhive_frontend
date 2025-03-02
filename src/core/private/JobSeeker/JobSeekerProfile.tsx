import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobseeker } from "../../../Api";
import profileImage from "../../../assets/images/Unsplash Wallpapers-Thu Jan 18 2024.jpg";
import AboutJobseeker from "../../../components/AboutJobSeeker"; // Create this component
import AnimationWrapper from "../../../components/AnimationWrapper";
import { InPageNavigation } from "../../../components/InPageNavigation";
import JobCard from "../../../components/JobCard";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/AuthContext";

export const JobseekerDataStructure = {
  userId: "",
  profilePicture: "",
  bio: "",
  location: "",
  skills: [],
  createdAt: "",
};

const JobseekerProfile = () => {
  const { jobSeekerId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [jobseekerProfile, setJobseekerProfile] = useState(
    JobseekerDataStructure
  );
  const [applications, setApplications] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const { userId, profilePicture, bio, location, skills, createdAt } =
    jobseekerProfile;

  const fetchJobseekerProfile = async () => {
    if (jobSeekerId) {
      try {
        const response = await getJobseeker(jobSeekerId);

        if (response?.data) {
          const jobseekerData = response.data.data;

          setJobseekerProfile(jobseekerData);
          setApplications(jobseekerData.applications || []);
          setBookmarks(jobseekerData.bookmarks || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobseeker profile:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchJobseekerProfile();
  }, [jobSeekerId]);

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <section className="min-h-[calc(100vh-80px)] md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 pt-3 px-5 md:px-10">
          <div className="flex flex-col items-center gap-5 min-[250px] md:sticky md:top-[100px] md:w-[30%] md:min-w-[350px] p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {/* Profile Picture */}
            <div className="relative group">
              <img
                src={profileImage}
                className="w-48 h-48 bg-green-100 rounded-full md:w-48 md:h-48 lg:w-52 lg:h-52 mb-6 object-cover border-4 border-primary/10"
              />
            </div>

            {/* Name */}
            <h1 className="text-2xl font-medium mb-1 text-center">
              {userId?.name}
            </h1>

            {/* Edit Button */}
            <div className="flex justify-center w-full ">
              <Link
                to="/settings/editprofile"
                className="btn btn-primary rounded-full px-8 py-2 text-lg"
              >
                Edit Profile
              </Link>
            </div>

            {/* Jobseeker Details */}
            <AboutJobseeker
              className="max-md:hidden space-y-4 text-justify px-2"
              bio={bio}
              location={location}
              skills={skills}
              joinedAt={createdAt}
            />
          </div>

          <div className="max-wd:mt12 w-full flex-1 md:w-[60%] md:pl-6 lg:pl-8 pt-3">
            <InPageNavigation routes={["Applications", "Bookmarks"]}>
              {/* Applications Tab */}
              <div className="max-h-[800px] overflow-y-auto p-2 space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-4">No applications found</div>
                ) : (
                  applications.map((application: any) => (
                    <JobCard
                      key={application._id}
                      id={application.jobId?._id}
                      title={application.jobId?.title}
                      company={application.jobId?.employer?.companyName}
                      location={application.jobId?.location}
                      jobType={application.jobId?.jobType}
                      description={application.jobId?.description}
                      applyLink={`/user/job/${application.jobId?._id}`}
                      logoSrc={application.jobId?.employer?.companyLogo}
                      experienceLevel={application.jobId?.experienceLevel}
                      salary={application.jobId?.salary}
                    />
                  ))
                )}
              </div>

              {/* Bookmarks Tab */}
              <div className="max-h-[800px] overflow-y-auto p-2 space-y-4">
                {bookmarks.length === 0 ? (
                  <div className="text-center py-4">No bookmarked jobs</div>
                ) : (
                  bookmarks.map((bookmark: any) => (
                    <JobCard
                      key={bookmark._id}
                      id={bookmark.jobId._id}
                      title={bookmark.jobId?.title}
                      company={bookmark.jobId?.employer?.companyName}
                      location={bookmark.jobId?.location}
                      jobType={bookmark.jobId?.jobType}
                      description={bookmark.jobId?.description}
                      applyLink={`/user/job/${bookmark.jobId?._id}`}
                      logoSrc={bookmark.jobId?.employer?.companyLogo}
                      experienceLevel={bookmark.jobId?.experienceLevel}
                      salary={bookmark.jobId?.salary}
                    />
                  ))
                )}
              </div>
            </InPageNavigation>
          </div>
        </section>
      )}
    </AnimationWrapper>
  );
};

export default JobseekerProfile;
