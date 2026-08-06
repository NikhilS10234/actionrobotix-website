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
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { navGroups } from "../navigation";
import AnnouncementBar from "./AnnouncementBar";

const isGroupActive = (group, pathname) => {
  const paths = group.items ? group.items.map((i) => i.path) : [group.path];
  return paths.some((p) => pathname.toLowerCase() === p.toLowerCase());
};

const NavGroupButton = ({ group, active, onNavigate }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!group.items) {
    return (
      <Box sx={{ position: "relative", px: 0.3 }}>
        <Button
          onClick={() => onNavigate(group.path)}
          sx={{
            color: active ? "primary.light" : "text.primary",
            fontWeight: active ? 700 : 500,
            py: 2,
            px: 1.4,
            minWidth: "auto",
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
          }}
        >
          {group.label}
        </Button>
        {active && <ActiveUnderline />}
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", px: 0.3 }}>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        sx={{
          color: active ? "primary.light" : "text.primary",
          fontWeight: active ? 700 : 500,
          py: 2,
          px: 1.4,
          minWidth: "auto",
          fontSize: "0.9rem",
          whiteSpace: "nowrap",
        }}
      >
        {group.label}
      </Button>
      {active && <ActiveUnderline />}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 200 } } }}
      >
        {group.items.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              setAnchorEl(null);
              onNavigate(item.path);
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const ActiveUnderline = () => (
  <motion.div
    layoutId="nav-underline"
    transition={{ type: "spring", stiffness: 380, damping: 30 }}
    style={{
      position: "absolute",
      bottom: 8,
      left: 10,
      right: 10,
      height: 3,
      borderRadius: 3,
      background: "linear-gradient(90deg, #2f7dff, #ff7a1a)",
    }}
  />
);

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

          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" }, gap: 0 }}>
            {navGroups.map((group) => (
              <NavGroupButton
                key={group.label}
                group={group}
                active={isGroupActive(group, location.pathname)}
                onNavigate={goTo}
              />
            ))}
          </Box>

          <Box sx={{ display: { xs: "none", lg: "block" }, ml: 1 }}>
            <Button variant="contained" color="secondary" onClick={() => goTo("/supportus")}>
              Support Us
            </Button>
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
          <Box sx={{ px: 3, pt: 2 }}>
            <Button fullWidth variant="contained" color="secondary" onClick={() => goTo("/supportus")}>
              Support Us
            </Button>
          </Box>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default ResponsiveAppBar;
