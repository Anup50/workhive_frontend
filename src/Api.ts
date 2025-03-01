import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
//Auth=============================================================================================================================================================
export const registerUser = (data: { name: string; email: string; password: string; role: string | null; }) => Api.post("api/user/register", data);
export const loginUser = (data: { email: string; password: string; }) => Api.post("api/user/login", data);

//Jobs=============================================================================================================================================================
export const createJobs = (data: any) => Api.post("api/job", data);
export const getAllJobs = () => Api.get("/api/job/getall");
export const getJob =  (id: string | undefined) => {
  return Api.get(`/api/job/${id}`);
};
export const getRecommendedJobs = (jobSeekerId: string) => {
  return Api.get(`/api/job/recommended/${jobSeekerId}`);
};
export const getSimilarJobs = (id: string) => {
  return Api.get(`/api/job/getsimilar/${id}`);
};
export const createEmployer = (formData: FormData) => {
  return Api.post("/api/employer/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
};
//Search=============================================================================================================================================================
export const searchEmployer = (query: string) => Api.get(`/api/search/employers/${query}`);
export const searchJobs = (query: string) => Api.get(`/api/search/jobs/${query}`);

//Employer=============================================================================================================================================================
export const getEmployerId = () => Api.get("/api/employer/getEmployerId");
export const getEmployer = (employerId: string) => {
  console.log("Fetching employer with ID:", employerId);
  return Api.get(`/api/employer/find/${employerId}`);
};

//JobSeeker=============================================================================================================================================================
export const getJobSeekerId = () => Api.get("/api/jobseeker/getJobSeekerId");
export const createJobSeeker = (payload: { userId: string; bio: string; skills: string[]; location: string; profilePicture: string; }) => Api.post("/api/jobseeker/", payload);
export const uploadProfileImage = (imageFormData: FormData) => {
  return Api.post("/api/jobseeker/uploadImage", imageFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
};
//Apply========================================================================================================================================================
export const Apply = () =>  Api.post("/api/application");
// Add these to your Api.ts file
export const checkApplicationStatus = (jobId: string, jobSeekerId: string) => 
  Api.get(`/api/applications/${jobId}/status?jobseekerId=${jobSeekerId}`);

export const applyToJob = (jobId: string, jobSeekerId: string) =>
  Api.post(`/api/applications/${jobId}/apply`, { userId: jobSeekerId });
export const getAppliedJobs = () => Api.get("/api/application/applied-jobs"); 
export const getApplicantsForJob = (jobId: string) => Api.get(`/api/application/job/${jobId}/applicants`);

