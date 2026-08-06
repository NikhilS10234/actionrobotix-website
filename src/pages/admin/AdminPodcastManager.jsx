import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { glassCardSx } from "../../components/styles";
import { fetchAllEpisodesForAdmin, createEpisode, updateEpisode, deleteEpisode } from "../../api/podcast";

const emptyForm = { title: "", description: "", external_url: "", published: false };

const AdminPodcastManager = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllEpisodesForAdmin()
      .then(setEpisodes)
      .catch(() => setError("Couldn't load episodes."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setEditingId("new");
    setForm(emptyForm);
  };

  const startEdit = (ep) => {
    setEditingId(ep.id);
    setForm({ ...ep });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editingId === "new") {
        await createEpisode(form);
      } else {
        const { id, published_at, ...updates } = form;
        await updateEpisode(id, updates);
      }
      cancel();
      load();
    } catch {
      setError("Couldn't save the episode.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this episode?")) return;
    try {
      await deleteEpisode(id);
      load();
    } catch {
      setError("Couldn't delete the episode.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {!form && (
        <Button startIcon={<AddIcon />} variant="contained" onClick={startNew} sx={{ mb: 3 }}>
          New Episode
        </Button>
      )}

      {form && (
        <Box sx={{ ...glassCardSx, p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId === "new" ? "New Episode" : "Edit Episode"}
          </Typography>
          <TextField fullWidth label="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} sx={{ mb: 2 }} />
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Description"
            value={form.description ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="External URL (Spotify/YouTube/Apple Podcasts)"
            value={form.external_url ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, external_url: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Switch checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />}
            label="Published"
            sx={{ mb: 2, display: "block" }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={cancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <List sx={{ ...glassCardSx, p: 1 }}>
        {episodes.length === 0 && (
          <ListItem>
            <ListItemText primary="No episodes yet." />
          </ListItem>
        )}
        {episodes.map((ep) => (
          <ListItem
            key={ep.id}
            secondaryAction={
              <>
                <IconButton onClick={() => startEdit(ep)} aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(ep.id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={`${ep.title} ${ep.published ? "" : "(draft)"}`} secondary={ep.external_url} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminPodcastManager;
