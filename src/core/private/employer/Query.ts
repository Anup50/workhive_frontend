import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext"; /

export const useGetEmployerId = () => {
  const { token } = useAuth();

  return useQuery<string, Error>({
    queryKey: ["employerId"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("/api/employer/getEmployerId", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.employerId) {
        throw new Error("Employer ID not found in response");
      }

      return response.data.employerId;
    },
    enabled: !!token, // Only fetch if token exists
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    retry: 1, // Retry once if the request fails
  });
};