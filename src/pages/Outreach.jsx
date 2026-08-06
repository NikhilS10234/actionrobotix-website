import { Box, Container, Grid2, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupsIcon from "@mui/icons-material/Groups";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PublicIcon from "@mui/icons-material/Public";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const bigStats = [
  { to: 37, label: "Outreach Events" },
  { to: 7200, suffix: "+", label: "People Impacted" },
  { to: 450, suffix: "+", label: "Volunteer Hours" },
  { to: 18, label: "FLL Teams Started or Mentored" },
  { to: 24, label: "STEM Professionals Engaged" },
  { to: 2500, prefix: "$", suffix: "+", label: "Raised in Grants & Fundraising" },
];

const reach = [
  { to: 27, label: "States" },
  { to: 16, label: "Countries" },
  { to: 6, label: "Continents" },
];

const photoEvents = [
  {
    title: "FLL Team Mentoring",
    desc:
      "Action Robotix regularly engages with the community through coaching and mentoring FLL teams — 18 FLL teams started or mentored to date, including our feeder teams Action Robotics-FLL, Eager Eagles, Golden Falcons, and Control-Alt-Delete.",
    img: "Images/FLLMentor.jpeg",
  },
  {
    title: "Magic House Star Wars STEM Night",
    desc:
      "400+ community members joined us at the Magic House in St. Louis, where we showcased our custom 3D-printed B2 bot and shared our love of robotics with the STL region.",
    img: "Images/magichouseevent.jpg",
  },
];

const programs = [
  {
    title: "Global Robotics Exchange",
    desc: "Coordinated across 10 time zones — hosted sessions reaching 21 teams from 16 countries.",
  },
  {
    title: "Mentoring the Thunderbots (Turkey)",
    desc: "Guided this Turkish FLL team to qualify for the FLL World Championship and win the Robot Performance Award at Turkish Nationals.",
  },
  {
    title: "Ghana Partnership",
    desc: "In a pilot program with The Smart Kids Ghana Association, we brought virtual STEM and robotics education to 80+ students in underserved communities every Saturday for 3+ hours.",
  },
  {
    title: "Founded STEM For All",
    desc: "A student-run nonprofit founded to expand STEM access across the greater St. Louis area — 23+ outreach events, $2,000+ raised to launch new FLL/FTC teams, and 6+ school/organization partnerships.",
  },
  {
    title: "Team-Led Robotics Summer Camp",
    desc: "100+ hours of lesson planning for ages 4–12 — block coding, Bricklink Studio CAD, and Tinkercad final projects. Helped launch new FLL teams: Eager Eagles, Majestic Pointe, and Golden Falcons.",
  },
  {
    title: "Boeing STEAM & Space Day",
    desc: "2,000+ attendees got hands-on robot driving time with our competition robot.",
  },
  {
    title: "SciFest Robot Expo",
    desc: "3,000+ attendees at the Science Center saw FTC robotics up close.",
  },
  {
    title: "Harris-Stowe University Showcase",
    desc: "An HBCU showcase focused on access to robotics for underrepresented communities.",
  },
  {
    title: "FRC Regional Championship (Chaifetz Arena)",
    desc: "Introduced FIRST, FTC, and FLL to parents and kids at Missouri's biggest FIRST event.",
  },
  {
    title: "Chess Cardinals Presentation",
    desc: "Presented FTC robotics to nearly 70 chess players and their parents at Chess Cardinals in Chesterfield — connecting robotics and chess through strategy and logic.",
  },
  {
    title: "Bastian Solutions Facility Tour",
    desc: "Explored industrial automation and met with a Senior Automation Engineer.",
  },
  {
    title: "Balvihar Community Showcase",
    desc: "Brought robotics demos to our local community.",
  },
  {
    title: "FTC Survival Guide Book",
    desc: "A 20-page guide for rookie FTC teams — a 4-month project scoring 9.4/10 for helpfulness from alumni reviewers.",
  },
];

const teamsImpacted = ["Teksense (FLL)", "Thunderbots (FLL)", "Eager Eagles (FLL)", "Action Robotics (FLL)", "Control C (FTC)", "Kryptons (FTC)"];
const teamsThatImpactedUs = ["Blue Bot Builders (FTC)", "SPARK (FTC)", "Gear Kingdom (FTC)", "Astrovo (FTC)", "HYDRQ (FTC)", "RoboRaiders (FRC)"];

const resources = [
  {
    icon: <LibraryBooksIcon />,
    title: "FIRST Inspires",
    desc: "The official home of FIRST — program guides, season materials, and everything a new team needs to get started.",
    href: "https://www.firstinspires.org/",
  },
  {
    icon: <GroupsIcon />,
    title: "Ask Us Anything",
    desc: "Mentoring an FLL team or just getting started? Reach out — we're happy to share what's worked for us.",
    href: "/contactus",
    internal: true,
  },
  {
    icon: <VideoLibraryIcon />,
    title: "Watch Us Build",
    desc: "Follow along with build season, competitions, and team updates on our YouTube channel.",
    href: "https://www.youtube.com/@ActionRobotix",
  },
];

const Outreach = () => {
  usePageTitle("Outreach");
  const navigate = useNavigate();

  return (
    <PageTransition>
      <PageHero
        eyebrow="COMMUNITY FIRST"
        title="Outreach"
        subtitle="37 events. 7,000+ people. 6 continents. At Action Robotix, sharing STEM with the world is as important as the robot itself."
      />

      {/* BY THE NUMBERS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={4} sx={{ mb: 5 }}>
            {bigStats.map((s, i) => (
              <Grid2 key={s.label} size={{ xs: 6, sm: 4, md: 2.4 }}>
                <Reveal delay={i * 0.06}>
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
          <Reveal>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 3, md: 6 },
                flexWrap: "wrap",
                p: 3,
                borderRadius: 4,
                background: "linear-gradient(135deg, rgba(47,125,255,0.12) 0%, rgba(255,122,26,0.12) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <PublicIcon sx={{ color: "secondary.main", fontSize: 36 }} />
              {reach.map((r) => (
                <Box key={r.label} sx={{ textAlign: "center" }}>
                  <Counter to={r.to} variant="h4" sx={{ color: "secondary.light" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                    {r.label} of Impact
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Container>
      </Box>

      {/* PHOTO HIGHLIGHTS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={5}>
            {photoEvents.map((e, i) => (
              <Grid2 key={e.title} size={{ xs: 12, md: 6 }}>
                <Reveal delay={i * 0.1} direction={i % 2 === 0 ? "right" : "left"}>
                  <Box sx={{ ...glassCardSx, overflow: "hidden", height: "100%" }}>
                    <Box sx={{ height: 320, overflow: "hidden" }}>
                      <Box
                        component="img"
                        src={e.img}
                        alt={e.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s ease",
                          "&:hover": { transform: "scale(1.06)" },
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 3.5 }}>
                      <Typography variant="h5" sx={{ mb: 1.5 }}>
                        {e.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary" }}>
                        {e.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* NOTABLE PROGRAMS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                FROM CHESTERFIELD TO SIX CONTINENTS
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Notable Programs & Events
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {programs.map((p, i) => (
              <Grid2 key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={(i % 3) * 0.08}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "primary.light" }}>
                      {p.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* TEAMS NETWORK */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Key Teams We've Impacted
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {teamsImpacted.map((t) => (
                      <Chip key={t} label={t} sx={{ bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 600 }} />
                    ))}
                  </Box>
                </Box>
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Key Teams That Impacted Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {teamsThatImpactedUs.map((t) => (
                      <Chip key={t} label={t} sx={{ bgcolor: "rgba(255,122,26,0.14)", color: "secondary.light", fontWeight: 600 }} />
                    ))}
                  </Box>
                </Box>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* RESOURCES */}
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                FOR TEAMS WE MENTOR
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
                Resources to Get Started
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
                A few places to start whether you're coaching an FLL team, mentoring FTC, or just curious about
                robotics.
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {resources.map((r, i) => (
              <Grid2 key={r.title} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3.5, height: "100%", textAlign: "center" }}>
                    <Box sx={{ color: "primary.light", mb: 1.5 }}>{r.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {r.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.5 }}>
                      {r.desc}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      {...(r.internal
                        ? { onClick: () => navigate(r.href) }
                        : { href: r.href, target: "_blank", rel: "noopener noreferrer" })}
                    >
                      Visit
                    </Button>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default Outreach;
