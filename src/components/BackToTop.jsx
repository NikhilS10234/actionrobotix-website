import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25 }}
          style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1200 }}
        >
          <IconButton
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              width: 48,
              height: 48,
              boxShadow: "0 10px 30px rgba(47,125,255,0.5)",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
