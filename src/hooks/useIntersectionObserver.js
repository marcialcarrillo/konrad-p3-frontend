import { useEffect, useState, useMemo } from "react";
const useIntersectionObserver = (element) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }),
    []
  );
  useEffect(() => {
    observer.observe(element.current);
    return () => observer.disconnect();
  }, [element]);
  return isIntersecting;
};
export default useIntersectionObserver;
