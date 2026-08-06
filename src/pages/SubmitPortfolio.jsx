import { useState } from "react";
import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { submitPortfolio } from "../api/portfolios";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const emptyForm = { team_number: "", team_name: "", season: "", portfolio_url: "", description: "", contact_email: "" };

const SubmitPortfolio = () => {
  usePageTitle("Submit Your Portfolio");
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.team_number.trim()) nextErrors.team_number = "Required";
    if (!form.team_name.trim()) nextErrors.team_name = "Required";
    if (!form.season.trim()) nextErrors.season = "Required, e.g. 2025-2026";
    if (!/^https?:\/\/\S+$/.test(form.portfolio_url)) nextErrors.portfolio_url = "Please enter a valid link (starting with http:// or https://)";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await submitPortfolio(form);
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <PageTransition>
        <BackendNotice feature="Portfolio submissions" />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHero
        eyebrow="SHARE YOUR WORK"
        title="Submit Your Portfolio"
        subtitle="Share a link to your team's engineering portfolio so other FTC teams can learn from it. Submissions are reviewed before appearing in the database."
      />

      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="sm">
          <Reveal>
            <Box sx={{ ...glassCardSx, p: { xs: 3, md: 5 } }}>
              {status === "success" ? (
                <Alert severity="success">
                  Thanks! Your portfolio was submitted and will appear once it's reviewed.
                </Alert>
              ) : (
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  {status === "error" && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      Something went wrong submitting your portfolio — please try again.
                    </Alert>
                  )}
                  <TextField
                    fullWidth
                    label="Team Number"
                    value={form.team_number}
                    onChange={handleChange("team_number")}
                    error={Boolean(errors.team_number)}
                    helperText={errors.team_number}
                    sx={{ mb: 2.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Team Name"
                    value={form.team_name}
                    onChange={handleChange("team_name")}
                    error={Boolean(errors.team_name)}
                    helperText={errors.team_name}
                    sx={{ mb: 2.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Season"
                    placeholder="e.g. 2025-2026"
                    value={form.season}
                    onChange={handleChange("season")}
                    error={Boolean(errors.season)}
                    helperText={errors.season}
                    sx={{ mb: 2.5 }}
                  />
                  <TextField
                    fullWidth
                    label="Portfolio Link"
                    placeholder="https://drive.google.com/..."
                    value={form.portfolio_url}
                    onChange={handleChange("portfolio_url")}
                    error={Boolean(errors.portfolio_url)}
                    helperText={errors.portfolio_url}
                    sx={{ mb: 2.5 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    label="Description (optional)"
                    value={form.description}
                    onChange={handleChange("description")}
                    sx={{ mb: 2.5 }}
                  />
                  <TextField
                    fullWidth
                    type="email"
                    label="Contact Email (optional)"
                    value={form.contact_email}
                    onChange={handleChange("contact_email")}
                    sx={{ mb: 3 }}
                  />
                  <Button type="submit" fullWidth size="large" variant="contained" color="primary" disabled={status === "submitting"}>
                    {status === "submitting" ? "Submitting…" : "Submit Portfolio"}
                  </Button>
                </Box>
              )}
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mt: 3 }}>
                <Box component="span" sx={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/portfolios")}>
                  Back to the portfolio database
                </Box>
              </Typography>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default SubmitPortfolio;
