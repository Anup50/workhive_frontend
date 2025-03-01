import { Briefcase, Building2, ListChecks } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createJobs } from "../../../Api";
import { useAuth } from "../../../context/AuthContext";
import { ExperienceLevel, JobType } from "./types"; // Define these enums in your types

export default function AddJobPage() {
  const { employerId } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<{
    message: string;
    details?: Array<{ field: string; message: string }>;
  } | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const onSubmit = async (data: any) => {
    try {
      const deadlineDate = new Date(data.deadline);
      // Set time to end of day
      deadlineDate.setHours(23, 59, 59, 999);

      const jobData = {
        title: data.title,
        description: {
          summary: data.description?.summary,
          responsibilities: responsibilities,
        },
        employer: employerId,
        location: data.location,
        salary: Number(data.salary),
        jobType: data.jobType,
        experienceLevel: data.experienceLevel,
        deadline: new Date(data.deadline).toISOString(),
        skillsRequired: skills,
        isActive: true,
      };

      const response = await createJobs(jobData);

      if (response.data.success) {
        console.log("Job created successfully:", response.data);
        setSubmitError(null);
        toast.success("Job created successfully");
        // Redirect to jobs list
        navigate("/employer/jobs");
      } else {
        setSubmitError({
          message: response.data.message || "Failed to create job listing",
          details: response.data.details,
        });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError({
        message:
          error.response?.data?.message || "An unexpected error occurred",
        details: error.response?.data?.details,
      });
    }
  };
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Post New Job</h1>
        {/* Error Display */}
        {submitError && (
          <div className="alert alert-error mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex flex-col">
              <span>{submitError.message}</span>
              {submitError.details?.map((detail, index) => (
                <span key={index} className="text-xs">
                  {detail.field}: {detail.message}
                </span>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Job Basics Section */}
          <div className="bg-base-100 rounded-box p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Job Basics
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Job Title</span>
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.title && (
                  <span className="text-error mt-2">Title is required</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Job Type</span>
                  </label>
                  <select
                    {...register("jobType", { required: true })}
                    className="select select-bordered w-full"
                  >
                    {Object.values(JobType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Experience Level</span>
                  </label>
                  <select
                    {...register("experienceLevel", { required: true })}
                    className="select select-bordered w-full"
                  >
                    {Object.values(ExperienceLevel).map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-base-100 rounded-box p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-primary" />
              Job Description
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Summary</span>
                </label>
                <textarea
                  {...register("description.summary", { required: true })}
                  className="textarea textarea-bordered h-32"
                  placeholder="Enter job summary..."
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Responsibilities (one per line)
                  </span>
                </label>
                <textarea
                  onChange={(e) =>
                    setResponsibilities(e.target.value.split("\n"))
                  }
                  className="textarea textarea-bordered h-48"
                  placeholder="Enter responsibilities..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="bg-base-100 rounded-box p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Requirements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  {...register("location", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Salary ($/year)</span>
                </label>
                <input
                  type="number"
                  {...register("salary", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Key Skills (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setSkills(e.target.value.split(",").map((s) => s.trim()))
                  }
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Application Deadline</span>
                </label>
                <input
                  type="date"
                  {...register("deadline", { required: true })}
                  className="input input-bordered w-full"
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-base-100 rounded-box p-8">
            <div className="flex justify-end gap-4">
              <button type="button" className="btn btn-ghost">
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Posting...
                  </>
                ) : (
                  "Post Job"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
