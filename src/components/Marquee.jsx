import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Marquee = ({ items, duration = 26 }) => {
  const loopItems = [...items, ...items];

  return (
    <Box sx={{ overflow: "hidden", py: 2.5, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <motion.div
        style={{ display: "flex", width: "max-content", gap: "2.5rem" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {loopItems.map((item, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "2.5rem", flexShrink: 0 }}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                fontWeight: 700,
                color: "text.secondary",
                letterSpacing: 1,
              }}
            >
              {item}
            </Typography>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg, #2f7dff, #ff7a1a)", flexShrink: 0 }} />
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default Marquee;
