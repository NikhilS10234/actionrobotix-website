import { useState } from "react";
import { Box, Container, Grid2, Typography, IconButton, Button, TextField, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import PageHero from "./components/PageHero";
import Reveal from "./components/Reveal";
import PageTransition from "./components/PageTransition";
import { glassCardSx, sectionSx } from "./components/styles";
import usePageTitle from "./hooks/usePageTitle";

const details = [
  { icon: <PhoneIcon />, label: "Phone", value: "(636) 579-6518", href: "tel:+16365796518" },
  { icon: <EmailIcon />, label: "Email", value: "actionrobotix@gmail.com", href: "mailto:actionrobotix@gmail.com" },
  { icon: <LocationOnIcon />, label: "Address", value: "Chesterfield, St. Louis, Missouri" },
];

const hours = [
  { day: "Sunday", time: "2:30 – 4:30 PM" },
  { day: "Tuesday", time: "5:30 – 7:30 PM" },
];

const socials = [
  { icon: <InstagramIcon />, href: "https://www.instagram.com/ActionRobotix", label: "Instagram" },
  { icon: <XIcon />, href: "https://x.com/ActionRobotix", label: "X" },
  { icon: <YouTubeIcon />, href: "https://www.youtube.com/@ActionRobotix", label: "YouTube" },
];

const emptyForm = { name: "", email: "", message: "" };

const ContactUs = () => {
  usePageTitle("Contact Us");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Please enter a valid email";
    if (!form.message.trim()) nextErrors.message = "Please enter a message";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Message from ${form.name} via actionrobotix.com`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:actionrobotix@gmail.com?subject=${subject}&body=${body}`;
    setToastOpen(true);
    setForm(emptyForm);
  };

  return (
    <PageTransition>
      <PageHero eyebrow="LET'S TALK" title="Contact Us" subtitle="Questions, sponsorship interest, or want to say hi? We'd love to hear from you." />

      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: 340 }}>
                  <Box
                    component="iframe"
                    title="Action Robotix location map"
                    src="https://www.google.com/maps?q=Chesterfield,+Missouri&output=embed"
                    sx={{ width: "100%", height: "100%", border: 0, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
                    loading="lazy"
                  />
                </Box>
              </Reveal>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Box sx={{ ...glassCardSx, p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Contact Details
                  </Typography>
                  {details.map((d) => (
                    <Box key={d.label} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ color: "primary.light" }}>{d.icon}</Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                          {d.label}
                        </Typography>
                        {d.href ? (
                          <Typography component="a" href={d.href} variant="body1" sx={{ color: "text.primary", textDecoration: "none", "&:hover": { color: "primary.light" } }}>
                            {d.value}
                          </Typography>
                        ) : (
                          <Typography variant="body1">{d.value}</Typography>
                        )}
                      </Box>
                    </Box>
                  ))}

                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
                    <Box sx={{ color: "primary.light" }}>
                      <ScheduleIcon />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                        Contact Hours
                      </Typography>
                      {hours.map((h) => (
                        <Typography key={h.day} variant="body2">
                          {h.day}: {h.time}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3, pt: 3, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1.5 }}>
                      Follow Us
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
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
                  </Box>
                </Box>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* CONTACT FORM */}
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="sm">
          <Reveal>
            <Box sx={{ ...glassCardSx, p: { xs: 3, md: 5 } }}>
              <Typography variant="h5" sx={{ mb: 0.5, textAlign: "center" }}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mb: 4 }}>
                This opens your email app with the message pre-filled — nothing is sent automatically.
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={form.name}
                  onChange={handleChange("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  sx={{ mb: 2.5 }}
                />
                <TextField
                  fullWidth
                  type="email"
                  label="Your Email"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{ mb: 2.5 }}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Message"
                  value={form.message}
                  onChange={handleChange("message")}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  sx={{ mb: 3 }}
                />
                <Button type="submit" fullWidth size="large" variant="contained" color="primary" endIcon={<SendIcon />}>
                  Send Message
                </Button>
              </Box>
            </Box>
          </Reveal>
        </Container>
      </Box>

      <Snackbar open={toastOpen} autoHideDuration={5000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setToastOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
          Opening your email client — thanks for reaching out!
        </Alert>
      </Snackbar>
    </PageTransition>
  );
};

export default ContactUs;
