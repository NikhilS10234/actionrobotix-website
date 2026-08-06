import { Box, Container, Typography, Chip } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const results = [
  {
    title: "League Tournament",
    robot: "Inhibitor",
    award: "1st — Sustain Award",
    detail: "101.17 point average across the tournament.",
  },
  {
    title: "Eastern Missouri Super Qualifier",
    robot: "Catalyst",
    award: "1st — Inspire Award + Winning Alliance",
    detail: "135.5 point average — top honor and the alliance title in one event.",
  },
  {
    title: "MO/KS State Championship & League Tournament",
    robot: "Catalyst V2",
    award: "1st — Sustain Award",
    detail: "Placed 8th in Advancement Points and qualified for the Chicago Robotics Invitational (CRI).",
  },
  {
    title: "Chicago Robotics Invitational",
    robot: "Catalyst 2.0",
    award: "Qualified & Competed",
    detail: "Brought our third robot iteration to compete against some of the best teams in the country.",
  },
];

const Awards = () => {
  usePageTitle("Awards");

  return (
    <PageTransition>
      <PageHero
        eyebrow="2025–26 DECODE SEASON"
        title="Awards & Results"
        subtitle="Every event we've competed at this season, and what we walked away with."
      />

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: { xs: 19, md: "50%" },
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: "rgba(255,255,255,0.1)",
                transform: { md: "translateX(-50%)" },
              }}
            />
            {results.map((r, i) => {
              const leftSide = i % 2 === 0;
              return (
                <Box
                  key={r.title}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: leftSide ? "row" : "row-reverse" },
                    alignItems: "center",
                    gap: 3,
                    mb: 5,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 19, md: "50%" },
                      transform: "translateX(-50%)",
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                      border: "3px solid #0a0e17",
                      zIndex: 1,
                    }}
                  />
                  <Box sx={{ width: { xs: 0, md: "calc(50% - 24px)" }, display: { xs: "none", md: "block" } }} />
                  <Box sx={{ pl: { xs: 6, md: 0 }, width: { xs: "100%", md: "calc(50% - 24px)" } }}>
                    <Reveal direction={leftSide ? "right" : "left"} delay={i * 0.1}>
                      <Box sx={{ ...glassCardSx, p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                          <EmojiEventsIcon sx={{ color: "secondary.main", fontSize: 28, flexShrink: 0 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                            {r.title}
                          </Typography>
                        </Box>
                        <Chip
                          label={`ROBOT: ${r.robot.toUpperCase()}`}
                          size="small"
                          sx={{ mb: 1.5, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "secondary.light", mb: 0.5 }}>
                          {r.award}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {r.detail}
                        </Typography>
                      </Box>
                    </Reveal>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Awards;
