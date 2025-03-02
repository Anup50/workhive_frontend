import { Briefcase, Building2, Clock, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSimilarJobs } from "../../Api";
import { Job } from "../../shared/Jobs/Query";

const SimilarJobs = () => {
  const { id } = useParams();
  const [similarJobs, setSimilarJobs] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarJobs = async () => {
      try {
        const response = await getSimilarJobs(id); // Call the function with id
        setSimilarJobs(response.data.data); // Access the array from response.data.data
      } catch (error) {
        console.error("Error fetching similar jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSimilarJobs();
  }, [id]);

  if (loading) return <div className="loading-spinner"></div>;
  if (!similarJobs?.length) return null;

  return (
    <div className="bg-base-100 rounded-box p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarJobs.map((job) => (
          <div
            key={job._id}
            className="bg-base-200 rounded-box p-4 hover:bg-base-300 transition-colors"
          >
            <Link to={`/job/${job._id}`} className="block">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <div className="text-sm text-primary flex items-center gap-1 mt-1">
                    <Building2 className="w-4 h-4" />
                    {job.employer.companyName}
                  </div>
                </div>
                {job.employer.companyLogo && (
                  <img
                    src={job.employer.companyLogo}
                    alt={job.employer.companyName}
                    className="w-12 h-12 rounded-lg object-contain"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <div className="badge badge-info gap-1">
                  <Briefcase className="w-4 h-4" />
                  {job.jobType}
                </div>
                <div className="badge badge-secondary gap-1">
                  <Clock className="w-4 h-4" />
                  {job.experienceLevel}
                </div>
                <div className="badge badge-accent gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm">
                  ${job.salary.toLocaleString()}/year
                </div>
                <div className="flex items-center gap-1 text-warning">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{job.similarityScore} matches</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobs;
