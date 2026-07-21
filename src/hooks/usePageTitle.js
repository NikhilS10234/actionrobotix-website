import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | Action Robotix` : "Action Robotix | FTC Team 25779";
    return () => {
      document.title = previous;
    };
  }, [title]);
};

export default usePageTitle;
