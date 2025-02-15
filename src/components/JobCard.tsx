import { Bookmark, Briefcase, Globe } from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  applyLink: string;
  logoSrc?: string; // Optional logo prop
}

export default function JobCard({
  title,
  company,
  location,
  jobType,
  description,
  applyLink,
  logoSrc,
}: JobCardProps) {
  // Default image if no logo is provided
  const defaultLogo = "/default-logo.svg";

  // State for bookmark button (clicked or not)
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Toggle bookmark state
  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="max-w-2xl p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        {/* Logo on the left */}
        <div className="flex items-center gap-3">
          <img
            src={logoSrc || defaultLogo} // Use provided logoSrc or fallback to defaultLogo
            alt="Company logo"
            className="h-8 w-8 object-contain"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-purple-600 font-medium">{company}</p>
          </div>
        </div>

        {/* Bookmark button on the right */}
        <button onClick={handleBookmarkClick} className="focus:outline-none">
          <Bookmark
            className="h-8 w-8"
            style={{ fill: isBookmarked ? "blue" : "transparent" }} // Default transparent, blue when bookmarked
          />
        </button>
      </div>

      {/* Job Details */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <Globe className="h-5 w-5 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="h-5 w-5 mr-1" />
          <span>{jobType}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Apply now
        </a>
        <span className="text-sm text-gray-500">via {company}</span>
      </div>
    </div>
  );
}
