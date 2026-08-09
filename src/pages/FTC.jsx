import { useState } from "react";
import { Box, Container, Grid2, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import PanToolIcon from "@mui/icons-material/PanTool";
import HeightIcon from "@mui/icons-material/Height";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import ShieldIcon from "@mui/icons-material/Shield";
import CampaignIcon from "@mui/icons-material/Campaign";
import ConstructionIcon from "@mui/icons-material/Construction";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import RobotScene from "../components/RobotScene";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const pillars = [
  { icon: <BuildIcon />, title: "Design & Build", desc: "CAD design, fabrication, and iteration on our competition robot each season." },
  { icon: <CodeIcon />, title: "Programming", desc: "Autonomous routines and driver-controlled systems built and tuned by our members." },
  { icon: <GroupsIcon />, title: "Strategy & Drive", desc: "Match strategy, alliance selection, and driver practice heading into competition." },
  { icon: <PrecisionManufacturingIcon />, title: "Engineering Notebook", desc: "Documenting our design process for judging and future seasons." },
];

const seasonPhases = [
  { icon: <CampaignIcon />, title: "Kickoff", desc: "A brand-new game challenge is revealed. We spend the first days studying the rules and brainstorming strategy." },
  { icon: <ConstructionIcon />, title: "Build Season", desc: "Weeks of prototyping, CAD design, fabrication, and programming as the robot comes together." },
  { icon: <SportsScoreIcon />, title: "Scrimmages", desc: "Practice matches against other teams to stress-test the robot and refine our driving before it counts." },
  { icon: <EmojiEventsIcon />, title: "Competition", desc: "Qualifying matches, judged interviews, and alliance selection at official FTC events." },
  { icon: <MilitaryTechIcon />, title: "Awards & Advancement", desc: "Top-performing teams earn awards and advance toward State and World Championships." },
];

const robotParts = [
  {
    icon: <SettingsIcon />,
    title: "Drivetrain",
    desc: "The wheels and motors that move the robot across the field. Most FTC teams choose between mecanum, tank, or swerve drivetrains depending on the strategy they want to run.",
  },
  {
    icon: <PanToolIcon />,
    title: "Intake",
    desc: "The mechanism that picks up game pieces — often built from rollers, claws, or belts, precisely tuned to grab elements quickly and reliably during a match.",
  },
  {
    icon: <HeightIcon />,
    title: "Lift / Arm",
    desc: "Raises and positions game pieces for scoring. Teams engineer these for speed, height, and stability, balancing weight against the robot's other systems.",
  },
  {
    icon: <MemoryIcon />,
    title: "Control Hub & Sensors",
    desc: "The 'brain' of the robot — running our code, reading input from sensors like encoders and distance sensors to make autonomous decisions on the field.",
  },
  {
    icon: <BatteryChargingFullIcon />,
    title: "Power System",
    desc: "The battery and wiring that keep every motor, sensor, and controller running reliably for a full match — and a full day of competition.",
  },
  {
    icon: <ShieldIcon />,
    title: "Bumpers",
    desc: "Required protective padding around the robot's base that absorbs contact with other robots and field walls, built to competition spec.",
  },
];

const FTC = () => {
  const navigate = useNavigate();
  const [activePart, setActivePart] = useState(0);
  usePageTitle("FTC — Team 25779");

  return (
    <PageTransition>
      <PageHero eyebrow="FIRST TECH CHALLENGE" title="Team 25779 — Action Robotix" subtitle="Grades 7–12 · Chesterfield, Missouri · DECODE 2025–26 Season" />

      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box
                  component="img"
                  src="Images/ftcRobot.jpeg"
                  alt="Action Robotix FTC robot"
                  sx={{ width: "100%", borderRadius: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
                />
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Chip label="TEAM 25779" sx={{ mb: 2, fontWeight: 700, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light" }} />
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Our Home Program
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  FTC teams design, build, and program robots to compete head-to-head on a 12×12 field.
                  This level encourages creativity and innovation, as students use various materials and
                  advanced programming tools to bring their robot to life.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                  As Team 25779, this is where Action Robotix competes each season. In our second season —
                  DECODE (2025–26) — our robot Catalyst earned the 1st Inspire Award and a Winning Alliance
                  at the Eastern Missouri Super Qualifier, took the 1st Sustain Award at both the League
                  Tournament and the MO/KS State Championship, and qualified for the Chicago Robotics
                  Invitational (CRI).
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/aboutus")}>
                  Meet Our Team
                </Button>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                HOW WE COMPETE
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                What Goes Into a Season
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {pillars.map((p, i) => (
              <Grid2 key={p.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%", textAlign: "center" }}>
                    <Box sx={{ color: "primary.light", mb: 1.5 }}>{p.icon}</Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* SEASON ROADMAP */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                THE SEASON, START TO FINISH
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Our Season Roadmap
              </Typography>
            </Box>
          </Reveal>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: { xs: 0, md: 28 },
                bottom: { xs: 0, md: "auto" },
                left: { xs: 19, md: 0 },
                right: { xs: "auto", md: 0 },
                width: { xs: 2, md: "100%" },
                height: { xs: "auto", md: 2 },
                bgcolor: "rgba(255,255,255,0.1)",
              }}
            />
            <Grid2 container spacing={{ xs: 0, md: 3 }}>
              {seasonPhases.map((phase, i) => (
                <Grid2 key={phase.title} size={{ xs: 12, md: 12 / seasonPhases.length }}>
                  <Reveal delay={i * 0.1}>
                    <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, alignItems: { xs: "flex-start", md: "center" }, gap: { xs: 2.5, md: 0 }, textAlign: { xs: "left", md: "center" }, pb: { xs: 4, md: 0 } }}>
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          flexShrink: 0,
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                          mb: { xs: 0, md: 2 },
                        }}
                      >
                        {phase.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {phase.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {phase.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Reveal>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Container>
      </Box>

      {/* ANATOMY OF AN FTC ROBOT */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                UNDER THE HOOD
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Anatomy of an FTC Robot
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 560, mx: "auto", mt: 1.5 }}>
                Click a system below — the 3D model reacts, and its wheels spin, arm lifts, and claw opens
                right along with it.
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Grid2 container spacing={1.5}>
                {robotParts.map((part, i) => (
                  <Grid2 key={part.title} size={{ xs: 6, sm: 4, md: 12 }}>
                    <Box
                      onClick={() => setActivePart(i)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1.8,
                        borderRadius: 3,
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: activePart === i ? "primary.main" : "rgba(255,255,255,0.08)",
                        bgcolor: activePart === i ? "rgba(47,125,255,0.12)" : "transparent",
                        transition: "all 0.25s ease",
                        "&:hover": { borderColor: "primary.main" },
                      }}
                    >
                      <Box sx={{ color: activePart === i ? "primary.light" : "text.secondary" }}>{part.icon}</Box>
                      <Typography sx={{ fontWeight: activePart === i ? 700 : 500 }}>{part.title}</Typography>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <RobotScene activePart={activePart} height={380} />
              <Box sx={{ ...glassCardSx, p: { xs: 3, md: 4 }, mt: 3 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePart}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                      <Box sx={{ color: "secondary.main", fontSize: 34, display: "flex", flexShrink: 0 }}>{robotParts[activePart].icon}</Box>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {robotParts[activePart].title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {robotParts[activePart].desc}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Grid2>
          </Grid2>
          <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.secondary", mt: 3 }}>
            Illustrative 3D model — a stylized look at how these systems fit together, not our exact competition robot.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box
              sx={{
                textAlign: "center",
                p: { xs: 4, md: 6 },
                borderRadius: 6,
                background: "linear-gradient(135deg, rgba(47,125,255,0.16) 0%, rgba(255,122,26,0.16) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>
                Follow Our Season
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
                Want match updates, build photos, and season highlights? Follow Team 25779 on social media,
                or help fuel our season with a donation.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="contained" color="secondary" endIcon={<FavoriteIcon />} onClick={() => navigate("/supportus")}>
                  Support the Team
                </Button>
                <Button variant="outlined" color="primary" onClick={() => navigate("/contactus")}>
                  Get In Touch
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default FTC;
