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
  heading: "The 2026–27 FTC Season Is Almost Here",
  body: "We are gearing up for the new game reveal. Expect the site to change a lot over the next few months as we roll out new pages, robot builds, and team updates.",
};

const timeline = [
  { icon: <RocketLaunchIcon />, title: "Game Reveal", desc: "The new FTC game for 2026–27 is announced and our strategy planning begins." },
  { icon: <BuildIcon />, title: "Build Season", desc: "Design, prototype, and build our robot for the new challenge." },
  { icon: <GroupsIcon />, title: "Recruiting", desc: "We'll be welcoming new members — check the Join Us page to get involved." },
  { icon: <EventIcon />, title: "Scrimmages & Qualifiers", desc: "Practice matches and regional qualifying tournaments kick off." },
];

const Season = () => {
  usePageTitle("2026–27 Season");
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
                Want to be part of it? Join the team or follow along in our community.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/join")}>
                  Join Us
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => navigate("/community")}>
                  Join the Community
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
