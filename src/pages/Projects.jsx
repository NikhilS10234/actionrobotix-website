import { useState } from "react";
import { Box, Container, Grid2, Typography, Modal, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const projects = [
  {
    title: "PFAS Sentinel",
    tag: "SUSTAINABILITY",
    img: "Images/pfasRevivePortfolio.jpg",
    desc:
      "Students in rural Ghana reported unsafe water and frequent illness, with no affordable way to test for contamination. We built a $20 smart PFAS filter with optical sensing and mobile alerts using a Yoon-Nelson logistic breakthrough model — reaching 97.4% accuracy with alerts sent in about 2.4 seconds, restoring over 95% of filter capacity, and reducing waste by up to 90%. It's a fully functioning prototype with sensors and filter system built in.",
  },
  {
    title: "REVIVE-SCI",
    tag: "HEALTHCARE",
    img: "Images/pfasRevivePortfolio.jpg",
    desc:
      "Spinal cord injury hinders independent standing and gait for 15+ million people worldwide, and existing FES systems rely on unreliable signals from the same paralyzed muscle. REVIVE-SCI is an adaptive, electrode-based FES system that bypasses the spinal lesion entirely by rerouting EMG signals from a preserved region to an impaired one. We visited the Rehabilitation Institute of St. Louis and surveyed 42 spinal cord injury support group patients — 78% named walking as their greatest challenge, 54% were dissatisfied with current devices — and presented our proposal to a panel of 8 WashU professors, physicians, and clinicians.",
  },
  {
    title: "ActiStrap",
    tag: "PRODUCT DESIGN",
    img: "Images/actiStrap.jpg",
    desc:
      "A cutting-edge measuring device for shoe wearers and companies, ensuring accurate size estimates for a perfect fit. This project earned us a board meeting with Fortune 500 officials.",
  },
  {
    title: "Top Tennis",
    tag: "SPORTS TECH",
    img: "Images/TopTennisPic.png",
    desc:
      "An indoor tennis simulator that combines a ball machine with simulation projection, allowing players to enhance their skills anytime and anywhere.",
  },
  {
    title: "Road Turbine",
    tag: "CLEAN ENERGY",
    img: "Images/roadTurbine.jpg",
    desc:
      "A solution to harness the kinetic energy of vehicles moving on the road and convert it into usable electricity.",
  },
];

const Projects = () => {
  const [active, setActive] = useState(null);
  usePageTitle("Projects");

  return (
    <PageTransition>
      <PageHero
        eyebrow="ENGINEERING BEYOND THE FIELD"
        title="Our Projects"
        subtitle="Real-world solutions our team has envisioned, designed, and made practical — emphasizing efficiency, feasibility, and impact."
      />

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid2 container spacing={4}>
            {projects.map((p, i) => (
              <Grid2 key={p.title} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    <Box
                      onClick={() => setActive(p)}
                      sx={{ ...glassCardSx, overflow: "hidden", cursor: "pointer", height: "100%" }}
                    >
                      <Box sx={{ height: 220, overflow: "hidden" }}>
                        <Box
                          component="img"
                          src={p.img}
                          alt={p.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            "&:hover": { transform: "scale(1.08)" },
                          }}
                        />
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <Chip label={p.tag} size="small" sx={{ mb: 1.5, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }} />
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {p.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {p.desc.slice(0, 90)}…
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} closeAfterTransition>
        <AnimatePresence>
          {active && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                style={{ width: "100%", maxWidth: 640 }}
              >
                <Box sx={{ bgcolor: "background.paper", borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Box sx={{ position: "relative" }}>
                    <Box component="img" src={active.img} alt={active.title} sx={{ width: "100%", maxHeight: 360, objectFit: "cover", display: "block" }} />
                    <IconButton
                      onClick={() => setActive(null)}
                      sx={{ position: "absolute", top: 12, right: 12, bgcolor: "rgba(10,14,23,0.6)", color: "#fff" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ p: 4 }}>
                    <Chip label={active.tag} size="small" sx={{ mb: 1.5, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }} />
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      {active.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {active.desc}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </PageTransition>
  );
};

export default Projects;
