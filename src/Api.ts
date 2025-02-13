import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const registerUser = (data: { name: string; email: string; password: string; role: string | null; }) => Api.post("api/user", data);
export const loginUser = (data: { email: string; password: string; }) => Api.post("api/user/login", data);
export const getAllJobs = () => Api.get("/api/jobs");