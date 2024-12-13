import { useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  hasNextPage?: boolean;
}

const useInfiniteScroll = ({
  isLoading,
  onLoadMore,
  threshold = 100,
  hasNextPage,
}: UseInfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold &&
      !isLoading &&
      !hasNextPage
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
