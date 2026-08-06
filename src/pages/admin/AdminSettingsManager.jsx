import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, FormControlLabel, Switch, CircularProgress, Alert } from "@mui/material";
import { glassCardSx } from "../../components/styles";
import { fetchAllSettings, updateSetting } from "../../api/settings";

const AdminSettingsManager = () => {
  const [announcement, setAnnouncement] = useState(null);
  const [seasonBlurb, setSeasonBlurb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    fetchAllSettings()
      .then((rows) => {
        const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
        setAnnouncement(map.announcement ?? { enabled: false, version: "v1", text: "", link: "" });
        setSeasonBlurb(map.season_blurb ?? { heading: "", body: "" });
      })
      .catch(() => setError("Couldn't load settings."))
      .finally(() => setLoading(false));
  }, []);

  const saveAnnouncement = async () => {
    setError(null);
    setSaved(null);
    try {
      const nextVersion = `v-${Date.now()}`;
      const toSave = { ...announcement, version: nextVersion };
      await updateSetting("announcement", toSave);
      setAnnouncement(toSave);
      setSaved("announcement");
    } catch {
      setError("Couldn't save the announcement.");
    }
  };

  const saveSeasonBlurb = async () => {
    setError(null);
    setSaved(null);
    try {
      await updateSetting("season_blurb", seasonBlurb);
      setSaved("season_blurb");
    } catch {
      setError("Couldn't save the season blurb.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box sx={{ ...glassCardSx, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Site-Wide Announcement Bar
        </Typography>
        {saved === "announcement" && <Alert severity="success" sx={{ mb: 2 }}>Saved — this re-shows the banner to visitors who already dismissed it.</Alert>}
        <FormControlLabel
          control={<Switch checked={announcement.enabled} onChange={(e) => setAnnouncement((a) => ({ ...a, enabled: e.target.checked }))} />}
          label="Enabled"
          sx={{ mb: 2, display: "block" }}
        />
        <TextField
          fullWidth
          label="Text"
          value={announcement.text}
          onChange={(e) => setAnnouncement((a) => ({ ...a, text: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Link (optional, e.g. /season)"
          value={announcement.link ?? ""}
          onChange={(e) => setAnnouncement((a) => ({ ...a, link: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={saveAnnouncement}>
          Save Announcement
        </Button>
      </Box>

      <Box sx={{ ...glassCardSx, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Season Page Blurb
        </Typography>
        {saved === "season_blurb" && <Alert severity="success" sx={{ mb: 2 }}>Saved.</Alert>}
        <TextField
          fullWidth
          label="Heading"
          value={seasonBlurb.heading}
          onChange={(e) => setSeasonBlurb((s) => ({ ...s, heading: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Body"
          value={seasonBlurb.body}
          onChange={(e) => setSeasonBlurb((s) => ({ ...s, body: e.target.value }))}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={saveSeasonBlurb}>
          Save Season Blurb
        </Button>
      </Box>
    </Box>
  );
};

export default AdminSettingsManager;
