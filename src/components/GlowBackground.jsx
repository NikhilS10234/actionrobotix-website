import { Box } from "@mui/material";
import { motion } from "framer-motion";

const GlowBackground = ({ variant = "hero" }) => (
  <Box
    aria-hidden
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      zIndex: 0,
      pointerEvents: "none",
    }}
  >
    <motion.div
      animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: variant === "hero" ? 560 : 360,
        height: variant === "hero" ? 560 : 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(47,125,255,0.35) 0%, rgba(47,125,255,0) 70%)",
        filter: "blur(10px)",
      }}
    />
    <motion.div
      animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        bottom: "-15%",
        right: "-10%",
        width: variant === "hero" ? 620 : 400,
        height: variant === "hero" ? 620 : 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,122,26,0.3) 0%, rgba(255,122,26,0) 70%)",
        filter: "blur(10px)",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
      }}
    />
  </Box>
);

export default GlowBackground;
