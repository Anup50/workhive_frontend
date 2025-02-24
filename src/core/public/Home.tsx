// import JobCard from "../../components/JobCard"; // Import JobCard
// import Navbar from "../../components/Navbar";

// const Home: React.FC = () => {
//   const jobsForYou = [
//     {
//       title: "UX/UI Designer",
//       company: "Upwork",
//       location: "Remote only",
//       jobType: "Freelance",
//       description:
//         "On Upwork you'll find a range of top freelancers and agencies, from developers and designers to copywriters.",
//       applyLink: "https://example.com/apply/ux-ui-designer",
//       logoSrc: "public/vite.svg",
//     },
//     {
//       title: "Product Designer",
//       company: "Facebook",
//       location: "CA, USA",
//       jobType: "Full-time",
//       description:
//         "Facebook’s mission is to give people the power to build community and bring the world closer together.",
//       applyLink: "https://example.com/apply/product-designer",
//       logoSrc: "public/vite.svg",
//     },
//     {
//       title: "Part-time UX Designer",
//       company: "Google",
//       location: "International",
//       jobType: "Part-time",
//       description:
//         "Google has many special features to help you find exactly what you're looking for.",
//       applyLink: "https://example.com/apply/part-time-ux-designer",
//       logoSrc: "public/vite.svg",
//     },
//   ];

//   const newJobs = [
//     {
//       title: "UI Designer",
//       company: "Instagram",
//       location: "CA, USA",
//       jobType: "Full-time",
//       description:
//         "Instagram is a photo and video-sharing social networking service owned by Facebook, Inc.",
//       applyLink: "https://example.com/apply/ui-designer",
//       logoSrc: "public/vite.svg",
//     },
//     {
//       title: "Product Designer",
//       company: "Periscope",
//       location: "Remote only",
//       jobType: "Contract",
//       description:
//         "Periscope is a live video streaming app acquired by Twitter before launch in 2015.",
//       applyLink: "https://example.com/apply/product-designer",
//       logoSrc: "public/vite.svg",
//     },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center">
//       <Navbar />
//       <main className="w-full max-w-4xl p-6 flex flex-col items-center">
//         {/* Jobs For You Section */}
//         <div className="flex items-center w-full my-6">
//           <hr className="flex-grow border-t border-gray-300" />
//           <h2 className="text-xl font-semibold text-gray-700 mx-4">
//             Jobs for You
//           </h2>
//           <hr className="flex-grow border-t border-gray-300" />
//         </div>

//         <div className="w-full flex flex-col items-center space-y-4">
//           {jobsForYou.map((job, index) => (
//             <JobCard
//               key={index}
//               title={job.title}
//               company={job.company}
//               location={job.location}
//               jobType={job.jobType}
//               description={job.description}
//               applyLink={job.applyLink}
//               logoSrc={job.logoSrc}
//             />
//           ))}
//         </div>

//         {/* New Jobs Section */}
//         <div className="flex items-center w-full my-6">
//           <hr className="flex-grow border-t border-gray-300" />
//           <h2 className="text-xl font-semibold text-gray-700 mx-4">New Jobs</h2>
//           <hr className="flex-grow border-t border-gray-300" />
//         </div>

//         <div className="w-full flex flex-col items-center space-y-4">
//           {newJobs.map((job, index) => (
//             <JobCard
//               key={index}
//               title={job.title}
//               company={job.company}
//               location={job.location}
//               jobType={job.jobType}
//               description={job.description}
//               applyLink={job.applyLink}
//               logoSrc={job.logoSrc}
//             />
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import { useGetJobs } from "../../shared/Jobs/Query";

const Home: React.FC = () => {
  const { data: jobs, isLoading, isError } = useGetJobs();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full bg-blue-600 text-white py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="text-lg mt-4 max-w-2xl">
          Browse thousands of job opportunities from top companies around the
          world.
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-200">
          Get Started
        </button>
      </div>

      <main className="w-full max-w-4xl p-6 flex flex-col items-center">
        {!isLoading && !isError && (
          <>
            <div className="flex items-center w-full my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <h2 className="text-xl font-semibold text-gray-700 mx-4">
                Recent Jobs
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
