import { Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getFullDay } from "../shared/date";

const AboutEmployer = ({
  className = "",
  companyDescription = "",
  companyWebsite = {},
  location = "Unknown location",
  joinedAt = "",
}) => {
  return (
    <div className={`md:w-[90] md:mt-7 space-y-5 ${className}`}>
      {/* Company Description */}
      <p className="text-pxl leading-7">
        {companyDescription ? companyDescription : "Nothing to show here"}
      </p>

      {/* Website Links */}
      {companyWebsite && Object.keys(companyWebsite).length > 0 && (
        <div className="flex flex-wrap gap-x-7 gap-y-2  my-7 items-center text-gray-400">
          {Object.keys(companyWebsite).map((key) => {
            const website = companyWebsite[key];

            return website ? (
              <div key={key} className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <Link
                  to={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {website}
                </Link>
              </div>
            ) : null;
          })}
        </div>
      )}

      {/* Location & Joined Date */}
      <div className="text-gray-500">
        <p className="flex items-center">
          <MapPin className="mr-2" />
          {location}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {joinedAt ? getFullDay(new Date(joinedAt)) : "Unknown date"}
        </p>
      </div>
    </div>
  );
};

export default AboutEmployer;
