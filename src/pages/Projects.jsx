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
    title: "Inspire Award — 1st Place",
    tag: "FTC ACHIEVEMENT",
    img: "Images/SuperQualsPic.webp",
    desc:
      "Our team took home 1st place in the Inspire Award — FIRST's highest honor — at the Eastern Missouri Super Qualifier, recognizing our robot performance, outreach, and team culture together.",
  },
  {
    title: "Chicago Robotics Invitational",
    tag: "FTC COMPETITION",
    img: "Images/CRIPic.webp",
    desc:
      "After qualifying at the MO/KS State Championship, we traveled to compete at the Chicago Robotics Invitational against some of the best FTC teams in the country.",
  },
  {
    title: "Catalyst 2.0 in the Pits",
    tag: "FTC ROBOT",
    img: "Images/PitPic.webp",
    desc:
      "Our third robot iteration of the season — built, tested, and iterated on throughout league play, superqualifiers, states, and CRI.",
  },
];

const Projects = () => {
  const [active, setActive] = useState(null);
  usePageTitle("Projects");

  return (
    <PageTransition>
      <PageHero
        eyebrow="ON THE FIELD"
        title="FTC Season Highlights"
        subtitle="Moments from our 2025–26 DECODE season — from the Inspire Award to the Chicago Robotics Invitational."
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
