import { useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  threshold?: number;
}

const useInfiniteScroll = ({
  isLoading,
  onLoadMore,
  hasMore,
  threshold = 100,
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold &&
      !isLoading &&
      hasMore
    ) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading, hasMore, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};

export default useInfiniteScroll;
