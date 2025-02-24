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
export const getJobSeekerId = () => Api.get("/api/jobseeker/getJobSeekerId");
export const getRecommendedJobs = (jobSeekerId: string) => {
  return Api.get(`/api/job/recommended/${jobSeekerId}`);
};