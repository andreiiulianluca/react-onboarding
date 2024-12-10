import { useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

const useInfiniteScroll = ({
  isLoading,
  onLoadMore,
  threshold = 100,
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold &&
      !isLoading
    ) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

export default useInfiniteScroll;
