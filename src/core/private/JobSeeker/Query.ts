import { useQuery } from "@tanstack/react-query";
import { getJobSeekerId } from "../../../Api";
export const useGetJobSeekerId = () => {
    return useQuery <string, Error>({
      queryKey: ["jobSeekerId"],
      queryFn: async () => {
        const response = await getJobSeekerId();
        return response.data.jobSeekerId; 
      },
    });
  };