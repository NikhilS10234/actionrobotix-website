import { useEffect, useState } from "react";
import { Box, Container, Grid2, Typography, CircularProgress, Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MicIcon from "@mui/icons-material/Mic";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchPublishedEpisodes } from "../api/podcast";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const Podcast = () => {
  usePageTitle("Podcast");
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchPublishedEpisodes()
      .then(setEpisodes)
      .catch(() => setError("Couldn't load episodes right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <PageHero
        eyebrow="ROOKIE SUPPORT"
        title="The Action Robotix Podcast"
        subtitle="Conversations about FTC strategy, build season, mentorship, and lessons learned — aimed at helping rookie teams get up to speed faster."
      />

      {!isSupabaseConfigured ? (
        <BackendNotice feature="The podcast" />
      ) : (
        <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
          <Container maxWidth="md">
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center" }}>
                {error}
              </Typography>
            )}
            {!loading && !error && episodes.length === 0 && (
              <Box sx={{ ...glassCardSx, p: 5, textAlign: "center" }}>
                <MicIcon sx={{ fontSize: 40, color: "secondary.main", mb: 1.5 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  We're just getting started
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 480, mx: "auto" }}>
                  No episodes are up yet — we're planning a podcast focused on helping rookie FTC teams navigate
                  strategy, build, and outreach. Check back soon, or follow our{" "}
                  <Button href="/community" size="small">Discord</Button> for updates.
                </Typography>
              </Box>
            )}
            <Grid2 container spacing={3}>
              {episodes.map((ep, i) => (
                <Grid2 key={ep.id} size={12}>
                  <Reveal delay={i * 0.08}>
                    <Box sx={{ ...glassCardSx, p: 3, display: "flex", gap: 2.5, alignItems: "center" }}>
                      <PlayCircleIcon sx={{ fontSize: 40, color: "secondary.main", flexShrink: 0 }} />
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          {ep.title}
                        </Typography>
                        {ep.description && (
                          <Typography variant="body2" sx={{ color: "text.secondary", mb: ep.external_url ? 1.5 : 0 }}>
                            {ep.description}
                          </Typography>
                        )}
                        {ep.external_url && (
                          <Button size="small" variant="outlined" href={ep.external_url} target="_blank" rel="noopener noreferrer">
                            Listen
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Reveal>
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </Box>
      )}
    </PageTransition>
  );
};

export default Podcast;
