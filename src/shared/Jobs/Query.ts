import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createJobs, getAllJobs, getRecommendedJobs } from "../../Api";

export interface Employer {
    _id: string;
    companyName: string;
    companyLogo?: string;
    location?: string;
  }
  export interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    employer: Employer; // Add this line
    salary?: number;
    skillsRequired: string[];
    jobType: string;
    experienceLevel?: 'Entry' | 'Mid' | 'Senior';
    createdAt: Date;
    updatedAt: Date;
  }

  interface RecommendedJobsParams {
    jobSeekerId: string;
  }
interface ErrorResponse {
  message: string;
}

export const useGetJobs = () => {
    return useQuery<Job[], Error>({
      queryKey: ["jobs"],
      queryFn: async () => {
        try {
          const response = await getAllJobs();
          if (Array.isArray(response.data)) {
            return response.data;
          }
          
          if (Array.isArray(response.data.data)) {
            return response.data.data; 
          }
          
          throw new Error("Invalid jobs data format");
        } catch (error) {
          throw new Error(
            "Failed to fetch jobs"
          );
        }
      },
    });
  };
  export const useGetRecommendedJobs = (jobSeekerId: string | undefined) => {
    return useQuery<Job[], Error>({
      queryKey: ["recommendedJobs", jobSeekerId],
      queryFn: async () => {
        if (!jobSeekerId) throw new Error("JobSeeker ID required");
        const response = await getRecommendedJobs(jobSeekerId);
        if (Array.isArray(response.data.data)) {
          return response.data.data;
        }
        if (Array.isArray(response.data)) {
          return response.data;
        }
        throw new Error("Invalid recommended jobs data format");
      },
      enabled: !!jobSeekerId,
    });
  };
  export const useCreateJob = () => {
    const queryClient = useQueryClient();
    
    return useMutation<Job, ErrorResponse, Job>({
      mutationKey: ["createJob"],
      mutationFn: async (jobData) => {
        try {
          const response = await createJobs(jobData);
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to create job");
          }
          throw new Error("Failed to create job");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
      },
    });
  };