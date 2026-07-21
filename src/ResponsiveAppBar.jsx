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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { navPages as pages } from "./navigation";

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
            {pages.map((page) => {
              const active = location.pathname.toLowerCase() === page.path.toLowerCase();
              return (
                <Box key={page.path} sx={{ position: "relative", px: 0.3 }}>
                  <Button
                    onClick={() => goTo(page.path)}
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
                    {page.label}
                  </Button>
                  {active && (
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
                  )}
                </Box>
              );
            })}
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
              width: 280,
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
        <List>
          {pages.map((page, i) => (
            <motion.div
              key={page.path}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <ListItemButton onClick={() => goTo(page.path)} sx={{ py: 1.5, px: 3 }}>
                <ListItemText
                  primary={page.label}
                  slotProps={{
                    primary: {
                      fontWeight: location.pathname.toLowerCase() === page.path.toLowerCase() ? 700 : 500,
                      color:
                        location.pathname.toLowerCase() === page.path.toLowerCase() ? "#2f7dff" : "inherit",
                    },
                  }}
                />
              </ListItemButton>
            </motion.div>
          ))}
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
