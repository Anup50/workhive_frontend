import { Calendar, MapPin } from "lucide-react";

const AboutJobseeker = ({ bio, location, skills, joinedAt, className }) => {
  return (
    <div className={`${className}`}>
      {bio && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About Me</h3>
          <p className="text-base-content/90 leading-relaxed">{bio}</p>
        </div>
      )}

      <div className="space-y-3">
        {location && (
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-base-content/70" />
            <span className="text-base-content/90">{location}</span>
          </div>
        )}

        {skills?.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="badge badge-outline badge-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {joinedAt && (
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-base-content/70" />
            <span className="text-base-content/90">
              Joined {new Date(joinedAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default AboutJobseeker;
