import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, IconButton, CircularProgress, Alert, Collapse, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { glassCardSx } from "../../components/styles";
import { fetchThreads, fetchReplies, deleteThread, deleteReply } from "../../api/forum";

const AdminForumManager = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [replies, setReplies] = useState({});

  const load = () => {
    setLoading(true);
    fetchThreads()
      .then(setThreads)
      .catch(() => setError("Couldn't load the forum."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleOpen = async (id) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (!replies[id]) {
      const r = await fetchReplies(id);
      setReplies((prev) => ({ ...prev, [id]: r }));
    }
  };

  const handleDeleteThread = async (id) => {
    if (!window.confirm("Delete this thread and all its replies?")) return;
    try {
      await deleteThread(id);
      load();
    } catch {
      setError("Couldn't delete the thread.");
    }
  };

  const handleDeleteReply = async (threadId, replyId) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await deleteReply(replyId);
      setReplies((prev) => ({ ...prev, [threadId]: prev[threadId].filter((r) => r.id !== replyId) }));
    } catch {
      setError("Couldn't delete the reply.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Moderate forum threads and replies. Deleting a thread also deletes all of its replies.
      </Typography>

      <List sx={{ ...glassCardSx, p: 1 }}>
        {threads.length === 0 && (
          <ListItem>
            <ListItemText primary="No threads yet." />
          </ListItem>
        )}
        {threads.map((t) => (
          <Box key={t.id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton onClick={() => toggleOpen(t.id)} aria-label="Toggle replies">
                    {openId === t.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  <IconButton onClick={() => handleDeleteThread(t.id)} aria-label="Delete thread">
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={t.title}
                secondary={`${t.author_name} · ${new Date(t.created_at).toLocaleDateString()}`}
              />
            </ListItem>
            <Collapse in={openId === t.id}>
              <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
                {(replies[t.id] ?? []).length === 0 && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    No replies.
                  </Typography>
                )}
                {(replies[t.id] ?? []).map((r) => (
                  <Box key={r.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.5 }}>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      <strong>{r.author_name}:</strong> {r.body}
                    </Typography>
                    <Button size="small" color="error" onClick={() => handleDeleteReply(t.id, r.id)}>
                      Delete
                    </Button>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default AdminForumManager;
