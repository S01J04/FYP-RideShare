import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top on route change
  }, [pathname]); // Runs when the path changes

  return null;
};

export default ScrollToTop;
