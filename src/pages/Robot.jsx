import { useState } from "react";
import {
  Box,
  Container,
  Grid2,
  Typography,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ConveyorBeltIcon from "@mui/icons-material/Input";
import SettingsIcon from "@mui/icons-material/Settings";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PanToolIcon from "@mui/icons-material/PanTool";
import CableIcon from "@mui/icons-material/Cable";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryIcon from "@mui/icons-material/History";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import RobotScene from "../components/RobotScene";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const evolution = [
  {
    name: "Basic Robot",
    desc: "A modified GoBilda starter bot with mecanum wheels and an adjustable hood — no intake, so it played as a human-player-only bot. Built quickly to get us competing at our first two meets.",
  },
  {
    name: "Inhibitor",
    desc: "A custom-designed wooden robot optimized for high-speed, high-arc shooting with an integrated intake. The shooter was reliable, but its range was limited and the transfer mechanism needed further refinement.",
  },
  {
    name: "Catalyst 1.0",
    desc: "A metal exoskeleton chassis, an integrated intake and transfer system, and a rotating hooded turret capable of far-zone shots — the robot that won us the Inspire Award and a Winning Alliance at the Super Qualifier.",
  },
  {
    name: "Catalyst 2.0",
    desc: "A refined version of Catalyst, built to be faster, more reliable, and simpler to maintain. The version we took to the MO/KS State Championship and the Chicago Robotics Invitational.",
  },
];

const subsystems = [
  {
    icon: <ConveyorBeltIcon />,
    title: "Intake",
    desc: "A multi-stage active intake with a compliance mechanism keeps artifacts controlled from pickup through transfer.",
  },
  {
    icon: <SettingsIcon />,
    title: "Chassis",
    desc: "A lightweight custom exoskeleton with a square footprint that makes full parking easy, with passive side ramps guiding artifacts into the robot.",
  },
  {
    icon: <TrackChangesIcon />,
    title: "Shooter / Turret",
    desc: "A flywheel shooter mounted on a rotating turret with an adjustable hood, built for consistent shots from anywhere on the field.",
  },
  {
    icon: <VisibilityIcon />,
    title: "Vision & Localization",
    desc: "A Limelight vision sensor rotates with the turret and reads AprilTags, working alongside odometry to track the robot's position on the field.",
  },
  {
    icon: <PanToolIcon />,
    title: "Stopper",
    desc: "A servo-driven stopper retains and releases artifacts on demand — the last checkpoint between the transfer and the flywheel.",
  },
  {
    icon: <CableIcon />,
    title: "Wiring",
    desc: "Careful cable management keeps the turret's wiring protected and serviceable between matches.",
  },
];

const designSteps = [
  { title: "Discuss & Brainstorm", desc: "The whole team talks through the game and generates ideas." },
  { title: "Sketch, Eliminate & Model", desc: "Rough concepts get sketched, weak ideas get cut, and the best get modeled." },
  { title: "Design on CAD", desc: "Primarily Fusion 360, with some Onshape and Shapr3D." },
  { title: "Assemble", desc: "Design and build teams collaborate to bring the CAD to life." },
  { title: "Evaluate", desc: "Programming tests the result and compares it against the original goals." },
  { title: "Iterate", desc: "Repeat the cycle after every competition." },
];

const programmingHighlights = [
  { title: "SolversLib", desc: "FTC Java library powering subsystem control, autonomous motor/servo control, and PedroPathing integration." },
  { title: "Custom Finite State Machine", desc: "Non-blocking, event-driven control of robot motion, scoring, and timing." },
  { title: "Custom Autonomous Pathing", desc: "Smooth, curvature-continuous autonomous paths tuned specifically for our robot." },
  { title: "PIDF Flywheel Control", desc: "Keeps shot power consistent no matter the battery or match conditions." },
  { title: "Auto-Aiming Turret & Hood", desc: "Combines odometry with Limelight AprilTag correction to aim automatically." },
  { title: "Robot-Centric Mecanum Drive", desc: "TeleOp driving without field-centric latency." },
];

const problemsSolved = [
  { problem: "Joystick-based shooter power was inconsistent", fix: "Fixed with PIDF flywheel control" },
  { problem: "Hood angling caused missed shots", fix: "Fixed with auto-aim" },
  { problem: "Autonomous paths drifted", fix: "Fixed with PedroPathing tuning" },
  { problem: "Pinpoint wheels skipped during matches", fix: "Fixed with a Limelight failsafe" },
];

const strategy = [
  {
    phase: "Autonomous",
    goal: "12-ball close auto or 9-ball far auto — shoot 3 preloaded artifacts, cycle from the spike marks, and park for points.",
  },
  {
    phase: "TeleOp",
    goal: "6 cycles / 54 balls total — cycle artifacts continuously, occasionally opening the gate to play offense.",
  },
  {
    phase: "Endgame",
    goal: "Motif matching plus a full park — and defense in the final stretch.",
  },
];

const scoreProgression = [
  { phase: "Auto", scores: [12, 25, 33, 36], target: 36 },
  { phase: "TeleOp", scores: [21, 39, 78, 105], target: 105 },
  { phase: "Endgame", scores: [16, 22, 27, 41], target: 41 },
];

const results = [
  { event: "League Tournament", robot: "Inhibitor", result: "1st — Sustain Award", avg: "101.17" },
  { event: "Eastern Missouri Super Qualifier", robot: "Catalyst", result: "1st — Inspire Award + Winning Alliance", avg: "135.5" },
  { event: "MO/KS State Championship", robot: "Catalyst V2", result: "1st — Sustain Award · 8th in Advancement Points · Qualified for CRI", avg: "Goal was 200" },
  { event: "Chicago Robotics Invitational", robot: "Catalyst 2.0", result: "Qualified & Competed", avg: "vs. top teams nationwide" },
];

const Robot = () => {
  const navigate = useNavigate();
  const [activeSub, setActiveSub] = useState(0);
  usePageTitle("Catalyst — Our Robot");

  return (
    <PageTransition>
      <PageHero
        eyebrow="EVERY ACTION NEEDS A CATALYST"
        title="Meet Catalyst"
        subtitle="Our DECODE (2025–26) competition robot — the third and strongest machine in a season of relentless iteration."
      />

      {/* EVOLUTION */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                THREE ROBOTS, ONE SEASON
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                The Evolution
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {evolution.map((r, i) => (
              <Grid2 key={r.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%" }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        color: "#fff",
                        background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                        mb: 2,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {r.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {r.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* SUBSYSTEMS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                UNDER THE HOOD
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Catalyst's Subsystems
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 560, mx: "auto", mt: 1.5 }}>
                Select a subsystem to see how it's engineered.
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Grid2 container spacing={1.5}>
                {subsystems.map((s, i) => (
                  <Grid2 key={s.title} size={{ xs: 6, sm: 4, md: 12 }}>
                    <Box
                      onClick={() => setActiveSub(i)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1.8,
                        borderRadius: 3,
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: activeSub === i ? "primary.main" : "rgba(255,255,255,0.08)",
                        bgcolor: activeSub === i ? "rgba(47,125,255,0.12)" : "transparent",
                        transition: "all 0.25s ease",
                        "&:hover": { borderColor: "primary.main" },
                      }}
                    >
                      <Box sx={{ color: activeSub === i ? "primary.light" : "text.secondary" }}>{s.icon}</Box>
                      <Typography sx={{ fontWeight: activeSub === i ? 700 : 500 }}>{s.title}</Typography>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Box sx={{ ...glassCardSx, p: { xs: 3, md: 5 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 260 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSub}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box sx={{ color: "secondary.main", mb: 2, display: "flex" }}>{subsystems[activeSub].icon}</Box>
                    <Typography variant="h5" sx={{ mb: 1.5 }}>
                      {subsystems[activeSub].title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {subsystems[activeSub].desc}
                    </Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* DESIGN PROCESS */}
      <Box sx={sectionSx}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                HOW WE ENGINEER
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Our 6-Step Design Cycle
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={2.5}>
            {designSteps.map((s, i) => (
              <Grid2 key={s.title} size={{ xs: 12, sm: 6 }}>
                <Reveal delay={i * 0.07}>
                  <Box sx={{ ...glassCardSx, p: 2.5, display: "flex", gap: 2, alignItems: "flex-start", height: "100%" }}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        color: "#fff",
                        background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {s.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {s.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* PROGRAMMING */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                THE CODE BEHIND CATALYST
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Programming Highlights
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {programmingHighlights.map((p, i) => (
              <Grid2 key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={(i % 3) * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "primary.light" }}>
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

          <Reveal>
            <Box sx={{ ...glassCardSx, p: { xs: 3, md: 4 }, mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Real Problems We Solved This Season
              </Typography>
              <Grid2 container spacing={2}>
                {problemsSolved.map((p) => (
                  <Grid2 key={p.problem} size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
                        {p.problem}
                      </Box>{" "}
                      → {p.fix}
                    </Typography>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* GAME STRATEGY */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                DECODE GAME PLAN
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Match Strategy
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3} sx={{ mb: 5 }}>
            {strategy.map((s, i) => (
              <Grid2 key={s.phase} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3.5, height: "100%", textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 1.5, color: "primary.light" }}>
                      {s.phase}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {s.goal}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>

          <Reveal>
            <Box sx={{ ...glassCardSx, p: { xs: 2, md: 4 } }}>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                Score Progression Across the Season
              </Typography>
              <TableContainer sx={{ overflowX: "auto" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Phase</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Meet 1</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Meet 2</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Meet 3</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>Meet 4</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: "secondary.light" }}>State Target</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scoreProgression.map((row) => (
                      <TableRow key={row.phase}>
                        <TableCell sx={{ fontWeight: 600 }}>{row.phase}</TableCell>
                        {row.scores.map((s, i) => (
                          <TableCell key={i} align="center" sx={{ color: "text.secondary" }}>
                            {s}
                          </TableCell>
                        ))}
                        <TableCell align="center" sx={{ color: "secondary.light", fontWeight: 700 }}>
                          {row.target}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* RESULTS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                2025–26 SEASON
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Competition Results
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {results.map((r, i) => (
              <Grid2 key={r.event} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3.5, height: "100%", textAlign: "center" }}>
                    <EmojiEventsIcon sx={{ color: "secondary.main", fontSize: 36, mb: 1.5 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {r.event}
                    </Typography>
                    <Chip
                      label={`ROBOT: ${r.robot.toUpperCase()}`}
                      size="small"
                      sx={{ mb: 1.5, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "secondary.light", mb: 1 }}>
                      {r.result}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Point avg: {r.avg}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* 3D + HISTORY CTA */}
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <RobotScene height={360} />
                <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.secondary", mt: 1.5 }}>
                  Illustrative 3D model — see the FTC page for the general anatomy breakdown.
                </Typography>
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Where did it all start?
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                  Catalyst is our second-season robot. Before DECODE there was INTO THE DEEP — our rookie
                  season of broken claws, oversized robots, and the lessons that made this season possible.
                </Typography>
                <Button variant="contained" color="primary" startIcon={<HistoryIcon />} onClick={() => navigate("/history")}>
                  Read Our Rookie Season Story
                </Button>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Robot;
