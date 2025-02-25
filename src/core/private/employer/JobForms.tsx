// import axios from "axios";
// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";

// interface JobFormProps {
//   jobId?: string;
//   onSuccess: () => void;
// }

// interface JobData {
//   title: string;
//   description: string;
//   employer: string;
//   location: string;
//   salary: number;
//   jobType: "Full-time" | "Part-time" | "Contract" | "Freelance";
//   experienceLevel: "Entry" | "Mid" | "Senior";
//   deadline?: string;
//   skillsRequired: string;
//   isActive: boolean;
// }

// const JobForm: React.FC<JobFormProps> = ({ jobId, onSuccess }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<JobData>();

//   useEffect(() => {
//     if (jobId) {
//       axios.get(`/api/jobs/${jobId}`).then((response) => {
//         const job = response.data;
//         setValue("title", job.title);
//         setValue("description", job.description);
//         setValue("employer", job.employer);
//         setValue("location", job.location);
//         setValue("salary", job.salary);
//         setValue("jobType", job.jobType);
//         setValue("experienceLevel", job.experienceLevel);
//         setValue("deadline", job.deadline?.split("T")[0]);
//         setValue("skillsRequired", job.skillsRequired.join(", "));
//         setValue("isActive", job.isActive);
//       });
//     } else {
//       reset();
//     }
//   }, [jobId, setValue, reset]);

//   const onSubmit = async (data: JobData) => {
//     try {
//       const formattedData = {
//         ...data,
//         skillsRequired: data.skillsRequired
//           .split(",")
//           .map((skill) => skill.trim().toLowerCase()),
//       };
//       if (jobId) {
//         await axios.put(`/api/jobs/${jobId}`, formattedData);
//       } else {
//         await axios.post("/api/jobs", formattedData);
//       }
//       onSuccess();
//     } catch (error) {
//       console.error("Error submitting job:", error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 p-4 border rounded"
//     >
//       <input
//         {...register("title", { required: "Title is required" })}
//         placeholder="Job Title"
//         className="input input-bordered w-full"
//       />
//       {errors.title && <p className="text-red-500">{errors.title.message}</p>}

//       <textarea
//         {...register("description", { required: "Description is required" })}
//         placeholder="Job Description"
//         className="textarea textarea-bordered w-full"
//       />
//       {errors.description && (
//         <p className="text-red-500">{errors.description.message}</p>
//       )}

//       <input
//         {...register("location", { required: "Location is required" })}
//         placeholder="Location"
//         className="input input-bordered w-full"
//       />
//       {errors.location && (
//         <p className="text-red-500">{errors.location.message}</p>
//       )}

//       <input
//         type="number"
//         {...register("salary", { required: "Salary is required" })}
//         placeholder="Salary"
//         className="input input-bordered w-full"
//       />
//       {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}

//       <select
//         {...register("jobType", { required: "Job type is required" })}
//         className="select select-bordered w-full"
//       >
//         <option value="">Select Job Type</option>
//         <option value="Full-time">Full-time</option>
//         <option value="Part-time">Part-time</option>
//         <option value="Contract">Contract</option>
//         <option value="Freelance">Freelance</option>
//       </select>
//       {errors.jobType && (
//         <p className="text-red-500">{errors.jobType.message}</p>
//       )}

//       <select
//         {...register("experienceLevel", {
//           required: "Experience level is required",
//         })}
//         className="select select-bordered w-full"
//       >
//         <option value="">Select Experience Level</option>
//         <option value="Entry">Entry</option>
//         <option value="Mid">Mid</option>
//         <option value="Senior">Senior</option>
//       </select>
//       {errors.experienceLevel && (
//         <p className="text-red-500">{errors.experienceLevel.message}</p>
//       )}

//       <input
//         type="date"
//         {...register("deadline")}
//         className="input input-bordered w-full"
//       />

//       <input
//         {...register("skillsRequired", { required: "Skills are required" })}
//         placeholder="Skills (comma-separated)"
//         className="input input-bordered w-full"
//       />
//       {errors.skillsRequired && (
//         <p className="text-red-500">{errors.skillsRequired.message}</p>
//       )}

//       <label className="flex items-center space-x-2">
//         <input type="checkbox" {...register("isActive")} className="checkbox" />
//         <span>Is Active</span>
//       </label>

//       <button type="submit" className="btn btn-primary w-full">
//         {jobId ? "Update Job" : "Add Job"}
//       </button>
//     </form>
//   );
// };

// export default JobForm;
import { useForm } from "react-hook-form";
import { Job, useCreateJob } from "../../../shared/Jobs/Query";

interface JobFormProps {
  jobId?: string;
}

interface JobFormData {
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: string;
  experienceLevel: "Entry" | "Mid" | "Senior";
  skillsRequired: string;
  deadline?: string;
  isActive?: boolean;
}

const JobForm = ({ jobId }: JobFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormData>();
  const { mutate, isPending, isError, error } = useCreateJob();

  const onSubmit = (formData: JobFormData) => {
    // Transform form data to match API expectations
    const jobData: Partial<Job> = {
      ...formData,
      salary: Number(formData.salary),
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((skill) => skill.trim()),
      // Add any additional transformations here
    };

    mutate(jobData, {
      onSuccess: () => {
        reset(); // Reset form after successful submission
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded"
    >
      {isError && (
        <div className="text-red-500 p-2 rounded bg-red-50">
          {error?.message || "Failed to create job"}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : jobId ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
};

export default JobForm;
