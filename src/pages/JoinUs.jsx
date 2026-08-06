import { Box, Container, Grid2, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import CampaignIcon from "@mui/icons-material/Campaign";
import BrushIcon from "@mui/icons-material/Brush";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const benefits = [
  { icon: <SchoolIcon />, title: "Real Engineering Skills", desc: "Hands-on CAD, fabrication, and programming experience you can't get from a textbook." },
  { icon: <GroupsIcon />, title: "Teamwork That Matters", desc: "Work shoulder-to-shoulder with teammates toward a shared, deadline-driven goal." },
  { icon: <WorkspacePremiumIcon />, title: "FIRST Scholarships", desc: "FIRST partners with universities and organizations offering scholarships to program alumni." },
  { icon: <EmojiObjectsIcon />, title: "Community Impact", desc: "Mentor younger teams and bring STEM to events across the St. Louis area." },
];

const subteams = [
  { icon: <BrushIcon />, title: "Design", desc: "CAD the robot in Fusion 360, sketch and model concepts, and drive our 6-step design cycle." },
  { icon: <BuildIcon />, title: "Build", desc: "Fabricate and assemble the robot — from CNC aluminum chassis work to 3D-printed mechanisms." },
  { icon: <CodeIcon />, title: "Programming", desc: "Write autonomous routines, PIDF control, and auto-aiming systems in Java with SolversLib and PedroPathing." },
  { icon: <CampaignIcon />, title: "Outreach", desc: "Run community events, mentor FLL teams, manage sponsorships, and share our story worldwide." },
];

const steps = [
  { title: "Reach Out", desc: "Send us a message through our Contact page — tell us a bit about yourself and what interests you." },
  { title: "Come Say Hi", desc: "Stop by one of our meetings to see how we work and meet the team in person." },
  { title: "Pick a Sub-Team", desc: "Find the area that fits you best — programming, build, outreach, or media." },
  { title: "Start Building", desc: "Jump into the current season and start contributing right away." },
];

const faqs = [
  { q: "Do I need robotics experience to join?", a: "No — we welcome members of all experience levels, from complete beginners to students who've competed before. What matters most is curiosity and a willingness to learn." },
  { q: "What's the time commitment?", a: "We meet regularly throughout the season (see our Contact page for current meeting times), with additional hours during intense build and competition periods." },
  { q: "I'm not interested in engineering — can I still help?", a: "Absolutely. Outreach, business, marketing, and media are just as vital to our team as build and programming." },
  { q: "Is there a cost to join?", a: "Robotics does involve costs for parts, registration, and travel — which is part of why we rely on community support. Reach out to us directly for specifics." },
];

const JoinUs = () => {
  const navigate = useNavigate();
  usePageTitle("Join Us");

  return (
    <PageTransition>
      <PageHero
        eyebrow="BUILD WITH US"
        title="Join Action Robotix"
        subtitle="We're recruiting 9 new members for the 2026–27 season from our feeder FLL teams — Action Robotics-FLL, Eager Eagles, Golden Falcons, and Control-Alt-Delete — and we welcome curious, driven students of every background."
      />

      {/* WHY JOIN */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 6 }}>
              Why Join?
            </Typography>
          </Reveal>
          <Grid2 container spacing={3}>
            {benefits.map((b, i) => (
              <Grid2 key={b.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%", textAlign: "center" }}>
                    <Box sx={{ color: "primary.light", mb: 1.5 }}>{b.icon}</Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      {b.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {b.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* SUB-TEAMS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                FIND YOUR FIT
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Our Sub-Teams
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {subteams.map((s, i) => (
              <Grid2 key={s.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%", textAlign: "center" }}>
                    <Box sx={{ color: "secondary.main", mb: 1.5 }}>{s.icon}</Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                      {s.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {s.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* HOW TO JOIN */}
      <Box sx={sectionSx}>
        <Container maxWidth="md">
          <Reveal>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 6 }}>
              How to Get Involved
            </Typography>
          </Reveal>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                left: { xs: 19, md: "50%" },
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: "rgba(255,255,255,0.1)",
                transform: { md: "translateX(-50%)" },
              }}
            />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3, mb: 4, position: "relative" }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#fff",
                      background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                      zIndex: 1,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box sx={{ ...glassCardSx, p: 2.5, flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {s.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {s.desc}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={sectionSx}>
        <Container maxWidth="md">
          <Reveal>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 5 }}>
              Frequently Asked Questions
            </Typography>
          </Reveal>
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <Accordion
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid rgba(255,255,255,0.08)",
                  "&:before": { display: "none" },
                  mb: 1.5,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600 }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {f.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 }, textAlign: "center" }}>
        <Container maxWidth="sm">
          <Reveal>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Ready to build something great?
            </Typography>
            <Button size="large" variant="contained" color="primary" onClick={() => navigate("/contactus")}>
              Get In Touch
            </Button>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default JoinUs;
