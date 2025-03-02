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
export const getJobsByEmployerId = async (employerId: string) => {
  return Api.get(`/api/job/employer/${employerId}`);
 
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
export const createEmployer = (formData: FormData) => {
  return Api.post("/api/employer/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
};
//JobSeeker=============================================================================================================================================================
export const getJobSeekerId = () => Api.get("/api/jobseeker/getJobSeekerId");
export const getJobseeker = (jobSeekerId: string) => Api.get(`/api/jobseeker/${jobSeekerId}`);

export const createJobSeeker = (payload: { userId: string; bio: string; skills: string[]; location: string; profilePicture: string; }) => Api.post("/api/jobseeker/", payload);
export const uploadProfileImage = (imageFormData: FormData) => {
  return Api.post("/api/jobseeker/uploadImage", imageFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
};
//Apply========================================================================================================================================================

export const checkApplicationStatus = (jobId: string) => 
  Api.get(`/api/application/isApplied/${jobId}`);

export const applyToJob = (applicationData: { jobId: string | undefined; jobSeekerId: string; message: string; }) =>
  Api.post("/api/application/", applicationData);
export const getAppliedJobs = (jobSeekerId: any) => Api.get(`/api/application/appliedjobs/${jobSeekerId}`); 
export const getApplicantsForJob = (jobId: string) => Api.get(`/api/application/job/${jobId}`);

export const withdrawApplication = (jobId: string) => 
  Api.delete(`/api/application/job/${jobId}/withdraw`);
// export const updateApplicationStatus = (applicationId: string, status: string) => 
//   Api.patch(`/api/applications/${applicationId}/status`, { status });
export const updateApplicationStatus = (
  applicationId: string,
  employerId: string, 
  status: string
) => Api.patch(`/api/application/${applicationId}/status`, { employerId, status });
// Bookmark ========================================================================================================================================================
export const createBookmark = (data: { jobId: string; jobSeekerId: string }) =>
  Api.post("/api/bookmark", data);

export const deleteBookmark = (jobId: string, jobSeekerId: string) =>
  Api.delete(`/api/bookmark/${jobId}/${jobSeekerId}`);

export const getBookmarksByJobSeeker = (jobSeekerId: string) =>
  Api.get(`/api/bookmark/jobSeeker/${jobSeekerId}`);

export const getBookmarksByJob = (jobId: string) =>
  Api.get(`/api/bookmark/job/${jobId}`);

export const checkIfBookmarked = (jobId: string, jobSeekerId: string) =>
  Api.get(`/api/bookmark/isBookmarked/${jobId}/${jobSeekerId}`);

