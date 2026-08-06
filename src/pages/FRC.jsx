import { Box, Container, Grid2, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const FRC = () => {
  const navigate = useNavigate();
  usePageTitle("FRC");

  return (
    <PageTransition>
      <PageHero
        eyebrow="FIRST ROBOTICS COMPETITION"
        title="The Next Step Up"
        subtitle="Grades 9–12 · The most advanced program in the FIRST pathway."
      />

      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box
                  component="img"
                  src="Images/frcPicture.jpeg"
                  alt="FIRST Robotics Competition"
                  sx={{ width: "100%", borderRadius: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
                />
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Typography variant="h3" sx={{ mb: 2 }}>
                  What Is FRC?
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  FIRST Robotics Competition is the most advanced FIRST program, built for students in
                  grades 9–12. Each year, teams receive a brand-new game challenge and have just six weeks
                  to design and construct an industrial-sized robot capable of competing in alliances
                  alongside other teams.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                  FRC combines the intensity of a real engineering deadline with the scale of competitive
                  sport — teams manage fabrication, electronics, programming, strategy, and fundraising all
                  at once, often with support from professional mentors and sponsors.
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Action Robotix currently competes in FIRST Tech Challenge as Team 25779. As our members
                  grow, FRC represents the natural next step in the FIRST pathway — bigger robots, bigger
                  teams, bigger challenges.
                </Typography>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 }, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Reveal>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Curious where we compete today?
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/ftc")}>
              See Our FTC Team
            </Button>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default FRC;
