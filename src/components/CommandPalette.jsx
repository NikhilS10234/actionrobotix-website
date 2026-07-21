import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, InputBase, List, ListItemButton, ListItemText, Typography, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, AnimatePresence } from "framer-motion";
import { allPages } from "../navigation";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return allPages;
    return allPages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlight(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setHighlight(0), [query]);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && results[highlight]) {
      goTo(results[highlight].path);
    }
  };

  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Open quick navigation"
        sx={{
          position: "fixed",
          bottom: 28,
          left: 28,
          zIndex: 1200,
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.9,
          borderRadius: 999,
          bgcolor: "background.paper",
          border: "1px solid rgba(255,255,255,0.12)",
          cursor: "pointer",
          color: "text.secondary",
          boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
          "&:hover": { borderColor: "primary.main", color: "primary.light" },
        }}
      >
        <SearchIcon fontSize="small" />
        <Typography variant="body2">Quick nav</Typography>
        <Chip label="Ctrl K" size="small" sx={{ height: 20, fontSize: 11, bgcolor: "rgba(255,255,255,0.08)" }} />
      </Box>

      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <AnimatePresence>
          {open && (
            <Box sx={{ position: "fixed", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", pt: { xs: 10, md: 16 }, px: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                style={{ width: "100%", maxWidth: 520 }}
              >
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <SearchIcon sx={{ color: "text.secondary" }} />
                    <InputBase
                      inputRef={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Jump to a page…"
                      fullWidth
                      sx={{ color: "text.primary", fontSize: "1.05rem" }}
                    />
                  </Box>
                  <List sx={{ py: 1, maxHeight: 360, overflowY: "auto" }}>
                    {results.length === 0 && (
                      <Typography variant="body2" sx={{ color: "text.secondary", px: 3, py: 2 }}>
                        No pages match "{query}"
                      </Typography>
                    )}
                    {results.map((p, i) => (
                      <ListItemButton
                        key={p.path}
                        selected={i === highlight}
                        onClick={() => goTo(p.path)}
                        onMouseEnter={() => setHighlight(i)}
                        sx={{
                          mx: 1,
                          borderRadius: 2,
                          "&.Mui-selected": { bgcolor: "rgba(47,125,255,0.16)" },
                        }}
                      >
                        <ListItemText primary={p.label} />
                        {i === highlight && <ArrowForwardIcon fontSize="small" sx={{ color: "primary.light" }} />}
                      </ListItemButton>
                    ))}
                  </List>
                </Box>
              </motion.div>
            </Box>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
};

export default CommandPalette;
