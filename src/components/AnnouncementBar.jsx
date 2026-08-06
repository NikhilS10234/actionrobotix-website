import { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useNavigate } from "react-router-dom";
import { fetchSetting } from "../api/settings";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const DEFAULT_ANNOUNCEMENT = {
  enabled: true,
  version: "2026-season-default",
  text: "The 2026–27 FTC season kicks off soon — the site will be changing as we prep!",
  link: "/season",
};

const STORAGE_KEY = "ar-announcement-dismissed-version";

const AnnouncementBar = () => {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!isSupabaseConfigured) {
        if (!cancelled) setAnnouncement(DEFAULT_ANNOUNCEMENT);
        return;
      }
      try {
        const value = await fetchSetting("announcement");
        if (!cancelled) setAnnouncement(value);
      } catch {
        if (!cancelled) setAnnouncement(DEFAULT_ANNOUNCEMENT);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!announcement) return;
    const dismissedVersion = localStorage.getItem(STORAGE_KEY);
    setDismissed(dismissedVersion === announcement.version);
  }, [announcement]);

  if (!announcement || !announcement.enabled || dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, announcement.version);
    setDismissed(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        py: 1,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        textAlign: "center",
        flexWrap: "wrap",
      }}
    >
      <CampaignIcon fontSize="small" />
      <Typography
        variant="body2"
        onClick={() => announcement.link && navigate(announcement.link)}
        sx={{ fontWeight: 600, cursor: announcement.link ? "pointer" : "default", "&:hover": announcement.link ? { textDecoration: "underline" } : undefined }}
      >
        {announcement.text}
      </Typography>
      <IconButton size="small" onClick={handleDismiss} aria-label="Dismiss announcement" sx={{ color: "#fff", p: 0.3 }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default AnnouncementBar;
