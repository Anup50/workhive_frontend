// import {
//   AlertCircle,
//   Banknote,
//   Briefcase,
//   CalendarCheck,
//   Clock,
//   MapPin,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getAppliedJobs } from "../../../Api";
// import { useAuth } from "../../../context/AuthContext";

// const ApplicationsPage = () => {
//   const { jobSeekerId } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await getAppliedJobs(jobSeekerId);
//         setApplications(response.data.data);
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (jobSeekerId) fetchApplications();
//   }, [jobSeekerId]);
//   const statusStyles = {
//     Pending: "bg-warning/20 text-warning-content",
//     Accepted: "bg-success/20 text-success-content",
//     Rejected: "bg-error/20 text-error-content",
//     Shortlisted: "bg-info/20 text-info-content",
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-base-content mb-8">
//           My Applications
//         </h1>

//         {applications.length === 0 ? (
//           <div className="text-center py-12 bg-base-100 rounded-lg shadow-lg">
//             <p className="text-neutral-content/70 text-lg">
//               No applications found. Start applying to jobs!
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {applications.map((application) => (
//               <Link
//                 to={`/user/job/${application.job._id}`}
//                 key={application._id}
//                 className="block"
//               >
//                 <div
//                   key={application._id}
//                   className="bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-base-300 p-6"
//                 >
//                   <div className="flex flex-col sm:flex-row gap-6">
//                     {/* Company Logo */}
//                     <div className="flex-shrink-0">
//                       {application.job.employer.companyLogo ? (
//                         <img
//                           src={application.job.employer.companyLogo}
//                           alt={application.job.employer.companyName}
//                           className="w-20 h-20 rounded-lg object-contain border border-base-300 p-0.5"
//                         />
//                       ) : (
//                         <div className="w-20 h-20 rounded-lg bg-base-200 flex items-center justify-center">
//                           <Briefcase className="w-8 h-8 text-base-content/50" />
//                         </div>
//                       )}
//                     </div>

//                     {/* Job Details */}
//                     <div className="flex-grow">
//                       <div className="flex flex-col sm:flex-row justify-between gap-4">
//                         <div>
//                           <h2 className="text-xl font-semibold text-base-content">
//                             {application.job.title}
//                           </h2>
//                           <p className="text-primary font-medium mt-1">
//                             {application.job.employer.companyName}
//                           </p>
//                         </div>
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                             statusStyles[application.status] || "bg-base-200"
//                           }`}
//                         >
//                           <AlertCircle className="w-4 h-4 mr-2" />
//                           {application.status}
//                         </span>
//                       </div>

//                       {/* Job Metadata */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-sm text-base-content/90">
//                         <div className="flex items-center">
//                           <MapPin className="w-5 h-5 mr-2 text-base-content/70" />
//                           {application.job.location}
//                         </div>
//                         <div className="flex items-center">
//                           <Banknote className="w-5 h-5 mr-2 text-base-content/70" />
//                           {application.job.salary
//                             ? `$${(application.job.salary / 1000).toFixed(
//                                 1
//                               )}k/yr`
//                             : "Salary not available"}
//                         </div>
//                         <div className="flex items-center">
//                           <Briefcase className="w-5 h-5 mr-2 text-base-content/70" />
//                           {application.job.jobType}
//                         </div>
//                         <div className="flex items-center">
//                           <CalendarCheck className="w-5 h-5 mr-2 text-base-content/70" />
//                           Applied{" "}
//                           {new Date(
//                             application.applicationDate
//                           ).toLocaleDateString()}
//                         </div>
//                       </div>

//                       {/* Experience Level */}
//                       <div className="mt-4 flex items-center text-sm text-base-content/70">
//                         <Clock className="w-5 h-5 mr-2 text-base-content/70" />
//                         {application.job.experienceLevel} Level
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplicationsPage;
import {
  AlertCircle,
  Banknote,
  Briefcase,
  CalendarCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAppliedJobs } from "../../../Api";
import { useAuth } from "../../../context/AuthContext";

const ApplicationsPage = () => {
  const { jobSeekerId } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusStyles = {
    Pending: "bg-warning/20 text-warning-content",
    Accepted: "bg-success/20 text-success-content",
    Rejected: "bg-error/20 text-error-content",
    Shortlisted: "bg-info/20 text-info-content",
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getAppliedJobs(jobSeekerId);
        setApplications(response.data.data);
        setError("");
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (jobSeekerId) fetchApplications();
  }, [jobSeekerId]);

  const formatSalary = (salary) => {
    if (!salary) return "Salary not available";
    return salary >= 1000
      ? `$${(salary / 1000).toFixed(1)}k/yr`
      : `$${salary}/yr`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-base-content mb-8">
          My Applications
        </h1>

        {error ? (
          <div className="alert alert-error mb-8">
            <span>{error}</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-lg shadow-lg">
            <p className="text-neutral-content/70 text-lg">
              No applications found. Start applying to jobs!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <Link
                to={`/user/job/${application.job._id}`}
                key={application._id}
                className="block"
              >
                <div className="bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-base-300 p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      {application.job.employer.companyLogo ? (
                        <img
                          src={application.job.employer.companyLogo}
                          alt={`${application.job.employer.companyName} logo`}
                          className="w-20 h-20 rounded-lg object-contain border border-base-300 p-0.5"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-lg bg-base-200 flex items-center justify-center">
                          <Briefcase className="w-8 h-8 text-base-content/50" />
                        </div>
                      )}
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-semibold text-base-content">
                            {application.job.title}
                          </h2>
                          <p className="text-primary font-medium mt-1">
                            {application.job.employer.companyName ||
                              "Unknown Company"}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            statusStyles[application.status] || "bg-base-200"
                          }`}
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          {application.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-sm text-base-content/90">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-base-content/70" />
                          {application.job.location || "Location not specified"}
                        </div>
                        <div className="flex items-center">
                          <Banknote className="w-5 h-5 mr-2 text-base-content/70" />
                          {formatSalary(application.job.salary)}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-5 h-5 mr-2 text-base-content/70" />
                          {application.job.jobType || "Job type not specified"}
                        </div>
                        <div className="flex items-center">
                          <CalendarCheck className="w-5 h-5 mr-2 text-base-content/70" />
                          Applied{" "}
                          {new Date(
                            application.applicationDate
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-sm text-base-content/70">
                        <Clock className="w-5 h-5 mr-2 text-base-content/70" />
                        {application.job.experienceLevel ||
                          "Experience level not specified"}{" "}
                        Level
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
