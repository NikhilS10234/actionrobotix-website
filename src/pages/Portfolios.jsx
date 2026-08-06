import { useEffect, useMemo, useState } from "react";
import { Box, Container, Grid2, Typography, TextField, Button, CircularProgress, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchApprovedPortfolios } from "../api/portfolios";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const Portfolios = () => {
  usePageTitle("Portfolio Database");
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchApprovedPortfolios()
      .then(setPortfolios)
      .catch(() => setError("Couldn't load portfolios right now."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return portfolios;
    const q = query.toLowerCase();
    return portfolios.filter(
      (p) =>
        p.team_name.toLowerCase().includes(q) ||
        p.team_number.toLowerCase().includes(q) ||
        p.season.toLowerCase().includes(q)
    );
  }, [portfolios, query]);

  return (
    <PageTransition>
      <PageHero
        eyebrow="FOR THE FTC COMMUNITY"
        title="Team Portfolio Database"
        subtitle="Browse engineering portfolios shared by FTC teams from around the world — and submit your own to help other teams learn."
      />

      {!isSupabaseConfigured ? (
        <BackendNotice feature="The portfolio database" />
      ) : (
        <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "space-between", alignItems: { sm: "center" }, mb: 5 }}>
              <TextField
                placeholder="Search by team name, number, or season…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ flexGrow: 1, maxWidth: 480 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
              />
              <Button variant="contained" color="primary" onClick={() => navigate("/portfolios/submit")}>
                Submit Your Portfolio
              </Button>
            </Box>

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center" }}>
                {error}
              </Typography>
            )}
            {!loading && !error && filtered.length === 0 && (
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center" }}>
                {portfolios.length === 0 ? "No portfolios yet — be the first to submit one!" : "No portfolios match your search."}
              </Typography>
            )}

            <Grid2 container spacing={3}>
              {filtered.map((p, i) => (
                <Grid2 key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Reveal delay={i * 0.06}>
                    <Box sx={{ ...glassCardSx, p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                      <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700 }}>
                        Team {p.team_number} · {p.season}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {p.team_name}
                      </Typography>
                      {p.description && (
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, flexGrow: 1 }}>
                          {p.description}
                        </Typography>
                      )}
                      <Button
                        endIcon={<OpenInNewIcon />}
                        variant="outlined"
                        color="primary"
                        href={p.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ alignSelf: "flex-start", mt: "auto" }}
                      >
                        View Portfolio
                      </Button>
                    </Box>
                  </Reveal>
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </Box>
      )}
    </PageTransition>
  );
};

export default Portfolios;
