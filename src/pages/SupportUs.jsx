import { Box, Container, Grid2, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DescriptionIcon from "@mui/icons-material/Description";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const reasons = [
  { icon: <SchoolIcon />, title: "STEM Access", desc: "Your support helps keep robotics accessible to students across the St. Louis area." },
  { icon: <HandshakeIcon />, title: "Mentorship", desc: "We reinvest into mentoring younger FLL teams as we grow." },
  { icon: <PublicIcon />, title: "Community Impact", desc: "From the Magic House to local schools, donations fund our outreach events." },
];

const sponsors = [
  "Gene Haas Foundation",
  "Jabil",
  "FRC Tees",
  "Actuonix Motion Devices",
  "Polymaker",
  "DEKA Foundation",
  "Bosch",
  "Mastercard",
  "Hunt Family Foundation",
  "St. Louis Cardinals Care Community Fund",
];

const income = [
  ["Gene Haas Foundation", "$2,000"],
  ["2024–25 Balance Carryover", "$1,350"],
  ["FTC 2nd Year Grant", "$750"],
  ["Sports Foundations", "$555"],
];

const expenses = [
  ["Robot Parts", "$1,932.44"],
  ["Odometry / Sensors", "$682.81"],
  ["Full Season Set", "$555.12"],
  ["Electronics", "$498.22"],
];

const fundraisers = [
  "Raffled a Kansas City Chiefs signed football",
  "Raised $500+ for FIRST Programs across Missouri",
  "Hosted a 3D-printed filament recycling drive (6+ lbs donated)",
];

const tiers = [
  { name: "Bronze", perks: ["Name listed on our website", "Shoutout on social media"] },
  { name: "Silver", perks: ["Everything in Bronze", "Logo on our website", "Mentioned in team updates"], featured: false },
  { name: "Gold", perks: ["Everything in Silver", "Logo featured on our robot", "Invitation to competitions"], featured: true },
  { name: "Title Sponsor", perks: ["Everything in Gold", "Top billing on our Marketing Packet", "Direct partnership with team leadership"] },
];

const SupportUs = () => {
  const navigate = useNavigate();
  usePageTitle("Support Us");

  return (
  <PageTransition>
    <PageHero
      eyebrow="FUEL OUR SEASON"
      title="Support Action Robotix"
      subtitle="Parts, registration, tools, and travel add up fast. Every dollar raised supports the team's growth and helps finance our objectives for the 2024–25 FTC season."
    />

    <Box sx={sectionSx}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Reveal direction="right">
              <Box sx={{ ...glassCardSx, p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                <FavoriteIcon sx={{ color: "secondary.main", fontSize: 40, mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  Donate to Our Team
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, flexGrow: 1 }}>
                  One of the best ways to help is donating to our team's GoFundMe. We are truly grateful for
                  every contribution, and it directly supports our ability to compete this season.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.gofundme.com/f/Robotix-international"
                  >
                    Donate Now
                  </Button>
                  <Box
                    component="img"
                    src="Images/QRCode.jpg"
                    alt="Scan to donate"
                    sx={{ height: 100, width: 100, borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </Box>
              </Box>
            </Reveal>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Reveal direction="left">
              <Box sx={{ ...glassCardSx, p: 4, height: "100%", display: "flex", flexDirection: "column" }}>
                <DescriptionIcon sx={{ color: "primary.light", fontSize: 40, mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  Sponsor Our Team
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, flexGrow: 1 }}>
                  If you or a company you're affiliated with is interested in sponsoring us, check out our
                  Marketing Packet — it outlines our team's history and goals, how we help the community,
                  and the ways and benefits of partnering with us.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://drive.google.com/file/d/1s7wc0u2HNA8D4mPnVXOmPtAwsu6trrUq/view"
                  >
                    View Marketing Packet
                  </Button>
                  <Box
                    component="img"
                    src="Images/Handshake.png"
                    alt="Partner with us"
                    sx={{ height: 100, width: 100, objectFit: "contain" }}
                  />
                </Box>
              </Box>
            </Reveal>
          </Grid2>
        </Grid2>
      </Container>
    </Box>

    <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              WHY IT MATTERS
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              Where Your Support Goes
            </Typography>
          </Box>
        </Reveal>
        <Grid2 container spacing={4}>
          {reasons.map((r, i) => (
            <Grid2 key={r.title} size={{ xs: 12, md: 4 }}>
              <Reveal delay={i * 0.1}>
                <Box sx={{ ...glassCardSx, p: 4, height: "100%", textAlign: "center" }}>
                  <Box sx={{ color: "primary.light", mb: 1.5 }}>{r.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {r.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {r.desc}
                  </Typography>
                </Box>
              </Reveal>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>

    {/* OUR SPONSORS */}
    <Box sx={sectionSx}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              THANK YOU
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
              Our Sponsors
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mx: "auto" }}>
              These organizations make our season possible. Special credit to SendCutSend and Polymaker —
              parts of our robot are literally built around their donated materials and services.
            </Typography>
          </Box>
        </Reveal>
        <Reveal>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
            {sponsors.map((s) => (
              <Chip
                key={s}
                label={s}
                sx={{
                  px: 1,
                  py: 2.4,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "text.primary",
                }}
              />
            ))}
          </Box>
        </Reveal>
      </Container>
    </Box>

    {/* BUDGET SNAPSHOT */}
    <Box sx={sectionSx}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              TRANSPARENCY
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
              2025–26 Budget Snapshot
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Total income and expenses this season: <Box component="span" sx={{ fontWeight: 700, color: "primary.light" }}>$5,905</Box>
            </Typography>
          </Box>
        </Reveal>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Reveal delay={0}>
              <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Major Income
                </Typography>
                {income.map(([label, amount]) => (
                  <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.2, pb: 1.2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {amount}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Reveal delay={0.1}>
              <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Major Expenses
                </Typography>
                {expenses.map(([label, amount]) => (
                  <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.2, pb: 1.2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {amount}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Reveal delay={0.2}>
              <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Fundraisers
                </Typography>
                {fundraisers.map((f) => (
                  <Box key={f} sx={{ display: "flex", gap: 1.5, mb: 1.5, alignItems: "flex-start" }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "secondary.main", mt: 1, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {f}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Grid2>
        </Grid2>
      </Container>
    </Box>

    {/* SPONSORSHIP TIERS */}
    <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              PARTNER WITH US
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
              Sponsorship Tiers
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
              Every partnership level helps fuel our season. Reach out to us to find the right fit for your
              organization.
            </Typography>
          </Box>
        </Reveal>
        <Grid2 container spacing={3}>
          {tiers.map((t, i) => (
            <Grid2 key={t.name} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 0.1}>
                <Box
                  sx={{
                    ...glassCardSx,
                    p: 3.5,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderColor: t.featured ? "secondary.main" : undefined,
                    position: "relative",
                  }}
                >
                  {t.featured && (
                    <Chip
                      label="MOST POPULAR"
                      size="small"
                      sx={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", bgcolor: "secondary.main", color: "#0a0e17", fontWeight: 700 }}
                    />
                  )}
                  <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: 800 }}>
                    {t.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, flexGrow: 1 }}>
                    {t.perks.map((perk) => (
                      <Box key={perk} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: "primary.light", mt: 0.3 }} />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {perk}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Reveal>
            </Grid2>
          ))}
        </Grid2>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button variant="outlined" color="primary" onClick={() => navigate("/contactus")}>
            Contact Us About Sponsorship
          </Button>
        </Box>
      </Container>
    </Box>
  </PageTransition>
  );
};

export default SupportUs;
