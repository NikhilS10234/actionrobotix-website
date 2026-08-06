import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { navGroups } from "../navigation";
import AnnouncementBar from "./AnnouncementBar";

const isGroupActive = (group, pathname) => {
  const paths = group.items ? group.items.map((i) => i.path) : [group.path];
  return paths.some((p) => pathname.toLowerCase() === p.toLowerCase());
};

const pillButtonSx = (active) => ({
  position: "relative",
  zIndex: 1,
  color: active ? "#fff" : "text.primary",
  fontWeight: 700,
  fontSize: "0.88rem",
  letterSpacing: "0.01em",
  py: 1,
  px: 2,
  minWidth: "auto",
  borderRadius: 2,
  whiteSpace: "nowrap",
  "&:hover": { backgroundColor: active ? "transparent" : "rgba(255,255,255,0.06)" },
});

const ActivePill = () => (
  <motion.div
    layoutId="nav-pill"
    transition={{ type: "spring", stiffness: 420, damping: 34 }}
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: 16,
      background: "linear-gradient(135deg, #2f7dff 0%, #1a5ad9 100%)",
      boxShadow: "0 6px 20px rgba(47,125,255,0.45)",
    }}
  />
);

const NavGroupButton = ({ group, active, onNavigate }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!group.items) {
    return (
      <Box sx={{ position: "relative", px: 0.3, py: 1 }}>
        {active && <ActivePill />}
        <Button onClick={() => onNavigate(group.path)} sx={pillButtonSx(active)}>
          {group.label}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", px: 0.3, py: 1 }}>
      {active && <ActivePill />}
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        sx={pillButtonSx(active)}
      >
        {group.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220,
              background: "linear-gradient(180deg, rgba(20,26,41,0.98) 0%, rgba(14,18,29,0.98) 100%)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
            },
          },
        }}
      >
        {group.items.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              setAnchorEl(null);
              onNavigate(item.path);
            }}
            sx={{ py: 1.1, fontWeight: 600, fontSize: "0.9rem" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const ResponsiveAppBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <AppBar position="fixed">
      <AnnouncementBar />
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Box
            onClick={() => goTo("/")}
            sx={{ display: "flex", alignItems: "center", gap: 1.2, cursor: "pointer", mr: 3 }}
          >
            <Box component="img" src="./noBGARlogo.png" alt="Action Robotix logo" sx={{ height: 42, width: 42 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{ display: { xs: "none", sm: "block" }, fontWeight: 800, letterSpacing: "-0.01em" }}
            >
              Action Robotix
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }} />

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 0.2,
              p: 0.5,
              borderRadius: 2.5,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {navGroups.map((group) => (
              <NavGroupButton
                key={group.label}
                group={group}
                active={isGroupActive(group, location.pathname)}
                onNavigate={goTo}
              />
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", ml: 1, gap: 0.5 }}>
            <Button variant="contained" color="secondary" onClick={() => goTo("/supportus")}>
              Support Us
            </Button>
            <Tooltip title="Team Login">
              <IconButton
                aria-label="Team login"
                onClick={() => goTo("/admin/login")}
                size="small"
                sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
              >
                <LoginIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" }, justifyContent: "flex-end" }}>
            <IconButton size="large" aria-label="open navigation menu" onClick={() => setMobileOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              backgroundColor: "background.paper",
              backgroundImage: "none",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ pb: 2 }}>
          {navGroups.map((group, gi) => {
            const leaves = group.items ?? [group];
            return (
              <Box key={group.label}>
                {group.items && (
                  <ListSubheader sx={{ bgcolor: "transparent", color: "text.secondary", lineHeight: "2.5" }}>
                    {group.label}
                  </ListSubheader>
                )}
                {leaves.map((page, i) => {
                  const active = location.pathname.toLowerCase() === page.path.toLowerCase();
                  return (
                    <motion.div
                      key={page.path}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (gi + i) * 0.04, duration: 0.35 }}
                    >
                      <ListItemButton onClick={() => goTo(page.path)} sx={{ py: 1.2, px: 3 }}>
                        <ListItemText
                          primary={page.label}
                          slotProps={{
                            primary: {
                              fontWeight: active ? 700 : 500,
                              color: active ? "#2f7dff" : "inherit",
                            },
                          }}
                        />
                      </ListItemButton>
                    </motion.div>
                  );
                })}
              </Box>
            );
          })}
          <Box sx={{ px: 3, pt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => goTo("/supportus")}>
              Support Us
            </Button>
            <Button fullWidth variant="text" size="small" startIcon={<LoginIcon fontSize="small" />} onClick={() => goTo("/admin/login")} sx={{ color: "text.secondary" }}>
              Team Login
            </Button>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default ResponsiveAppBar;
