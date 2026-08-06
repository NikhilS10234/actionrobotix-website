import { useState } from "react";
import { Box, Container, Grid2, Typography, Button, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleIcon from "@mui/icons-material/Article";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { subscribeToNewsletter } from "../api/newsletter";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const DISCORD_INVITE_URL = "https://discord.gg/wBfpFDSF";

const resources = [
  { icon: <ArticleIcon />, title: "Blog", desc: "Season updates and build notes from our team.", path: "/blog" },
  { icon: <FolderSharedIcon />, title: "Portfolio Database", desc: "Browse and submit FTC engineering portfolios.", path: "/portfolios" },
];

const Community = () => {
  usePageTitle("Community");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("submitting");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus(err.code === "23505" ? "duplicate" : "error");
    }
  };

  return (
    <PageTransition>
      <PageHero
        eyebrow="GET CONNECTED"
        title="Join Our Community"
        subtitle="Chat with the team, get season updates, and connect with the wider FTC community."
      />

      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box sx={{ ...glassCardSx, p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                  <ForumIcon sx={{ color: "secondary.main", fontSize: 40, mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Discord
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, flexGrow: 1 }}>
                    Hang out with Action Robotix and other FTC teams — ask questions, share build progress,
                    and get quick answers from the community.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={DISCORD_INVITE_URL}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    Join the Discord
                  </Button>
                </Box>
              </Reveal>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Box sx={{ ...glassCardSx, p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                  <MailOutlineIcon sx={{ color: "primary.light", fontSize: 40, mb: 2 }} />
                  <Typography variant="h5" sx={{ mb: 1.5 }}>
                    Newsletter
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                    Get season highlights and team news straight to your inbox.
                  </Typography>
                  {!isSupabaseConfigured ? (
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Newsletter signup isn't set up yet.
                    </Typography>
                  ) : status === "success" ? (
                    <Alert severity="success">You're subscribed — thanks for joining!</Alert>
                  ) : (
                    <Box component="form" onSubmit={handleSubscribe} sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                      <TextField
                        size="small"
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={status === "invalid" || status === "error"}
                        helperText={
                          status === "invalid" ? "Enter a valid email" : status === "error" ? "Something went wrong — try again" : status === "duplicate" ? "You're already subscribed" : ""
                        }
                        sx={{ flexGrow: 1, minWidth: 200 }}
                      />
                      <Button type="submit" variant="contained" color="primary" disabled={status === "submitting"}>
                        Subscribe
                      </Button>
                    </Box>
                  )}
                </Box>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                MORE RESOURCES
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                For the FTC Community
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4} justifyContent="center">
            {resources.map((r, i) => (
              <Grid2 key={r.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box
                    onClick={() => navigate(r.path)}
                    sx={{ ...glassCardSx, p: 4, height: "100%", textAlign: "center", cursor: "pointer" }}
                  >
                    <Box sx={{ color: "primary.light", mb: 1.5 }}>{r.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {r.title}
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
    </PageTransition>
  );
};

export default Community;
