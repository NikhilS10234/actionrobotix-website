import { Box, Container, Grid2, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupsIcon from "@mui/icons-material/Groups";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MicIcon from "@mui/icons-material/Mic";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const programs = [
  {
    title: "Bastian Solutions Facility Tour",
    desc: "A behind-the-scenes look at industrial automation and robotics engineering in action.",
    img: "Images/BastianSolution.png",
  },
  {
    title: "Magic House Star Wars STEM Night",
    desc: "Showcased our FTC robots at a themed community STEM night.",
    img: "Images/magichouseevent.jpg",
  },
  {
    title: "Boeing STEAM & Space Day",
    desc: "Shared robotics with families and students at a community STEAM event.",
    img: "Images/BOEING.png",
  },
  {
    title: "SciFest Robot Expo",
    desc: "Brought FTC robotics to the Science Center for hands-on demos.",
    img: "Images/SCIFest.png",
  },
  {
    title: "Chess Cardinals Presentation",
    desc: "Introduced FTC robotics to local chess players and their families.",
    img: "Images/ChessCardinals.png",
  },
];

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
        subtitle="At Action Robotix, sharing STEM with the world is as important as the robot itself."
      />

      {/* NOTABLE PROGRAMS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                BUILDING MORE THAN ROBOTS
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
                  <Box sx={{ ...glassCardSx, overflow: "hidden", height: "100%" }}>
                    {p.img && (
                      <Box sx={{ height: 160, overflow: "hidden" }}>
                        <Box
                          component="img"
                          src={p.img}
                          alt={p.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
                            "&:hover": { transform: "scale(1.06)" },
                          }}
                        />
                      </Box>
                    )}
                    <Box sx={{ p: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "primary.light" }}>
                        {p.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {p.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* PODCAST */}
      <Box sx={sectionSx}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ ...glassCardSx, p: { xs: 3.5, md: 5 }, textAlign: "center" }}>
              <MicIcon sx={{ fontSize: 44, color: "secondary.main", mb: 1.5 }} />
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                NEW — IN COLLABORATION WITH HIGH FIVE ROBOTICS
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, mb: 1.5 }}>
                The High Action Podcast
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 620, mx: "auto", mb: 1.5 }}>
                Conversations with World-level robotics teams, professors, and industry professionals about how they
                build, compete, and grow.
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                New episodes every Sunday · 10–15 minutes
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate("/podcast")}>
                Listen to the Podcast
              </Button>
            </Box>
          </Reveal>
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
