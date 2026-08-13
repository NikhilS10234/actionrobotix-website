import { Box, Container, Grid2, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DescriptionIcon from "@mui/icons-material/Description";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const stats = [
  { to: 15, label: "Student Members" },
  { to: 3, label: "Year in FTC", suffix: "rd" },
  { to: 10, suffix: "k+", label: "People Impacted" },
  { to: 37, label: "Countries Reached" },
];

const reasons = [
  { icon: <SchoolIcon />, title: "STEM Access", desc: "Your support helps keep robotics accessible to students across the St. Louis area." },
  { icon: <HandshakeIcon />, title: "Mentorship", desc: "We reinvest into mentoring younger FLL and rookie FTC teams as we grow." },
  { icon: <PublicIcon />, title: "Community Impact", desc: "From the Magic House to local schools, donations fund our outreach events." },
];

const sponsors = [
  "Gene Haas Foundation",
  "Hunt Family Foundation",
  "MiSUMi",
  "Kansas City Chiefs",
  "Polymaker",
  "SendCutSend",
  "St. Louis Cardinals Care Community Fund",
];

const expenses = [
  ["Outreach Supplies", "$1,000"],
  ["New Tools & Parts", "$2,000"],
  ["FTC & Event Registration", "$900"],
  ["3D Printing & CNC", "$1,500"],
  ["Game Set", "$500"],
  ["Travel & Food", "$2,000"],
  ["Team Apparel", "$600"],
];

const tiers = [
  {
    name: "Tier 1: The Gear",
    range: "$1 – $499.99",
    perks: ["Listed on website", "Sent updates on our progress", "Thank-you notes from team"],
  },
  {
    name: "Tier 2: The Wheel",
    range: "$500 – $999.99",
    perks: ["All Tier 1 benefits, plus:", "Logo/name on shirt (small)", "Link on website", "Help with local efforts", "Name listed on our sponsor banner", "Season recap report at year end"],
  },
  {
    name: "Tier 3: The Wiring",
    range: "$1,000 – $1,999.99",
    perks: ["All Tier 2 benefits, plus:", "Logo/name on shirt (medium)", "Logo on robot", "Shoutouts on social media", "Logo on our pit banner", "Thank-you post on social media", "Invitation to team demo days"],
    featured: true,
  },
  {
    name: "Tier 4: The Hub",
    range: "$2,000.00 +",
    perks: [
      "All Tier 3 benefits, plus:",
      "Logo/name on shirt (large)",
      "Company logo at our pit",
      "Logo on marketing materials",
      "Title placement on our website and banner",
      "Logo in outreach handouts and slides",
      "Robot demo at one company event",
      "Feature in our mid-season newsletter",
      "Logo on our competition robot in premium position",
      "Team appearance at a company or recruiting event",
      "Named recognition in award submissions and press",
    ],
  },
];

const donateOnlineSteps = [
  "Choose your donation amount and method",
  "In the instructions box, add your company name + our team name",
  "Fill out payment information",
];

const donateCheckSteps = [
  "Pay out to SLSRA",
  "Put memo as “Action Robotix Donation”",
  "Fill out the rest with payment amount and details",
  "Mail the check in an envelope to P.O. Box 145, Grover, MO 63040",
];

const SupportUs = () => {
  const navigate = useNavigate();
  usePageTitle("Support Us");

  return (
  <PageTransition>
    <PageHero
      eyebrow="FUEL OUR SEASON"
      title="Support Action Robotix"
      subtitle="For the 2026–27 FTC season, we estimate needing $8,500 to compete. Every contribution — big or small — helps us build, travel, and keep bringing robotics to our community."
    />

    {/* STATS */}
    <Box sx={{ ...sectionSx, pt: 0 }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {stats.map((s, i) => (
            <Grid2 key={s.label} size={{ xs: 6, md: 3 }}>
              <Reveal delay={i * 0.08}>
                <Box sx={{ textAlign: "center" }}>
                  <Counter to={s.to} suffix={s.suffix} variant="h3" sx={{ color: "primary.light" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, fontWeight: 600 }}>
                    {s.label}
                  </Typography>
                </Box>
              </Reveal>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>

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
                  Donations go through the St. Louis Student Robotics Association (SLSRA) on our behalf. SLSRA
                  is 501(c)(3) certified, so your donation is tax-deductible — just note "Action Robotix - Team
                  25779" with your gift.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paypal.com/donate?token=KifjwRbbpdFpMUz15_NpA0Io7T5WPVbVbNtohuyC7bCfRHVKS217CCtrgXGbx0FQPPc2szj3snAwzGOt"
                  >
                    Donate Now
                  </Button>
                  <Box
                    component="img"
                    src="Images/QRCode.png"
                    alt="Scan to donate"
                    sx={{ height: 100, width: 100, borderRadius: 2, border: "1px solid rgba(255,255,255,0.1)", bgcolor: "#fff", p: 0.5 }}
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
                  2026–27 Marketing Packet — it outlines our team's goals, how we help the community, and the
                  ways and benefits of partnering with us.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="docs/Action-Robotix-Marketing-Packet-2026-27.pdf"
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

    <Box sx={sectionSx}>
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

    {/* BUDGET */}
    <Box sx={sectionSx}>
      <Container maxWidth="md">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              WHY YOUR SUPPORT MATTERS
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
              2026–27 Estimated Budget
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              What we expect to need this season: <Box component="span" sx={{ fontWeight: 700, color: "primary.light" }}>$8,500</Box>
            </Typography>
          </Box>
        </Reveal>
        <Reveal>
          <Box sx={{ ...glassCardSx, p: { xs: 3, md: 4 } }}>
            {expenses.map(([label, amount]) => (
              <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, pb: 1.5, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {amount}
                </Typography>
              </Box>
            ))}
            <Box sx={{ display: "flex", justifyContent: "space-between", pt: 1 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" sx={{ color: "secondary.light", fontWeight: 800 }}>
                $8,500.00
              </Typography>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>

    {/* SPONSORSHIP TIERS */}
    <Box sx={sectionSx}>
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
                  <Typography variant="h6" sx={{ mb: 0.5, textAlign: "center", fontWeight: 800 }}>
                    {t.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, textAlign: "center", color: "primary.light", fontWeight: 700 }}>
                    {t.range}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, flexGrow: 1 }}>
                    {t.perks.map((perk) => {
                      const isHeader = perk.endsWith(":");
                      return isHeader ? (
                        <Typography key={perk} variant="caption" sx={{ color: "text.secondary", fontStyle: "italic", mt: 0.5 }}>
                          {perk}
                        </Typography>
                      ) : (
                        <Box key={perk} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                          <CheckCircleIcon sx={{ fontSize: 18, color: "primary.light", mt: 0.3, flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {perk}
                          </Typography>
                        </Box>
                      );
                    })}
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

    {/* IN-KIND SUPPORT + HOW TO DONATE */}
    <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Reveal delay={0}>
              <Box sx={{ ...glassCardSx, p: 3.5, height: "100%" }}>
                <InventoryIcon sx={{ color: "primary.light", fontSize: 32, mb: 1.5 }} />
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  In-Kind Support
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Support doesn't have to be a check. Product and service donations count toward the same
                  tiers at retail value — Polymaker donated filament for our 3D printing, and SendCutSend
                  covered laser parts for our drivetrain. We also welcome machining or manufacturing services,
                  software licenses, meeting or event space, and employee mentorship hours.
                </Typography>
              </Box>
            </Reveal>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Reveal delay={0.1}>
              <Box sx={{ ...glassCardSx, p: 3.5, height: "100%" }}>
                <FavoriteIcon sx={{ color: "primary.light", fontSize: 32, mb: 1.5 }} />
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  Online (Credit / Debit / PayPal)
                </Typography>
                {donateOnlineSteps.map((s, i) => (
                  <Typography key={s} variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    {i + 1}. {s}
                  </Typography>
                ))}
              </Box>
            </Reveal>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Reveal delay={0.2}>
              <Box sx={{ ...glassCardSx, p: 3.5, height: "100%" }}>
                <MailIcon sx={{ color: "primary.light", fontSize: 32, mb: 1.5 }} />
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  Check (Mailed)
                </Typography>
                {donateCheckSteps.map((s, i) => (
                  <Typography key={s} variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    {i + 1}. {s}
                  </Typography>
                ))}
              </Box>
            </Reveal>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  </PageTransition>
  );
};

export default SupportUs;
