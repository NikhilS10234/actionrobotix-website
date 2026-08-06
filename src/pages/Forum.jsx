import { useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress, Button, TextField, Alert, Chip } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import ForumSignIn from "../components/ForumSignIn";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchThreads, createThread } from "../api/forum";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const DISPLAY_NAME_KEY = "ar_forum_display_name";

const Forum = () => {
  usePageTitle("Community Forum");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [displayName, setDisplayName] = useState(() => localStorage.getItem(DISPLAY_NAME_KEY) ?? "");
  const [posting, setPosting] = useState(false);

  const load = () => {
    setLoading(true);
    fetchThreads()
      .then(setThreads)
      .catch(() => setError("Couldn't load the forum right now."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !displayName.trim()) return;
    setPosting(true);
    try {
      localStorage.setItem(DISPLAY_NAME_KEY, displayName);
      const thread = await createThread({ title, body, authorId: user.id, authorName: displayName });
      setTitle("");
      setBody("");
      setShowNewForm(false);
      navigate(`/forum/${thread.id}`);
    } catch {
      setError("Couldn't post that thread — try again.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <PageTransition>
      <PageHero
        eyebrow="COMMUNITY"
        title="Forum"
        subtitle="Ask questions, share advice, and talk shop with other FTC teams — especially if you're a rookie team figuring things out."
      />

      {!isSupabaseConfigured ? (
        <BackendNotice feature="The forum" />
      ) : (
        <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
          <Container maxWidth="md">
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {!user && <ForumSignIn redirectPath="/forum" />}

            {user && !showNewForm && (
              <Button startIcon={<AddIcon />} variant="contained" onClick={() => setShowNewForm(true)} sx={{ mb: 4, mt: user ? 0 : 3 }}>
                New Thread
              </Button>
            )}

            {user && showNewForm && (
              <Box component="form" onSubmit={handleCreate} sx={{ ...glassCardSx, p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  New Thread
                </Typography>
                <TextField
                  fullWidth
                  required
                  label="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField fullWidth required label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
                <TextField
                  fullWidth
                  required
                  multiline
                  minRows={4}
                  label="Message"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button type="submit" variant="contained" disabled={posting}>
                    Post Thread
                  </Button>
                  <Button variant="outlined" onClick={() => setShowNewForm(false)}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            )}

            {!loading && threads.length === 0 && (
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", mt: 4 }}>
                No threads yet — be the first to post.
              </Typography>
            )}

            {threads.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.05}>
                <Box
                  onClick={() => navigate(`/forum/${t.id}`)}
                  sx={{ ...glassCardSx, p: 2.5, mb: 2, cursor: "pointer" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    {t.pinned && <Chip icon={<PushPinIcon />} label="Pinned" size="small" color="secondary" />}
                    <Typography variant="h6">{t.title}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {t.author_name} ·{" "}
                    {new Date(t.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Container>
        </Box>
      )}
    </PageTransition>
  );
};

export default Forum;
