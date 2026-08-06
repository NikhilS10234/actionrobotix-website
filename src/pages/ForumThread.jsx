import { useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress, Button, TextField, Alert, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import ForumSignIn from "../components/ForumSignIn";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchThread, fetchReplies, createReply, deleteThread, deleteReply } from "../api/forum";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const DISPLAY_NAME_KEY = "ar_forum_display_name";

const ForumThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);
  const [replyBody, setReplyBody] = useState("");
  const [displayName, setDisplayName] = useState(() => localStorage.getItem(DISPLAY_NAME_KEY) ?? "");
  const [posting, setPosting] = useState(false);

  usePageTitle(thread?.title ?? "Forum Thread");

  const load = () => {
    setLoading(true);
    Promise.all([fetchThread(id), fetchReplies(id)])
      .then(([t, r]) => {
        setThread(t);
        setReplies(r);
      })
      .catch(() => setError("Couldn't load that thread."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyBody.trim() || !displayName.trim()) return;
    setPosting(true);
    try {
      localStorage.setItem(DISPLAY_NAME_KEY, displayName);
      await createReply({ threadId: id, body: replyBody, authorId: user.id, authorName: displayName });
      setReplyBody("");
      load();
    } catch {
      setError("Couldn't post that reply — try again.");
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteThread = async () => {
    if (!window.confirm("Delete this thread?")) return;
    await deleteThread(id);
    navigate("/forum");
  };

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm("Delete this reply?")) return;
    await deleteReply(replyId);
    load();
  };

  if (!isSupabaseConfigured) return <BackendNotice feature="The forum" />;

  return (
    <PageTransition>
      <Box sx={{ ...sectionSx, pt: { xs: 12, md: 16 }, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/forum")} sx={{ mb: 3 }}>
            Back to Forum
          </Button>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && thread && (
            <>
              <Box sx={{ ...glassCardSx, p: 3, mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {thread.title}
                  </Typography>
                  {(isAdmin || user?.id === thread.author_id) && (
                    <IconButton onClick={handleDeleteThread} aria-label="Delete thread">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 2 }}>
                  {thread.author_name} ·{" "}
                  {new Date(thread.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {thread.body}
                </Typography>
              </Box>

              <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 2, mb: 2, display: "block" }}>
                {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
              </Typography>

              {replies.map((r) => (
                <Box key={r.id} sx={{ ...glassCardSx, p: 2.5, mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
                    <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", flexGrow: 1 }}>
                      {r.body}
                    </Typography>
                    {(isAdmin || user?.id === r.author_id) && (
                      <IconButton size="small" onClick={() => handleDeleteReply(r.id)} aria-label="Delete reply">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {r.author_name} ·{" "}
                    {new Date(r.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

              {!user && <ForumSignIn redirectPath={`/forum/${id}`} />}

              {user && (
                <Box component="form" onSubmit={handleReply} sx={{ ...glassCardSx, p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Reply
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    label="Your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={3}
                    label="Message"
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" disabled={posting}>
                    Post Reply
                  </Button>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </PageTransition>
  );
};

export default ForumThread;
