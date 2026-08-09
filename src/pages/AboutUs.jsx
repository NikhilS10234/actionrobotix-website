import { Box, Container, Grid2, Typography, Chip } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BrushIcon from "@mui/icons-material/Brush";
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import CampaignIcon from "@mui/icons-material/Campaign";
import SportsIcon from "@mui/icons-material/Sports";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const subteams = [
  {
    name: "Design",
    icon: <BrushIcon />,
    members: [
      { name: "Ashvik Kothari", grade: "Design Lead · 3rd Year", img: "Images/ashvik.png" },
      { name: "Arnav Anilkumar", grade: "Business · 2nd Year", img: "Images/arnavA.png" },
      { name: "Keshav Pallavur", grade: "Fundraising · 2nd Year", img: "Images/keshav.png" },
    ],
  },
  {
    name: "Build",
    icon: <BuildIcon />,
    members: [
      { name: "Arjun Arun", grade: "Build Lead · 3rd Year", img: "Images/arjun.png" },
      { name: "Arnav Madhavan", grade: "Mechanical · 2nd Year", img: "Images/arnavM.png" },
      { name: "Mihir Choudhary", grade: "Organization · 2nd Year", img: "Images/mihir.png" },
    ],
  },
  {
    name: "Programming",
    icon: <CodeIcon />,
    members: [
      { name: "Adi Ganesh", grade: "Programming Lead · 3rd Year", img: "Images/adi.png" },
      { name: "Vihaan Punjabi", grade: "Impact · 3rd Year", img: "Images/vihaan.png" },
      { name: "Ayush Rausaria", grade: "Event Planning · 2nd Year", img: "Images/ayush.png" },
      { name: "Harsha Konakandla", grade: "Scheduling · Rookie" },
    ],
  },
  {
    name: "Outreach",
    icon: <CampaignIcon />,
    members: [
      { name: "Ishaan Vitthala", grade: "Outreach Lead & Captain · 3rd Year", img: "Images/ishaan.png" },
      { name: "Nikhil", grade: "Outreach Lead", img: "Images/nikhil.jpeg" },
      { name: "Naisha Salaria", grade: "Local Outreach · 2nd Year", img: "Images/Naisha.png" },
      { name: "Anvika Malugu", grade: "International Outreach · Rookie" },
      { name: "Saideep Kondamadugula", grade: "Local Outreach · Rookie" },
    ],
  },
];

const coaches = [
  { name: "Ganesh", role: "Head Coach" },
  { name: "Krish", role: "Design Coach" },
  { name: "Prakash", role: "Build Coach" },
];

const results = [
  {
    title: "League Tournament",
    robot: "Inhibitor",
    award: "1st — Sustain Award",
    detail: "101.17 point average across the tournament.",
  },
  {
    title: "Eastern Missouri Super Qualifier",
    robot: "Catalyst",
    award: "1st — Inspire Award + Winning Alliance",
    detail: "135.5 point average — top honor and the alliance title in one event.",
  },
  {
    title: "MO/KS State Championship & League Tournament",
    robot: "Catalyst V2",
    award: "1st — Sustain Award",
    detail: "Placed 8th in Advancement Points and qualified for the Chicago Robotics Invitational (CRI).",
  },
  {
    title: "Chicago Robotics Invitational",
    robot: "Catalyst 2.0",
    award: "Qualified & Competed",
    detail: "Brought our third robot iteration to compete against some of the best teams in the country.",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const MemberCard = ({ member }) => (
  <Box sx={{ borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", bgcolor: "background.paper", height: "100%" }}>
    <Box sx={{ overflow: "hidden", aspectRatio: "1 / 1", "&:hover img": { transform: "scale(1.08)" } }}>
      {member.img ? (
        <Box
          component="img"
          src={member.img}
          alt={member.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(47,125,255,0.35) 0%, rgba(255,122,26,0.35) 100%)",
          }}
        >
          <Typography variant="h3" sx={{ color: "rgba(255,255,255,0.85)" }}>
            {initials(member.name)}
          </Typography>
        </Box>
      )}
    </Box>
    <Box sx={{ px: 1.25, py: 1.25, textAlign: "center" }}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1.3, wordBreak: "break-word" }}>
        {member.name}
      </Typography>
      {member.grade && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {member.grade}
        </Typography>
      )}
    </Box>
  </Box>
);

