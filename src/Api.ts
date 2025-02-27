import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data: { name: string; email: string; password: string; role: string | null; }) => Api.post("api/user/register", data);
export const loginUser = (data: { email: string; password: string; }) => Api.post("api/user/login", data);
export const createJobs = (data: any) => Api.post("api/job", data);
export const getAllJobs = () => Api.get("/api/job/getall");
export const searchJobs = (query: string) => Api.get(`/api/search/jobs/${query}`);
export const searchEmployer = (query: string) => Api.get(`/api/search/employers/${query}`);
export const getJobSeekerId = () => Api.get("/api/jobseeker/getJobSeekerId");
export const createJobSeeker = (payload: { userId: string; bio: string; skills: string[]; location: string; profilePicture: string; }) => Api.post("/api/jobseeker/", payload);
export const uploadProfileImage = (imageFormData: FormData) => {
  return Api.post("/api/jobseeker/uploadImage", imageFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getEmployerId = () => Api.get("/api/employer/getEmployerId");
export const getRecommendedJobs = (jobSeekerId: string) => {
  return Api.get(`/api/job/recommended/${jobSeekerId}`);
};
export const getEmployer = (employerId: string) => {
  console.log("Fetching employer with ID:", employerId);
  return Api.get(`/api/employer/find/${employerId}`);
};
