import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import GlowBackground from "./GlowBackground";

const PageHero = ({ eyebrow, title, subtitle }) => (
  <Box sx={{ position: "relative", pt: { xs: 16, md: 20 }, pb: { xs: 8, md: 10 }, overflow: "hidden" }}>
    <GlowBackground variant="page" />
    <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              letterSpacing: 3,
              fontWeight: 700,
              display: "inline-block",
              mb: 1.5,
            }}
          >
            {eyebrow}
          </Typography>
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, mb: 2 }}>
          {title}
        </Typography>
      </motion.div>
      {subtitle && (
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, maxWidth: 640, mx: "auto" }}>
            {subtitle}
          </Typography>
        </motion.div>
      )}
    </Container>
  </Box>
);

export default PageHero;
