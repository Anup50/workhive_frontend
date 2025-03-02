import {
  AlertCircle,
  Banknote,
  Bookmark,
  Briefcase,
  CalendarCheck,
  Clock,
  MapPin,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  applyToJob,
  checkApplicationStatus,
  getJob,
  withdrawApplication,
} from "../../../Api";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/AuthContext";
import { getDay } from "../../../shared/date";
import { Job } from "../../../shared/Jobs/Query";
import SeekerSimilarJobs from "./JobSeekerSimilar";

const UserJobPage = () => {
  const { id } = useParams();
  const { jobSeekerId } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (jobSeekerId && id) {
        try {
          const response = await checkApplicationStatus(id, jobSeekerId);
          setIsApplied(response.data.applied);
          setStatus(response.data.status);
        } catch (err) {
          console.error("Error checking application status:", err);
        }
      }
    };

    const fetchJob = async () => {
      try {
        const response = await getJob(id);
        setJob(response.data.data);
        await fetchApplicationStatus();
      } catch (err) {
        setError(err.message || "Failed to load job details");
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id, jobSeekerId, navigate]);

  const handleApplication = async () => {
    if (!jobSeekerId) {
      navigate("/signin");
      return;
    }

    try {
      if (isApplied) {
        const confirm = window.confirm(
          "Are you sure you want to withdraw your application?"
        );
        if (!confirm) return;

        await withdrawApplication(id);
        setIsApplied(false);
        setStatus(null);
        toast.success("Application withdrawn successfully");
      } else {
        const applicationData = {
          jobId: id, // From URL params
          jobSeekerId: jobSeekerId, // From AuthContext
          message:
            "I am very interested in this position and would like to apply.",
        };
        await applyToJob(applicationData);
        setIsApplied(true);
        setStatus("Pending");
        toast.success("Application submitted successfully!");
      }

      // Refresh job data
      const response = await getJob(id);
      setJob(response.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const getButtonState = () => {
    if (!job?.isActive) return "Closed";
    if (status === "Accepted") return "Accepted";
    if (status === "Rejected") return "Rejected";
    return isApplied ? "Withdraw" : "Apply Now";
  };

  const buttonConfig = {
    Withdraw: { class: "btn-error", disabled: false },
    Applied: { class: "btn-primary", disabled: true },
    Pending: { class: "btn-primary", disabled: true },
    Accepted: { class: "btn-success", disabled: true },
    Rejected: { class: "btn-error", disabled: true },
    Closed: { class: "btn-disabled", disabled: true },
    "Apply Now": { class: "btn-primary", disabled: false },
  };

  const currentState = getButtonState();
  const { class: buttonClass, disabled } = buttonConfig[currentState];

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-error">{error}</div>;

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-8">
      <div className="max-w-6xl mx-auto">
        {/* Job Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            {job?.employer.companyLogo ? (
              <img
                src={job?.employer.companyLogo}
                alt={job?.employer?.companyName}
                className="w-16 h-16 rounded-lg object-contain bg-base-100 p-2"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-base-100 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-opacity-70" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{job?.title}</h1>
              {job?.employer && (
                <Link
                  to={`/employer/${job?.employer?._id}`}
                  className="text-xl font-semibold hover:text-primary transition-colors"
                >
                  {job?.employer?.companyName}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="badge badge-lg badge-primary">
              {job?.datePosted ? getDay(job.datePosted) : "Recently posted"}
            </div>
            <div
              className={`badge badge-lg ${
                job?.isActive ? "badge-success" : "badge-error"
              }`}
            >
              {job?.isActive ? "Active" : "Closed"}
            </div>
          </div>
        </div>

        {/* Job Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <JobMetaItem
            icon={<MapPin className="w-6 h-6 text-primary" />}
            text={job?.location}
          />
          <JobMetaItem
            icon={<Briefcase className="w-6 h-6 text-primary" />}
            text={job?.jobType}
          />
          <JobMetaItem
            icon={<Clock className="w-6 h-6 text-primary" />}
            text={job?.experienceLevel}
          />
          <JobMetaItem
            icon={<Banknote className="w-6 h-6 text-primary" />}
            text={`$${job?.salary?.toLocaleString()}/year`}
          />
          <JobMetaItem
            icon={<CalendarCheck className="w-6 h-6 text-primary" />}
            text={
              job?.deadline
                ? `Apply by ${new Date(job.deadline).toLocaleDateString()}`
                : "Rolling applications"
            }
          />
        </div>

        <div className="bg-base-100 rounded-box p-8 mb-8">
          <SectionHeader title="Job Description" />

          <div>
            <p>{job?.description.summary}</p> {/* ✅ Correct path */}
            <SectionHeader title="Responsibilities" />
            <ul>
              {job?.description.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <SectionHeader title="Required Skills" />
            <div className="flex flex-wrap gap-2">
              {job?.skillsRequired?.map((skill, index) => (
                <span key={index} className="badge badge-outline badge-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Application Section */}
        <div className="bg-base-100 rounded-box p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              {status && (
                <div className={`badge gap-2 ${getStatusBadgeStyle(status)}`}>
                  <AlertCircle className="w-4 h-4" />
                  {status}
                </div>
              )}
              <span className="text-sm opacity-75">
                {job?.applications?.length || 0} applicants
              </span>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-outline">
                <Bookmark className="w-5 h-5" />
                Save Job
              </button>
              <button
                className={`btn ${buttonClass}`}
                disabled={disabled}
                onClick={handleApplication}
              >
                <Send className="w-5 h-5" />
                {currentState}
              </button>
            </div>
          </div>
        </div>

        <SeekerSimilarJobs />
      </div>
    </div>
  );
};

// Helper function for status badge styling
const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return "badge-warning";
    case "Accepted":
      return "badge-success";
    case "Rejected":
      return "badge-error";
    default:
      return "badge-info";
  }
};
// Update JobMetaItem with proper props type
interface JobMetaItemProps {
  icon: React.ReactNode;
  text: string;
}

const JobMetaItem = ({ icon, text }: JobMetaItemProps) => (
  <div className="flex items-center gap-2 bg-base-100 p-4 rounded-box">
    {icon}
    <span>{text}</span>
  </div>
);

// Update SectionHeader with proper props type
interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <h2 className="text-2xl font-bold mb-4">{title}</h2>
);

export default UserJobPage;
