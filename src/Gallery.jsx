import { useEffect, useMemo, useState } from "react";
import { Box, Container, Typography, Chip, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "./components/PageHero";
import Reveal from "./components/Reveal";
import PageTransition from "./components/PageTransition";
import { sectionSx } from "./components/styles";
import usePageTitle from "./hooks/usePageTitle";

const images = [
  { src: "Images/ftcComp.jpg", alt: "Action Robotix at FTC competition", category: "Competitions" },
  { src: "Images/RandomRobotInAction.jpg", alt: "Robot in action", category: "Robots" },
  { src: "Images/AR-Regional-Championship-2024.jpg", alt: "Regional Championship 2024", category: "Competitions" },
  { src: "Images/sunshineInvational.jpg", alt: "Sunshine Invitational Championship", category: "Competitions" },
  { src: "Images/coding-cheetahs.jpg", alt: "Champions Award", category: "Competitions" },
  { src: "Images/houston.jpg", alt: "FLL Robotics World Championship, Houston", category: "Competitions" },
  { src: "Images/ftcRobot.jpeg", alt: "Our FTC robot", category: "Robots" },
  { src: "Images/frcPicture.jpeg", alt: "FIRST Robotics Competition", category: "Robots" },
  { src: "Images/fllPicture.avif", alt: "FIRST LEGO League", category: "Robots" },
  { src: "Images/FLLMentor.jpeg", alt: "Mentoring an FLL team", category: "Outreach" },
  { src: "Images/magichouseevent.jpg", alt: "Magic House community event", category: "Outreach" },
  { src: "Images/actiStrap.jpg", alt: "ActiStrap project", category: "Projects" },
  { src: "Images/TopTennisPic.png", alt: "Top Tennis project", category: "Projects" },
  { src: "Images/roadTurbine.jpg", alt: "Road Turbine project", category: "Projects" },
  { src: "Images/arnavA.png", alt: "Arnav A — Design", category: "Team" },
  { src: "Images/keshav.png", alt: "Keshav — Design", category: "Team" },
  { src: "Images/arnavM.png", alt: "Arnav M — Build", category: "Team" },
  { src: "Images/mihir.png", alt: "Mihir — Build", category: "Team" },
  { src: "Images/Naisha.png", alt: "Naisha — Build", category: "Team" },
  { src: "Images/arjun.png", alt: "Arjun — Build", category: "Team" },
  { src: "Images/ashvik.png", alt: "Ashvik — Build", category: "Team" },
  { src: "Images/adi.png", alt: "Adi — Programming", category: "Team" },
  { src: "Images/vihaan.png", alt: "Vihaan — Programming", category: "Team" },
  { src: "Images/ayush.png", alt: "Ayush — Programming", category: "Team" },
  { src: "Images/ishaan.png", alt: "Ishaan — Outreach", category: "Team" },
  { src: "Images/nikhil.jpeg", alt: "Nikhil — Outreach", category: "Team" },
];

const categories = ["All", "Competitions", "Robots", "Outreach", "Projects", "Team"];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);
  usePageTitle("Gallery");

  const filtered = useMemo(
    () => (filter === "All" ? images : images.filter((img) => img.category === filter)),
    [filter]
  );

  const closeLightbox = () => setActiveIndex(null);
  const showNext = () => setActiveIndex((i) => (i + 1) % filtered.length);
  const showPrev = () => setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, filtered.length]);

  return (
    <PageTransition>
      <PageHero
        eyebrow="MOMENTS FROM THE FIELD"
        title="Gallery"
        subtitle="Competitions, robots, outreach, and the team behind them — a look at Action Robotix in action."
      />

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap", justifyContent: "center", mb: 5 }}>
              {categories.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  onClick={() => setFilter(c)}
                  sx={{
                    fontWeight: 600,
                    px: 1,
                    bgcolor: filter === c ? "primary.main" : "rgba(255,255,255,0.06)",
                    color: filter === c ? "#fff" : "text.secondary",
                    border: "1px solid",
                    borderColor: filter === c ? "primary.main" : "rgba(255,255,255,0.1)",
                    "&:hover": { bgcolor: filter === c ? "primary.dark" : "rgba(255,255,255,0.1)" },
                  }}
                />
              ))}
            </Box>
          </Reveal>

          <Box
            sx={{
              columnCount: { xs: 2, sm: 3, md: 4 },
              columnGap: 16,
            }}
          >
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
                  style={{ breakInside: "avoid", marginBottom: 16 }}
                >
                  <Box
                    onClick={() => setActiveIndex(i)}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.08)",
                      "&:hover img": { transform: "scale(1.06)" },
                    }}
                  >
                    <Box
                      component="img"
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      sx={{ width: "100%", display: "block", transition: "transform 0.4s ease" }}
                    />
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Container>
      </Box>

      <Modal open={activeIndex !== null} onClose={closeLightbox} closeAfterTransition>
        <AnimatePresence>
          {activeIndex !== null && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                bgcolor: "rgba(0,0,0,0.6)",
              }}
              onClick={closeLightbox}
            >
              <IconButton onClick={closeLightbox} sx={{ position: "fixed", top: 20, right: 20, color: "#fff" }}>
                <CloseIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                sx={{ position: "fixed", left: { xs: 8, md: 32 }, color: "#fff" }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "88vw", maxHeight: "84vh" }}
              >
                <Box
                  component="img"
                  src={filtered[activeIndex].src}
                  alt={filtered[activeIndex].alt}
                  sx={{ maxWidth: "88vw", maxHeight: "78vh", borderRadius: 2, display: "block", mx: "auto" }}
                />
                <Typography sx={{ color: "#fff", textAlign: "center", mt: 2 }}>{filtered[activeIndex].alt}</Typography>
              </motion.div>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                sx={{ position: "fixed", right: { xs: 8, md: 32 }, color: "#fff" }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </PageTransition>
  );
};

export default Gallery;
