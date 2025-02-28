import {
  AlertCircle,
  Banknote,
  Bookmark,
  Briefcase,
  Building2,
  CalendarCheck,
  Clock,
  MapPin,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJob } from "../../Api";
import Loader from "../../components/Loader";
import { getDay } from "../../shared/date";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJob(id);
        setJob(response.data.data);
      } catch (err) {
        setError(err.message);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-8">
      <div className="max-w-6xl mx-auto">
        {/* Job Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            {job.employer?.companyLogo ? (
              <img
                src={job?.employer?.companyLogo}
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
              {getDay(job?.datePosted)}
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
            text={job.location}
          />
          <JobMetaItem
            icon={<Briefcase className="w-6 h-6 text-primary" />}
            text={job.jobType}
          />
          <JobMetaItem
            icon={<Clock className="w-6 h-6 text-primary" />}
            text={job.experienceLevel}
          />
          <JobMetaItem
            icon={<Banknote className="w-6 h-6 text-primary" />}
            text={`$${job?.salary?.toLocaleString()}/year`}
          />
          <JobMetaItem
            icon={<CalendarCheck className="w-6 h-6 text-primary" />}
            text={`Apply by ${new Date(job?.deadline).toLocaleDateString()}`}
          />
        </div>

        <div className="bg-base-100 rounded-box p-8 mb-8">
          <SectionHeader title="Job Description" />

          <div>
            <p>{job.description.summary}</p> {/* ✅ Correct path */}
            <SectionHeader title="Responsibilities" />
            <ul>
              {job.description.responsibilities.map((item, index) => (
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
              {isApplied && (
                <div className="badge badge-success gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Application Submitted
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
                className="btn btn-primary"
                // disabled={!job.isActive || isApplied}
                onClick={() => navigate(`/jobs/${id}/apply`)}
              >
                <Send className="w-5 h-5" />
                {isApplied ? "Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable components
const JobMetaItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-base-100 p-4 rounded-box">
    {icon}
    <span>{text}</span>
  </div>
);

const SectionHeader = ({ title }) => (
  <h2 className="text-2xl font-bold mb-4">{title}</h2>
);

export default JobPage;
