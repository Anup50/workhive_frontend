import { useCallback, useEffect, useState } from "react";
import { checkIfBookmarked, createBookmark, deleteBookmark } from "../../Api";

export default function useBookmark(jobId: string, jobSeekerId: string | null) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!jobSeekerId) {
      setIsLoading(false);
      return;
    }
    const fetchBookmarkStatus = async () => {
      try {
        const response = await checkIfBookmarked(jobId, jobSeekerId);
        setIsBookmarked(response.data.bookmarked);
      } catch (error) {
        console.error("Error checking bookmark:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookmarkStatus();
  }, [jobId, jobSeekerId]);

  const toggleBookmark = useCallback(async () => {
    if (!jobSeekerId) return;
    const previousState = isBookmarked;
    setIsBookmarked(!previousState); // Optimistic update

    try {
      if (previousState) {
        await deleteBookmark(jobId, jobSeekerId);
      } else {
        await createBookmark({ jobId, jobSeekerId });
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      setIsBookmarked(previousState); // Rollback on error
    }
  }, [jobId, jobSeekerId, isBookmarked]);

  return { isBookmarked, isLoading, toggleBookmark };
}
