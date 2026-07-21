import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import GlowBackground from "./components/GlowBackground";
import PageTransition from "./components/PageTransition";
import usePageTitle from "./hooks/usePageTitle";

const NotFound = () => {
  const navigate = useNavigate();
  usePageTitle("Page Not Found");

  return (
    <PageTransition>
      <Box sx={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <GlowBackground variant="hero" />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <PrecisionManufacturingIcon sx={{ fontSize: 90, color: "primary.light", mb: 2 }} />
          </motion.div>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4.5rem", md: "7rem" },
              background: "linear-gradient(135deg, #6ba3ff 0%, #ff9c4d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            404
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, mb: 1.5 }}>
            Looks like this page missed the field.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            The page you're looking for doesn't exist — it may have been moved, renamed, or never built.
            Let's get you back on course.
          </Typography>
          <Button size="large" variant="contained" color="primary" startIcon={<HomeIcon />} onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default NotFound;