const AboutUs = () => {
  usePageTitle("About Us");

  return (
  <PageTransition>
    <PageHero
      eyebrow="OUR STORY"
      title="About Action Robotix"
      subtitle="FTC Team 25779 — an entirely student-led robotics team from Chesterfield, Missouri, now in our second season."
    />

    {/* MISSION */}
    <Box sx={sectionSx}>
      <Container maxWidth="lg">
        <Grid2 container spacing={6} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Reveal direction="right">
              <Box
                component="img"
                src="Images/ABOUTUSMAIN.png"
                alt="Action Robotix team"
                sx={{ width: "100%", borderRadius: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
              />
            </Reveal>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Reveal direction="left">
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                OUR MISSION
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
                Every action needs a catalyst.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
                To design cutting-edge robotics solutions and foster a passion for STEM in our community,
                through collaboration and outreach, while maintaining a welcoming and inclusive environment
                for everyone — from aspiring engineers to artists.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Founded in 2024, we're entirely student-led: captains and division leads manage our teams,
                projects, and goals across four subteams, each with its own training pipeline — backed by an
                extensive mentor network of industry professionals, university professors, and fellow FIRST
                members.
              </Typography>
              <Grid2 container spacing={3} sx={{ mt: 3 }}>
                {[
                  { to: 2024, label: "Founded" },
                  { to: 15, label: "Students" },
                  { to: 4, label: "Subteams" },
                ].map((s) => (
                  <Grid2 key={s.label} size={4}>
                    <Counter to={s.to} variant="h4" sx={{ color: "primary.light" }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {s.label}
                    </Typography>
                  </Grid2>
                ))}
              </Grid2>
            </Reveal>
          </Grid2>
        </Grid2>
      </Container>
    </Box>

    {/* TEAM ROSTER BY SUBTEAM */}
    <Box sx={sectionSx}>
      <Container maxWidth="lg">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              STUDENT-LED, SUBTEAM-DRIVEN
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
              Meet Our Team
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 640, mx: "auto" }}>
              Four subteams — Design, Build, Programming, and Outreach — each led by captains who manage
              projects, train new members, and set the team's goals.
            </Typography>
          </Box>
        </Reveal>

        {subteams.map((st) => (
          <Box key={st.name} sx={{ mb: 6 }}>
            <Reveal>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <Box sx={{ color: "primary.light", display: "flex" }}>{st.icon}</Box>
                <Typography variant="h5">{st.name}</Typography>
                <Chip
                  label={`${st.members.length} members`}
                  size="small"
                  sx={{ bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }}
                />
              </Box>
            </Reveal>
            <Grid2 container spacing={3}>
              {st.members.map((member, i) => (
                <Grid2 key={member.name} size={{ xs: 6, sm: 4, md: 2.4 }}>
                  <Reveal delay={i * 0.05}>
                    <MemberCard member={member} />
                  </Reveal>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        ))}
      </Container>
    </Box>

    {/* COACHES */}
    <Box sx={sectionSx}>
      <Container maxWidth="md">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              GUIDING THE WAY
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              Our Coaches
            </Typography>
          </Box>
        </Reveal>
        <Grid2 container spacing={3} justifyContent="center">
          {coaches.map((c, i) => (
            <Grid2 key={c.name} size={{ xs: 12, sm: 4 }}>
              <Reveal delay={i * 0.1}>
                <Box sx={{ ...glassCardSx, p: 3.5, textAlign: "center", height: "100%" }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      mx: "auto",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                    }}
                  >
                    <SportsIcon sx={{ color: "#fff" }} />
                  </Box>
                  <Typography variant="h6">{c.name}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {c.role}
                  </Typography>
                </Box>
              </Reveal>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>

    {/* AWARDS & RESULTS */}
    <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <Reveal>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
              2025–26 DECODE SEASON
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              Awards & Results
            </Typography>
          </Box>
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
          {results.map((r, i) => {
            const leftSide = i % 2 === 0;
            return (
              <Box
                key={r.title}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: leftSide ? "row" : "row-reverse" },
                  alignItems: "center",
                  gap: 3,
                  mb: 5,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 19, md: "50%" },
                    transform: "translateX(-50%)",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                    border: "3px solid #0a0e17",
                    zIndex: 1,
                  }}
                />
                <Box sx={{ width: { xs: 0, md: "calc(50% - 24px)" }, display: { xs: "none", md: "block" } }} />
                <Box sx={{ pl: { xs: 6, md: 0 }, width: { xs: "100%", md: "calc(50% - 24px)" } }}>
                  <Reveal direction={leftSide ? "right" : "left"} delay={i * 0.1}>
                    <Box sx={{ ...glassCardSx, p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                        <EmojiEventsIcon sx={{ color: "secondary.main", fontSize: 28, flexShrink: 0 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                          {r.title}
                        </Typography>
                      </Box>
                      <Chip
                        label={`ROBOT: ${r.robot.toUpperCase()}`}
                        size="small"
                        sx={{ mb: 1.5, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "secondary.light", mb: 0.5 }}>
                        {r.award}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {r.detail}
                      </Typography>
                    </Box>
                  </Reveal>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  </PageTransition>
  );
};

export default AboutUs;
