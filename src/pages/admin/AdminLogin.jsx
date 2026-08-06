import { useState } from "react";
import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PageHero from "../../components/PageHero";
import PageTransition from "../../components/PageTransition";
import BackendNotice from "../../components/BackendNotice";
import { glassCardSx, sectionSx } from "../../components/styles";
import usePageTitle from "../../hooks/usePageTitle";
import { useAuth } from "../../context/AuthContext";
import { requestPasswordReset } from "../../api/auth";
import { isSupabaseConfigured } from "../../lib/supabaseClient";

const AdminLogin = () => {
  usePageTitle("Team Login");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(location.state?.from?.pathname ?? "/admin", { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter your email above first, then click Forgot Password.");
      return;
    }
    try {
      await requestPasswordReset(email);
      setResetSent(true);
    } catch {
      setError("Couldn't send a reset email — try again later.");
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <PageTransition>
        <BackendNotice feature="The admin panel" />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHero eyebrow="TEAM ACCESS" title="Team Login" subtitle="For Action Robotix team members managing the site." />
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="xs">
          <Box sx={{ ...glassCardSx, p: { xs: 3, md: 5 } }}>
            {resetSent && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Password reset email sent — check your inbox.
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2.5 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button type="submit" fullWidth size="large" variant="contained" color="primary" disabled={submitting} sx={{ mb: 2 }}>
                {submitting ? "Signing in…" : "Sign In"}
              </Button>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                <Box component="span" sx={{ cursor: "pointer", textDecoration: "underline", color: "text.secondary" }} onClick={handleResetPassword}>
                  Forgot password?
                </Box>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default AdminLogin;
