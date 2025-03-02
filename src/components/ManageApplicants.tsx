import { CheckCircle, List, Star, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getApplicantsForJob, updateApplicationStatus } from "../Api";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

interface Applicant {
  _id: string;
  status: string;
  applicationDate: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  jobSeeker: {
    profilePicture: string;
    skills: string[];
    experience?: string;
  };
  job: {
    title: string;
    employer: string;
  };
}

const ManageApplicants = ({ jobId }: { jobId: string }) => {
  const { employerId } = useAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Adjust keys to lower-case for consistency
  const statusColors: { [key: string]: string } = {
    accepted: "bg-success text-success-content",
    rejected: "bg-error text-error-content",
    shortlisted: "bg-warning text-warning-content",
    pending: "bg-neutral text-neutral-content",
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError("");
        const { data: resData } = await getApplicantsForJob(jobId);
        if (!resData.success) {
          throw new Error(resData.message || "Failed to fetch applicants");
        }
        setApplicants(resData.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchApplicants();
  }, [jobId, employerId]);

  const handleStatusUpdate = async (applicantId: string, status: string) => {
    try {
      // Call the API once and destructure its response
      const { data: resData } = await updateApplicationStatus(
        applicantId,
        employerId,
        status
      );

      console.log("API response:", resData); // Debug log

      if (!resData.success) {
        throw new Error(resData.message || "Status update failed");
      }
      if (!resData.data) {
        throw new Error("No data returned from updateApplicationStatus");
      }

      // Update the applicant in state
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === applicantId
            ? {
                ...app,
                status: resData.data.status,
                jobSeeker: {
                  ...app.jobSeeker,
                  skills: resData.data.applicant.skills,
                  experience: resData.data.applicant.experience,
                },
              }
            : app
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Applicants</h2>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : applicants.length === 0 ? (
        <div className="text-center p-8 bg-base-200 rounded-lg">
          <span className="text-base-content/70">
            No applicants found for this position
          </span>
        </div>
      ) : (
        <div className="grid gap-4">
          {applicants.map((applicant) => (
            <div key={applicant._id} className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  {/* Applicant Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                          {applicant.jobSeeker?.profilePicture ? (
                            <img
                              src={applicant.jobSeeker.profilePicture}
                              alt="Profile"
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-xl">
                              {applicant.user?.name?.[0] || "?"}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {applicant.user?.name}
                          {applicant.status === "Shortlisted" && (
                            <Star className="w-4 h-4 ml-2 text-yellow-500 inline" />
                          )}
                        </h3>
                        <p className="text-sm text-base-content/80">
                          {applicant.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {applicant.jobSeeker?.skills?.map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="badge badge-outline"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-base-content/70">
                        Applied:{" "}
                        {new Date(
                          applicant.applicationDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Status Controls */}
                  <div className="flex flex-col gap-2 min-w-[200px]">
                    <div
                      className={`badge ${
                        statusColors[applicant.status.toLowerCase()]
                      }`}
                    >
                      {applicant.status}
                    </div>

                    <div className="join join-vertical md:join-horizontal">
                      <button
                        onClick={() =>
                          handleStatusUpdate(applicant._id, "Shortlisted")
                        }
                        className="join-item btn btn-sm"
                        disabled={applicant.status === "Shortlisted"} // lowercase match
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(applicant._id, "Accepted")
                        }
                        className="join-item btn btn-sm btn-success"
                        disabled={applicant.status === "Accepted"} // lowercase match
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(applicant._id, "Rejected")
                        }
                        className="join-item btn btn-sm btn-error"
                        disabled={applicant.status === "Rejected"} // lowercase match
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageApplicants;
