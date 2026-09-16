import { useEffect, useState } from "react";
import { Box, Container, Grid2, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchSetting } from "../api/settings";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const DEFAULT_BLURB = {
  heading: "The 2026-2027 BioBuzz Season Has Started",
  body: "BioBuzz is underway. Our team is studying the game, developing our robot, and sharing updates throughout the season.",
};

const timeline = [
  { icon: <RocketLaunchIcon />, title: "BioBuzz Is Here", desc: "The 2026-2027 FTC game has begun, and our strategy work is underway." },
  { icon: <BuildIcon />, title: "Robot Development", desc: "We are designing, prototyping, building, and programming for BioBuzz." },
  { icon: <GroupsIcon />, title: "Team Growth", desc: "New members are joining the work across design, build, programming, and outreach." },
  { icon: <EventIcon />, title: "Scrimmages & Qualifiers", desc: "Practice matches and regional qualifying tournaments are ahead." },
];

const Season = () => {
  usePageTitle("2026-2027 BioBuzz Season");
  const navigate = useNavigate();
  const [blurb, setBlurb] = useState(DEFAULT_BLURB);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchSetting("season_blurb")
      .then((value) => value && setBlurb(value))
      .catch(() => {});
  }, []);

  return (
    <PageTransition>
      <PageHero
        eyebrow="WHAT'S NEXT"
        title={blurb.heading}
        subtitle={blurb.body}
      />

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                THE ROAD AHEAD
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                What to Expect This Season
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4}>
            {timeline.map((t, i) => (
              <Grid2 key={t.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 4, height: "100%", textAlign: "center" }}>
                    <Box sx={{ color: "primary.light", mb: 1.5 }}>{t.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {t.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {t.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>

          <Reveal>
            <Box sx={{ textAlign: "center", mt: 8 }}>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                Want to be part of BioBuzz? Join the team or follow our progress on social media.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/join")}>
                  Join Us
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/outreach")}>
                  Follow Our Outreach
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Season;
