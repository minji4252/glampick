import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      if (!pathname.startsWith("/places")) {
        window.scrollTo(0, 0);
      }
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
