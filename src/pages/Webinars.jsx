import { useEffect, useState } from "react";
import { Box, Container, Grid2, Typography, CircularProgress, Chip, Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import VideocamIcon from "@mui/icons-material/Videocam";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchUpcomingWebinars, fetchPastWebinars } from "../api/webinars";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const DateBadge = ({ isoDate }) => {
  const d = new Date(isoDate);
  return (
    <Box
      sx={{
        width: 64,
        height: 64,
        flexShrink: 0,
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(47,125,255,0.08)",
      }}
    >
      <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: 700, lineHeight: 1 }}>
        {d.toLocaleDateString(undefined, { month: "short" }).toUpperCase()}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
        {d.getDate()}
      </Typography>
    </Box>
  );
};

const WebinarCard = ({ webinar, past }) => (
  <Box sx={{ ...glassCardSx, p: 3, display: "flex", gap: 2.5, opacity: past ? 0.65 : 1 }}>
    <DateBadge isoDate={webinar.starts_at} />
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        {webinar.title}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
        {new Date(webinar.starts_at).toLocaleString(undefined, {
          weekday: "long",
          hour: "numeric",
          minute: "2-digit",
        })}
        {" · "}
        {webinar.duration_minutes} min
      </Typography>
      {webinar.description && (
        <Typography variant="body2" sx={{ color: "text.secondary", mb: webinar.meeting_url && !past ? 1.5 : 0 }}>
          {webinar.description}
        </Typography>
      )}
      {webinar.meeting_url && !past && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<VideocamIcon />}
          href={webinar.meeting_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Link
        </Button>
      )}
    </Box>
  </Box>
);

const Webinars = () => {
  usePageTitle("Rookie Webinars");
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    Promise.all([fetchUpcomingWebinars(), fetchPastWebinars()])
      .then(([u, p]) => {
        setUpcoming(u);
        setPast(p);
      })
      .catch(() => setError("Couldn't load webinars right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <PageHero
        eyebrow="ROOKIE SUPPORT"
        title="Monthly Webinars"
        subtitle="Free, live sessions to help rookie FTC teams navigate their first seasons — strategy, build, outreach, and everything in between."
      />

      {!isSupabaseConfigured ? (
        <BackendNotice feature="The webinar calendar" />
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
            {!loading && !error && (
              <>
                <Box sx={{ mb: 6 }}>
                  <Chip icon={<EventIcon />} label="Upcoming" color="secondary" sx={{ mb: 3, fontWeight: 700 }} />
                  {upcoming.length === 0 ? (
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      No upcoming webinars scheduled yet — check back soon or join our Discord to get notified.
                    </Typography>
                  ) : (
                    <Grid2 container spacing={3}>
                      {upcoming.map((w, i) => (
                        <Grid2 key={w.id} size={12}>
                          <Reveal delay={i * 0.08}>
                            <WebinarCard webinar={w} />
                          </Reveal>
                        </Grid2>
                      ))}
                    </Grid2>
                  )}
                </Box>

                {past.length > 0 && (
                  <Box>
                    <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 2, mb: 3, display: "block" }}>
                      Past Sessions
                    </Typography>
                    <Grid2 container spacing={3}>
                      {past.map((w) => (
                        <Grid2 key={w.id} size={12}>
                          <WebinarCard webinar={w} past />
                        </Grid2>
                      ))}
                    </Grid2>
                  </Box>
                )}
              </>
            )}
          </Container>
        </Box>
      )}
    </PageTransition>
  );
};

export default Webinars;
