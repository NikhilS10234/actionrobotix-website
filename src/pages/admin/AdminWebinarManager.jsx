import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
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
import { fetchAllWebinarsForAdmin, createWebinar, updateWebinar, deleteWebinar } from "../../api/webinars";

const emptyForm = { title: "", description: "", starts_at: "", duration_minutes: 60, meeting_url: "" };

// datetime-local inputs need "YYYY-MM-DDTHH:mm"; Postgres timestamptz needs ISO.
const toLocalInput = (iso) => (iso ? new Date(iso).toISOString().slice(0, 16) : "");
const toIso = (local) => (local ? new Date(local).toISOString() : null);

const AdminWebinarManager = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllWebinarsForAdmin()
      .then(setWebinars)
      .catch(() => setError("Couldn't load webinars."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setEditingId("new");
    setForm(emptyForm);
  };

  const startEdit = (w) => {
    setEditingId(w.id);
    setForm({ ...w, starts_at: toLocalInput(w.starts_at) });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(null);
  };

  const handleSave = async () => {
    setError(null);
    try {
      const payload = { ...form, starts_at: toIso(form.starts_at), duration_minutes: Number(form.duration_minutes) };
      if (editingId === "new") {
        await createWebinar(payload);
      } else {
        const { id, created_at, ...updates } = payload;
        await updateWebinar(id, updates);
      }
      cancel();
      load();
    } catch {
      setError("Couldn't save the webinar.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this webinar?")) return;
    try {
      await deleteWebinar(id);
      load();
    } catch {
      setError("Couldn't delete the webinar.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {!form && (
        <Button startIcon={<AddIcon />} variant="contained" onClick={startNew} sx={{ mb: 3 }}>
          New Webinar
        </Button>
      )}

      {form && (
        <Box sx={{ ...glassCardSx, p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId === "new" ? "New Webinar" : "Edit Webinar"}
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
            type="datetime-local"
            label="Starts at"
            value={form.starts_at}
            onChange={(e) => setForm((f) => ({ ...f, starts_at: e.target.value }))}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Duration (minutes)"
            value={form.duration_minutes}
            onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Meeting URL (Zoom/Meet)"
            value={form.meeting_url ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, meeting_url: e.target.value }))}
            sx={{ mb: 2 }}
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
        {webinars.length === 0 && (
          <ListItem>
            <ListItemText primary="No webinars yet." />
          </ListItem>
        )}
        {webinars.map((w) => (
          <ListItem
            key={w.id}
            secondaryAction={
              <>
                <IconButton onClick={() => startEdit(w)} aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(w.id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={w.title}
              secondary={new Date(w.starts_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminWebinarManager;
