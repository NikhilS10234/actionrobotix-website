import { Box, Container, Grid2, Typography, Chip } from "@mui/material";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const mentees = [
  { name: "Action Robotics-FLL", number: "52183" },
  { name: "Eager Eagles", number: "58002" },
  { name: "Golden Falcons" },
  { name: "Control-Alt-Delete" },
];

const FLL = () => {
  usePageTitle("FLL");

  return (
  <PageTransition>
    <PageHero
      eyebrow="FIRST LEGO LEAGUE"
      title="Where Robotics Journeys Begin"
      subtitle="Ages 4–16 · Introducing younger students to STEM through hands-on LEGO robotics."
    />

    <Box sx={sectionSx}>
      <Container maxWidth="lg">
        <Grid2 container spacing={6} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Reveal direction="right">
              <Box
                component="img"
                src="Images/fllPicture.avif"
                alt="FIRST LEGO League"
                sx={{ width: "100%", borderRadius: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
              />
            </Reveal>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Reveal direction="left">
              <Typography variant="h3" sx={{ mb: 2 }}>
                What Is FLL?
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                FLL introduces younger students to STEM through hands-on, collaborative robotics projects
                using LEGO kits. The program is divided into three divisions: Discover (ages 4–6), Explore
                (ages 6–10), and Challenge (ages 9–16).
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                It's often the very first robotics experience a student has — and it's where many
                Action Robotix members got their own start before moving on to FIRST Tech Challenge.
              </Typography>
            </Reveal>
          </Grid2>
        </Grid2>
      </Container>
    </Box>

    <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              GIVING BACK
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
              Teams We Mentor
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mx: "auto" }}>
              Action Robotix has started or mentored 18 FLL teams to date. These four feeder teams are where
              we're recruiting 9 new members for the 2026–27 season:
            </Typography>
          </Box>
        </Reveal>
        <Grid2 container spacing={4} justifyContent="center">
          {mentees.map((m, i) => (
            <Grid2 key={m.name} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 0.1}>
                <Box sx={{ ...glassCardSx, p: 4, textAlign: "center", height: "100%" }}>
                  <Chip
                    label={m.number ? `TEAM ${m.number}` : "FLL TEAM"}
                    sx={{ mb: 2, fontWeight: 700, bgcolor: "rgba(255,122,26,0.14)", color: "secondary.light" }}
                  />
                  <Typography variant="h6">{m.name}</Typography>
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

export default FLL;
