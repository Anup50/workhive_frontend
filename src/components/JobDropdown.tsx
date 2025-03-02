import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { getJobsByEmployerId } from "../Api";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export interface Job {
  _id: string;
  title: string;
  description: {
    summary: string;
    responsibilities: string[];
  };
  employer: {
    _id: string;
    companyName: string;
    companyLogo: string;
    location: string;
  };
  location: string;
  salary: number;
  jobType: string;
  experienceLevel: string;
  isActive: boolean;
  datePosted: string;
  __v?: number;
  applicationCount?: number;
}

interface JobsResponse {
  success: boolean;
  data: Job[];
  message?: string;
}

interface JobSelectionDropdownProps {
  onSelectJob: (jobId: string) => void; // Add this prop
}

const JobSelectionDropdown = ({ onSelectJob }: JobSelectionDropdownProps) => {
  const { employerId } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        if (!employerId) {
          throw new Error("No employer ID found");
        }

        const { data: resData }: { data: JobsResponse } =
          await getJobsByEmployerId(employerId);

        console.log("API Response:", resData); // Debug log

        if (!resData.success) {
          throw new Error(resData.message || "Failed to fetch jobs");
        }

        if (!Array.isArray(resData.data)) {
          throw new Error("Invalid jobs data format: expected array");
        }

        setJobs(resData.data);
      } catch (err: any) {
        setError(err.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [employerId]);

  const handleJobSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);

    onSelectJob(jobId); // Call the onSelectJob prop with the selected jobId
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <Briefcase className="w-6 h-6 text-primary" />
        <span>Select Job Posting</span>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <select
        className="select select-bordered w-full bg-base-200 hover:bg-base-300 transition-colors"
        value={selectedJobId}
        onChange={handleJobSelect} // Use the new handler
      >
        <option value="">Choose a job to manage</option>
        {jobs.map((job) => (
          <option key={job._id} value={job._id}>
            {job.title}
          </option>
        ))}
      </select>

      {!loading && jobs.length === 0 && !error && (
        <div className="mt-4 p-4 bg-base-200 rounded-lg">
          <p className="text-base-content/70">
            No job postings found. Create a job first to manage applications.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobSelectionDropdown;

// import { useState } from 'react';
// import { Briefcase, List, CheckCircle, XCircle, User, Star, ChevronDown } from 'lucide-react';

// const ManageApplications = () => {
//   const [selectedJob, setSelectedJob] = useState<string>('');
//   const [jobs] = useState([
//     { id: '1', title: 'Senior Frontend Developer', applications: 15 },
//     { id: '2', title: 'Backend Engineer', applications: 8 },
//   ]);

//   const [applications, setApplications] = useState([
//     {
//       id: '1',
//       jobseeker: {
//         name: 'John Doe',
//         email: 'john@example.com',
//         skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
//         experience: '5+ years',
//         location: 'New York, NY',
//         bio: 'Passionate full-stack developer with expertise in modern web technologies'
//       },
//       status: 'pending',
//       appliedDate: '2023-08-15'
//     },
//     {
//       id: '2',
//       jobseeker: {
//         name: 'Jane Smith',
//         email: 'jane@example.com',
//         skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
//         experience: '3+ years',
//         location: 'San Francisco, CA',
//         bio: 'Backend specialist focused on scalable solutions'
//       },
//       status: 'shortlisted',
//       appliedDate: '2023-08-14'
//     },
//   ]);

//   const handleStatusUpdate = (applicationId: string, newStatus: string) => {
//     setApplications(applications.map(app =>
//       app.id === applicationId ? { ...app, status: newStatus } : app
//     ));
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'hired': return 'badge-success';
//       case 'rejected': return 'badge-error';
//       case 'shortlisted': return 'badge-warning';
//       default: return 'badge-ghost';
//     }
//   };

//   return (
//     <div className="p-6 min-h-screen bg-base-100 text-base-content">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center gap-2 mb-8">
//           <Briefcase className="w-8 h-8 text-primary" />
//           <h1 className="text-3xl font-bold">Manage Applications</h1>
//         </div>

//         {/* Job Selection */}
//         <div className="mb-8 bg-base-200 p-4 rounded-lg">
//           <div className="flex items-center gap-4 flex-wrap">
//             <div className="flex-1">
//               <div className="form-control w-full">
//                 <label className="label">
//                   <span className="label-text">Select Job Posting</span>
//                 </label>
//                 <select
//                   className="select select-bordered"
//                   value={selectedJob}
//                   onChange={(e) => setSelectedJob(e.target.value)}
//                 >
//                   <option value="">Choose a job</option>
//                   {jobs.map(job => (
//                     <option key={job.id} value={job.id}>
//                       {job.title} ({job.applications} applicants)
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Applications List */}
//         {selectedJob ? (
//           <div className="grid gap-4">
//             {applications.length > 0 ? (
//               applications.map(application => (
//                 <div key={application.id} className="card bg-base-100 shadow-lg">
//                   <div className="card-body">
//                     <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                       {/* Jobseeker Profile */}
//                       <div className="flex-1 space-y-2">
//                         <div className="flex items-center gap-3">
//                           <div className="avatar placeholder">
//                             <div className="bg-neutral text-neutral-content rounded-full w-12">
//                               <User className="w-6 h-6" />
//                             </div>
//                           </div>
//                           <div>
//                             <h2 className="card-title text-lg">
//                               {application.jobseeker.name}
//                               {application.status === 'shortlisted' &&
//                                 <Star className="w-5 h-5 text-yellow-500 ml-2" />}
//                             </h2>
//                             <div className="text-sm">{application.jobseeker.experience} experience</div>
//                           </div>
//                         </div>

//                         <div className="ml-2 space-y-2">
//                           <div className="flex flex-wrap gap-2">
//                             {application.jobseeker.skills.map(skill => (
//                               <div key={skill} className="badge badge-outline">
//                                 {skill}
//                               </div>
//                             ))}
//                           </div>

//                           <div className="text-sm text-base-content/80">
//                             {application.jobseeker.bio}
//                           </div>

//                           <div className="flex items-center gap-2 text-sm">
//                             <span>📍 {application.jobseeker.location}</span>
//                             <span>•</span>
//                             <span>Applied: {application.appliedDate}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Action Controls */}
//                       <div className="flex flex-col gap-2 min-w-[200px]">
//                         <div className={`badge ${getStatusColor(application.status)} gap-1`}>
//                           {application.status}
//                         </div>

//                         <div className="flex flex-col gap-2">
//                           <button
//                             onClick={() => handleStatusUpdate(application.id, 'hired')}
//                             className="btn btn-success btn-sm"
//                             disabled={application.status === 'hired'}
//                           >
//                             <CheckCircle className="w-4 h-4 mr-2" />
//                             Hire
//                           </button>

//                           <button
//                             onClick={() => handleStatusUpdate(application.id, 'rejected')}
//                             className="btn btn-error btn-sm"
//                             disabled={application.status === 'rejected'}
//                           >
//                             <XCircle className="w-4 h-4 mr-2" />
//                             Reject
//                           </button>

//                           <button
//                             onClick={() => handleStatusUpdate(application.id, 'shortlisted')}
//                             className="btn btn-warning btn-sm"
//                             disabled={application.status === 'shortlisted'}
//                           >
//                             <List className="w-4 h-4 mr-2" />
//                             Shortlist
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center p-8 bg-base-200 rounded-lg">
//                 <User className="w-16 h-16 mx-auto text-base-content/50 mb-4" />
//                 <p className="text-xl">No applications found for this position</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center p-8 bg-base-200 rounded-lg">
//             <Briefcase className="w-16 h-16 mx-auto text-base-content/50 mb-4" />
//             <p className="text-xl">Select a job position to view candidates</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageApplications;
