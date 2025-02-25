import { ChevronRight, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const EmployerCard = ({ employer }) => {
  const { _id, companyName, companyWebsite, companyLogo, location } =
    employer || {};

  const cleanWebsite = companyWebsite
    ?.replace(/(^\w+:|^)\/\/(www\.)?/, "")
    .replace(/\/$/, "");

  return (
    <Link
      to={`/employer/${_id}`}
      className="flex gap-4 p-4 items-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <img
        src={companyLogo}
        alt={companyName}
        className="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-gray-700"
      />

      <div className="flex-1 min-w-0">
        <h1 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
          {companyName}
        </h1>

        <div className="mt-2 space-y-1.5">
          {location && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate">{location}</span>
            </div>
          )}

          {companyWebsite && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {cleanWebsite}
              </span>
            </div>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0" />
    </Link>
  );
};

export default EmployerCard;
