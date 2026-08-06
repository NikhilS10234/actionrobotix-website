import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, Button, Chip, CircularProgress, Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { glassCardSx } from "../../components/styles";
import { fetchAllPortfoliosForAdmin, setPortfolioApproved, deletePortfolio } from "../../api/portfolios";

const AdminPortfolioManager = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllPortfoliosForAdmin()
      .then(setPortfolios)
      .catch(() => setError("Couldn't load submissions."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleApprove = async (id, approved) => {
    try {
      await setPortfolioApproved(id, approved);
      load();
    } catch {
      setError("Couldn't update that submission.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    try {
      await deletePortfolio(id);
      load();
    } catch {
      setError("Couldn't delete that submission.");
    }
  };

  if (loading) return <CircularProgress />;

  const pending = portfolios.filter((p) => !p.approved);
  const approved = portfolios.filter((p) => p.approved);

  const renderRow = (p) => (
    <ListItem
      key={p.id}
      secondaryAction={
        <Box sx={{ display: "flex", gap: 1 }}>
          {!p.approved && (
            <Button size="small" startIcon={<CheckIcon />} variant="contained" onClick={() => handleApprove(p.id, true)}>
              Approve
            </Button>
          )}
          {p.approved && (
            <Button size="small" startIcon={<CloseIcon />} variant="outlined" onClick={() => handleApprove(p.id, false)}>
              Unapprove
            </Button>
          )}
          <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(p.id)}>
            Delete
          </Button>
        </Box>
      }
    >
      <ListItemText
        primary={`${p.team_name} (#${p.team_number}) — ${p.season}`}
        secondary={
          <>
            <a href={p.portfolio_url} target="_blank" rel="noopener noreferrer">
              {p.portfolio_url}
            </a>
            {p.contact_email ? ` · ${p.contact_email}` : ""}
            {p.description ? ` · ${p.description}` : ""}
          </>
        }
      />
    </ListItem>
  );

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="h6">Pending Review</Typography>
        <Chip label={pending.length} size="small" />
      </Box>
      <List sx={{ ...glassCardSx, p: 1, mb: 4 }}>
        {pending.length === 0 && (
          <ListItem>
            <ListItemText primary="Nothing pending." />
          </ListItem>
        )}
        {pending.map(renderRow)}
      </List>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="h6">Approved (Live)</Typography>
        <Chip label={approved.length} size="small" />
      </Box>
      <List sx={{ ...glassCardSx, p: 1 }}>
        {approved.length === 0 && (
          <ListItem>
            <ListItemText primary="No approved portfolios yet." />
          </ListItem>
        )}
        {approved.map(renderRow)}
      </List>
    </Box>
  );
};

export default AdminPortfolioManager;
