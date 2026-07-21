import { Box, Container, Grid2, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageHero from "./components/PageHero";
import Reveal from "./components/Reveal";
import PageTransition from "./components/PageTransition";
import { glassCardSx, sectionSx } from "./components/styles";
import usePageTitle from "./hooks/usePageTitle";

const programs = [
  {
    tag: "AGES 4–16",
    title: "FIRST LEGO League",
    short: "FLL",
    img: "Images/fllPicture.avif",
    desc:
      "FLL introduces younger students to STEM through hands-on, collaborative robotics projects using LEGO kits, across three divisions: Discover (4–6), Explore (6–10), and Challenge (9–16).",
    path: "/fll",
  },
  {
    tag: "GRADES 7–12",
    title: "FIRST Tech Challenge",
    short: "FTC",
    img: "Images/ftcRobot.jpeg",
    desc:
      "FTC teams design, build, and program robots to compete head-to-head on a 12×12 field. This is our team's home program — Action Robotix competes as FTC Team 25779.",
    path: "/ftc",
  },
  {
    tag: "GRADES 9–12",
    title: "FIRST Robotics Competition",
    short: "FRC",
    img: "Images/frcPicture.jpeg",
    desc:
      "The most advanced FIRST program — teams get a new challenge each year and build industrial-sized robots within a six-week window to compete in alliances with other teams.",
    path: "/frc",
  },
];

const FIRST = () => {
  const navigate = useNavigate();
  usePageTitle("FIRST Programs");

  return (
    <PageTransition>
      <PageHero
        eyebrow="FOR INSPIRATION AND RECOGNITION OF SCIENCE AND TECHNOLOGY"
        title="What is FIRST?"
        subtitle="A global nonprofit inspiring young people to become leaders and innovators in STEM through team-based, mentor-guided robotics."
      />

      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 820, mx: "auto", textAlign: "center", mb: 8 }}>
              Founded in 1989 by inventor Dean Kamen, FIRST® engages students in grades K–12 through
              mentor-guided robotics programs that build skills in engineering, problem-solving, teamwork, and
              communication. Every program shares a culture of "Gracious Professionalism" and
              "Coopertition®" — where teams support each other even while competing.
            </Typography>
          </Reveal>

          <Grid2 container spacing={4}>
            {programs.map((p, i) => (
              <Grid2 key={p.short} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ height: 180, overflow: "hidden", position: "relative" }}>
                      <Box component="img" src={p.img} alt={p.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <Chip
                        label={p.tag}
                        size="small"
                        sx={{ position: "absolute", top: 12, left: 12, bgcolor: "rgba(10,14,23,0.8)", color: "primary.light", fontWeight: 700 }}
                      />
                    </Box>
                    <Box sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, flexGrow: 1 }}>
                        {p.desc}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate(p.path)}
                        sx={{ alignSelf: "flex-start" }}
                      >
                        Learn More About {p.short}
                      </Button>
                    </Box>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default FIRST;
