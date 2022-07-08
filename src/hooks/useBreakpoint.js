import { useState, useEffect } from "react";

export const useBreakpoint = () => {
  let [breakPointData, setBreakPointData] = useState(null);

  useEffect(() => {
    const determineBreakpoint = (width) => {
      let breakpoint;
      if (width <= 768) {
        breakpoint = "sm";
      } else if (width <= 992) {
        breakpoint = "md";
      } else if (width <= 1200) {
        breakpoint = "lg";
      } else {
        breakpoint = "xl";
      }
      return breakpoint;
    };

    const bp = () => {
      let newBreakPoint = determineBreakpoint(window.innerWidth);
      if (breakPointData !== newBreakPoint) {
        setBreakPointData(newBreakPoint);
      }
    };

    window.addEventListener("resize", bp);

    return () => {
      window.removeEventListener("resize", bp);
    };
  }, [breakPointData]);

  return { breakPointData };
};
