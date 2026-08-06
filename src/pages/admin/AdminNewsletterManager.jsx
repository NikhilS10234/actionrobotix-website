import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button, CircularProgress, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { glassCardSx } from "../../components/styles";
import { fetchSubscribersForAdmin, deleteSubscriber } from "../../api/newsletter";

const toCsv = (subscribers) => {
  const header = "email,subscribed_at\n";
  const rows = subscribers.map((s) => `${s.email},${s.subscribed_at}`).join("\n");
  return header + rows;
};

const AdminNewsletterManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    fetchSubscribersForAdmin()
      .then(setSubscribers)
      .catch(() => setError("Couldn't load subscribers."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    try {
      await deleteSubscriber(id);
      load();
    } catch {
      setError("Couldn't remove that subscriber.");
    }
  };

  const handleExport = () => {
    const blob = new Blob([toCsv(subscribers)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">{subscribers.length} Subscribers</Typography>
        <Button startIcon={<DownloadIcon />} variant="outlined" onClick={handleExport} disabled={subscribers.length === 0}>
          Download CSV
        </Button>
      </Box>

      <List sx={{ ...glassCardSx, p: 1 }}>
        {subscribers.length === 0 && (
          <ListItem>
            <ListItemText primary="No subscribers yet." />
          </ListItem>
        )}
        {subscribers.map((s) => (
          <ListItem
            key={s.id}
            secondaryAction={
              <IconButton onClick={() => handleDelete(s.id)} aria-label="Remove">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={s.email} secondary={new Date(s.subscribed_at).toLocaleDateString()} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminNewsletterManager;
