import { Bookmark, Briefcase, Globe } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import useBookmark from "../core/public/Bookmark";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: {
    summary: string;
    responsibilities: string[];
  };
  salary: number;
  experienceLevel: string;
  logoSrc?: string;
  applyLink: string;
}

export default function JobCard({
  id: jobId,
  title,
  company,
  location,
  jobType,
  description = { summary: "No description available", responsibilities: [] },
  salary = 0,
  experienceLevel = "Not specified",
  logoSrc,
  applyLink,
}: JobCardProps) {
  const defaultLogo = "/default-logo.svg";
  const { jobSeekerId } = useAuth();

  // Use our custom hook to manage bookmark state
  const { isBookmarked, isLoading, toggleBookmark } = useBookmark(
    jobId,
    jobSeekerId
  );
  const handleBookmarkClick = () => {
    if (!jobSeekerId) {
      toast.error("Please register as a jobseeker to bookmark jobs");
      return;
    }
    toggleBookmark();
  };

  return (
    <div className="w-auto p-6 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-base-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img
            src={logoSrc || defaultLogo}
            alt="Company logo"
            className="h-8 w-8 object-contain border border-base-300 rounded-lg p-0.5"
          />
          <div>
            <h2 className="text-xl font-semibold text-base-content">{title}</h2>
            <p className="text-primary font-medium">{company}</p>
          </div>
        </div>
        <button
          onClick={handleBookmarkClick}
          disabled={isLoading}
          className="btn btn-ghost btn-circle hover:bg-base-200"
        >
          {isLoading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <Bookmark
              className={`h-6 w-6 transition-colors ${
                isBookmarked
                  ? "text-primary fill-primary"
                  : "text-neutral-content/50 fill-transparent"
              }`}
            />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center text-base-content">
          <Globe className="h-5 w-5 mr-1 text-base-content/70" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-base-content">
          <Briefcase className="h-5 w-5 mr-1 text-base-content/70" />
          <span>{jobType}</span>
        </div>
        <div className="flex items-center text-base-content ml-auto">
          <span className="font-medium">
            {isNaN(Number(salary)) || salary === null
              ? "Salary not available"
              : `$${(Number(salary) / 1000).toFixed(1)}k/yr`}
          </span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-base-content/90 mb-4 leading-relaxed">
          {description.summary}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <a href={applyLink} className="btn btn-primary px-4 py-2 rounded-md">
          View Details
        </a>
        <span className="text-sm text-base-content/70">
          {experienceLevel} Level
        </span>
      </div>
    </div>
  );
}
