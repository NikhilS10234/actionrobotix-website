import { useRef } from "react";
import { Box, Button, Container, Grid2, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SchoolIcon from "@mui/icons-material/School";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GlowBackground from "../components/GlowBackground";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import TiltCard from "../components/TiltCard";
import Marquee from "../components/Marquee";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const marqueeItems = [
  "FOUNDED 2024",
  "FTC TEAM 25779",
  "CHESTERFIELD, MISSOURI",
  "DECODE 2025–26",
  "EVERY ACTION NEEDS A CATALYST",
  "STUDENT-LED",
];

const seasonHighlights = [
  { event: "STL MID League Tournament", award: "1st — Sustain Award", detail: "101.17 point average with our robot Inhibitor" },
  { event: "EMO Super Qualifier", award: "1st — Inspire Award + Winning Alliance", detail: "135.5 point average with Catalyst" },
  { event: "MO/KS State Championship", award: "1st — Sustain Award", detail: "8th in Advancement Points — qualified for CRI" },
];

const programs = [
  {
    icon: <SchoolIcon fontSize="large" />,
    title: "FIRST LEGO League",
    desc: "We've started or mentored 18 FLL teams, guiding younger students through their first taste of robotics and STEM.",
    path: "/fll",
  },
  {
    icon: <PrecisionManufacturingIcon fontSize="large" />,
    title: "FIRST Tech Challenge",
    desc: "Our home program — Team 25779 designs, builds, and codes a competition robot each season. This year's: Catalyst.",
    path: "/ftc",
  },
  {
    icon: <EmojiObjectsIcon fontSize="large" />,
    title: "FIRST Robotics Competition",
    desc: "The pinnacle of the FIRST pathway — learn what's next as our members grow into FRC-level engineering.",
    path: "/frc",
  },
];

const heroImages = [
  "Images/SuperQualsPic.webp",
  "Images/CRIPic.webp",
  "Images/PitPic.webp",
];

const MainApp = () => {
  const navigate = useNavigate();
  usePageTitle();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tiltX = useMotionValue(0.5);
  const tiltY = useMotionValue(0.5);
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 18 });
  const collageRotateY = useTransform(springTiltX, [0, 1], [-8, 8]);
  const collageRotateX = useTransform(springTiltY, [0, 1], [8, -8]);

  const handleCollageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width);
    tiltY.set((e.clientY - rect.top) / rect.height);
  };
  const handleCollageMouseLeave = () => {
    tiltX.set(0.5);
    tiltY.set(0.5);
  };

  return (
    <PageTransition>
      {/* HERO */}
      <Box ref={heroRef} sx={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <motion.div style={{ y: heroBgY, position: "absolute", inset: 0 }}>
          <GlowBackground variant="hero" />
        </motion.div>
        <motion.div style={{ y: heroContentY, opacity: heroFade, position: "relative", zIndex: 1, width: "100%" }}>
        <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 10 } }}>
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 7 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Chip
                  label="FTC TEAM 25779 · CHESTERFIELD, MO"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    letterSpacing: 1,
                    bgcolor: "rgba(47,125,255,0.12)",
                    color: "primary.light",
                    border: "1px solid rgba(47,125,255,0.35)",
                  }}
                />
              </motion.div>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" }, lineHeight: 1.1, mb: 2 }}>
                <Box component="span" sx={{ display: "block" }}>
                  Action Robotix
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background: "linear-gradient(135deg, #6ba3ff 0%, #ff9c4d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <TypeAnimation
                    sequence={[
                      "Missouri Proud",
                      1800,
                      "Made in STL",
                      1800,
                      "Powered by Catalyst",
                      1800,
                      "Ready for DECODE",
                      1800,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, maxWidth: 560, mb: 4 }}>
                An entirely student-led robotics team designing cutting-edge robotics solutions and fostering
                a passion for STEM in our community — welcoming everyone, from aspiring engineers to artists.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/aboutus")}
                >
                  Meet the Team
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  endIcon={<FavoriteIcon />}
                  onClick={() => navigate("/supportus")}
                >
                  Support Us
                </Button>
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
              <motion.div
                onMouseMove={handleCollageMouseMove}
                onMouseLeave={handleCollageMouseLeave}
                style={{
                  position: "relative",
                  height: "100%",
                  rotateX: collageRotateX,
                  rotateY: collageRotateY,
                  transformPerspective: 1000,
                }}
              >
              <Box sx={{ position: "relative", height: { xs: 420, md: 560 } }}>
                {heroImages.map((img, i) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: [0, -2, 2, 0][i % 4] }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    style={{
                      position: "absolute",
                      top: `${8 + i * 16}%`,
                      left: `${i * 13}%`,
                      width: "76%",
                      borderRadius: 20,
                      overflow: "hidden",
                      border: "4px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
                      cursor: "pointer",
                    }}
                  >
                    <Box component="img" src={img} alt="Action Robotix in action" sx={{ width: "100%", display: "block" }} />
                  </motion.div>
                ))}
              </Box>
              </motion.div>
            </Grid2>
          </Grid2>
        </Container>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }}
        >
          <KeyboardArrowDownIcon sx={{ color: "text.secondary", fontSize: 32 }} />
        </motion.div>
      </Box>

      <Marquee items={marqueeItems} />

      {/* ABOUT TEASER */}
      <Box sx={{ ...sectionSx, py: { xs: 6, md: 8 }, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                ABOUT US
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
                FTC Team 25779, Chesterfield, Missouri
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mx: "auto", mb: 3 }}>
                An entirely student-led robotics team building competition robots and bringing STEM to our
                community since 2024.
              </Typography>
              <Button variant="outlined" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => navigate("/aboutus")}>
                Learn More About Us
              </Button>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* SEASON HIGHLIGHTS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                DECODE 2025–26
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                This Season So Far
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {seasonHighlights.map((h, i) => (
              <Grid2 key={h.event} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3.5, height: "100%", textAlign: "center" }}>
                    <EmojiEventsIcon sx={{ color: "secondary.main", fontSize: 34, mb: 1.5 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {h.event}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "secondary.light", mb: 0.5 }}>
                      {h.award}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {h.detail}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="outlined" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => navigate("/robot")}>
              Meet Catalyst, Our Robot
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ABOUT PREVIEW */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box
                  component="img"
                  src="Images/ftcComp.jpg"
                  alt="Action Robotix at competition"
                  sx={{ width: "100%", borderRadius: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
                />
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                  WHO WE ARE
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
                  Teamwork, creativity, and a passion for STEM.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                  Founded in 2024 and now in our second season, Action Robotix is entirely student-led —
                  captains and division leads run four subteams (Design, Build, Programming, Outreach), backed
                  by an extensive mentor network of industry professionals, university professors, and fellow
                  FIRST members.
                </Typography>
                <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} onClick={() => navigate("/aboutus")}>
                  Learn More About Us
                </Button>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* PROGRAMS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                THE FIRST PATHWAY
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Our Programs
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4}>
            {programs.map((p, i) => (
              <Grid2 key={p.title} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <TiltCard onClick={() => navigate(p.path)} sx={{ height: "100%" }} max={8}>
                    <Box
                      sx={{ ...glassCardSx, p: 4, height: "100%", cursor: "pointer", textAlign: "center" }}
                    >
                      <Box sx={{ color: "primary.light", mb: 2 }}>{p.icon}</Box>
                      <Typography variant="h6" sx={{ mb: 1.5 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {p.desc}
                      </Typography>
                    </Box>
                  </TiltCard>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* SUPPORT CTA */}
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box
              sx={{
                textAlign: "center",
                p: { xs: 4, md: 7 },
                borderRadius: 6,
                background: "linear-gradient(135deg, rgba(47,125,255,0.16) 0%, rgba(255,122,26,0.16) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>
                Help Us Reach the Next Level
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 560, mx: "auto" }}>
                Parts, registration, and travel add up fast. Every contribution — big or small — helps us
                compete, build, and keep bringing robotics to our community.
              </Typography>
              <Button size="large" variant="contained" color="secondary" endIcon={<FavoriteIcon />} onClick={() => navigate("/supportus")}>
                Donate Now
              </Button>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default MainApp;
