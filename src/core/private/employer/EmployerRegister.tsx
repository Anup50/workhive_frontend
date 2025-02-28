import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpenText, Building2, Globe, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { createEmployer } from "../../../Api";
import { useAuth } from "../../../context/AuthContext";

const employerSchema = z.object({
  companyName: z.string().min(3, "Company name must be at least 3 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  companyWebsite: z
    .string()
    .url("Invalid website URL")
    .optional()
    .or(z.literal("")), // Match mongoose field
  companyDescription: z
    .string()
    .min(50, "Description must be at least 50 characters"), // Match mongoose field
  companyLogo: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.type.startsWith("image/"),
      "Must be an image file"
    )
    .optional(),
});

type EmployerFormData = z.infer<typeof employerSchema>;

export default function CompleteEmployerProfile() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") ?? ""; // Provide fallback
  const { employerId } = useAuth();

  if (employerId) {
    return <Navigate to="/employer" />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EmployerFormData>({
    resolver: zodResolver(employerSchema),
  });

  const logoPreview = watch("companyLogo")?.[0];
  const { setEmployerId } = useAuth();
  const onSubmit = async (data: EmployerFormData) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("companyName", data.companyName);
    formData.append("location", data.location);
    formData.append("companyDescription", data.companyDescription); // Direct match
    formData.append("companyWebsite", data.companyWebsite || ""); // Direct match
    if (data.companyLogo && data.companyLogo.length > 0) {
      formData.append("companyLogo", data.companyLogo[0]); // Append file correctly
    }
    console.log("Submitting FormData:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await createEmployer(formData);
      if (response.data.success) {
        const newEmployerId = response.data.data._id;
        localStorage.setItem("employerId", newEmployerId);
        setEmployerId(newEmployerId);
        toast.success("Profile created successfully!");

        navigate("/employer");
      } else {
        toast.error("Failed to create profile.");
      }
    } catch (error) {
      toast.error("Error creating profile.");
      console.error("Profile creation error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Complete Your Employer Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="bg-base-100 rounded-box p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Image className="w-6 h-6 text-primary" />
              Company Logo
            </h2>

            <div className="flex items-center gap-6">
              <div className="form-control">
                <input
                  type="file"
                  {...register("companyLogo")}
                  className="file-input file-input-bordered"
                  accept="image/*"
                />
                {errors.companyLogo && (
                  <span className="text-error mt-2">
                    {errors.companyLogo.message}
                  </span>
                )}
              </div>

              {logoPreview && (
                <div className="avatar">
                  <div className="w-24 rounded-lg bg-base-200">
                    <img
                      src={URL.createObjectURL(logoPreview)}
                      alt="Logo preview"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Company Info Section */}
          <div className="bg-base-100 rounded-box p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              Company Information
            </h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Company Name</span>
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  className="input input-bordered w-full"
                />
                {errors.companyName && (
                  <span className="text-error mt-2">
                    {errors.companyName.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  {...register("location")}
                  className="input input-bordered w-full"
                />
                {errors.location && (
                  <span className="text-error mt-2">
                    {errors.location.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Website (optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    {...register("companyWebsite")}
                    className="input input-bordered w-full pl-10"
                  />
                  <Globe className="absolute left-3 top-3.5 w-4 h-4 text-base-content/50" />
                </div>
                {errors.companyWebsite && (
                  <span className="text-error mt-2">
                    {errors.companyWebsite.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Description Section */}
          <div className="bg-base-100 rounded-box p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpenText className="w-6 h-6 text-primary" />
              Company Description
            </h2>

            <div className="form-control">
              <textarea
                {...register("companyDescription")}
                className="textarea textarea-bordered h-48"
                placeholder="Describe your company..."
              ></textarea>
              {errors.companyDescription && (
                <span className="text-error mt-2">
                  {errors.companyDescription.message}
                </span>
              )}
            </div>
          </div>
          {/* Logo Upload Section */}
          {/* Submit Section */}
          <div className="bg-base-100 rounded-box p-8">
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Complete Profile"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
