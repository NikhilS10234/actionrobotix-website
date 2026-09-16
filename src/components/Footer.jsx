import { Box, Container, Grid2, Typography, IconButton, Divider, Link as MLink } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { footerLinks } from "../navigation";

const quickLinks = footerLinks;

const socials = [
  { icon: <InstagramIcon />, href: "https://www.instagram.com/ActionRobotix", label: "Instagram" },
  { icon: <XIcon />, href: "https://x.com/ActionRobotix", label: "X" },
  { icon: <YouTubeIcon />, href: "https://www.youtube.com/@ActionRobotix", label: "YouTube" },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", borderTop: "1px solid rgba(255,255,255,0.08)", mt: 10 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid2 container spacing={5}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
              <Box component="img" src="./noBGARlogo.png" alt="Action Robotix logo" sx={{ height: 40, width: 40 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Action Robotix
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 320 }}>
              FTC Team 25779, a student-led robotics team from Chesterfield, St. Louis, Missouri, building
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

    </Box>
  );
};

export default Footer;
