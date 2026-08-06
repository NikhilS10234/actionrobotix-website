import { useState } from "react";
import { Box, Container, Grid2, Typography, IconButton, Divider, Link as MLink, TextField, Button, Snackbar, Alert } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { footerLinks } from "../navigation";
import { subscribeToNewsletter } from "../api/newsletter";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const quickLinks = footerLinks;

const socials = [
  { icon: <InstagramIcon />, href: "https://www.instagram.com/ActionRobotix", label: "Instagram" },
  { icon: <XIcon />, href: "https://x.com/ActionRobotix", label: "X" },
  { icon: <YouTubeIcon />, href: "https://www.youtube.com/@ActionRobotix", label: "YouTube" },
];

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;

    if (!isSupabaseConfigured) {
      const subject = encodeURIComponent("Newsletter Signup");
      const body = encodeURIComponent(`Please add me to the Action Robotix mailing list.\n\nEmail: ${email}`);
      window.location.href = `mailto:actionrobotix@gmail.com?subject=${subject}&body=${body}`;
      setEmail("");
      return;
    }

    try {
      await subscribeToNewsletter(email);
      setToast({ severity: "success", message: "You're subscribed — thanks for joining!" });
      setEmail("");
    } catch (err) {
      if (err.code === "23505") {
        setToast({ severity: "info", message: "That email is already subscribed." });
        setEmail("");
      } else {
        setToast({ severity: "error", message: "Something went wrong — please try again." });
      }
    }
  };

  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", borderTop: "1px solid rgba(255,255,255,0.08)", mt: 10 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
            p: { xs: 3, md: 4 },
            mb: 5,
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(47,125,255,0.14) 0%, rgba(255,122,26,0.14) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Get season highlights and team news straight to your inbox.
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubscribe} sx={{ display: "flex", gap: 1.5, width: { xs: "100%", md: "auto" } }}>
            <TextField
              size="small"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ minWidth: { xs: 0, sm: 220 }, flexGrow: { xs: 1, md: 0 }, bgcolor: "background.default", borderRadius: 1 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ flexShrink: 0 }}>
              Subscribe
            </Button>
          </Box>
        </Box>

        <Grid2 container spacing={5}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
              <Box component="img" src="./noBGARlogo.png" alt="Action Robotix logo" sx={{ height: 40, width: 40 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Action Robotix
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 320 }}>
              FTC Team 25779 — a student-led robotics team from Chesterfield, St. Louis, Missouri, building
              robots and inspiring STEM in our community since 2024.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              {socials.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  sx={{
                    color: "text.secondary",
                    border: "1px solid rgba(255,255,255,0.1)",
                    "&:hover": { color: "primary.light", borderColor: "primary.main" },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {quickLinks.map((l) => (
                <MLink
                  key={l.path}
                  component="button"
                  onClick={() => navigate(l.path)}
                  underline="hover"
                  sx={{ color: "text.secondary", textAlign: "left", "&:hover": { color: "primary.light" } }}
                >
                  {l.label}
                </MLink>
              ))}
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
              Contact
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1.2 }}>
              <LocationOnIcon fontSize="small" sx={{ color: "primary.light", mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Chesterfield, St. Louis, Missouri
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
              <EmailIcon fontSize="small" sx={{ color: "primary.light" }} />
              <Typography
                variant="body2"
                component="a"
                href="mailto:actionrobotix@gmail.com"
                sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.light" } }}
              >
                actionrobotix@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: "primary.light" }} />
              <Typography
                variant="body2"
                component="a"
                href="tel:+16365796518"
                sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.light" } }}
              >
                (636) 579-6518
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "center", gap: { xs: 0.5, sm: 1.5 } }}>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
            © {new Date().getFullYear()} Action Robotix · FTC Team 25779. Built with pride in St. Louis.
          </Typography>
          <MLink
            component="button"
            onClick={() => navigate("/admin/login")}
            underline="hover"
            sx={{ color: "text.secondary", fontSize: "0.8rem", "&:hover": { color: "primary.light" } }}
          >
            Team Login
          </MLink>
        </Box>
      </Container>

      <Snackbar open={Boolean(toast)} autoHideDuration={5000} onClose={() => setToast(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        {toast && (
          <Alert onClose={() => setToast(null)} severity={toast.severity} variant="filled" sx={{ width: "100%" }}>
            {toast.message}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default Footer;
