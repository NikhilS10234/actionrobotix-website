import { Box, Container, Grid2, Typography, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import PaidIcon from "@mui/icons-material/Paid";
import PublicIcon from "@mui/icons-material/Public";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import PageTransition from "../components/PageTransition";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";

const goals = [
  "Coordinate and share FIRST and STEM within the community in as many ways as possible",
  "Create a competitive and innovative robot using advanced techniques and strategies",
  "Connect with companies, mentors, and other teams",
];

const timeline = [
  {
    title: "Pre-Season (Summer)",
    desc: "Learned Java and CAD, split into subteams, built a basic chassis, and held early outreach mentoring FLL teams.",
  },
  {
    title: "1st Meet — Nov. 23",
    desc: "After the season kickoff at Marquette High School, built the GoBilda starter bot with mecanum wheels.",
  },
  {
    title: "2nd Meet — Dec. 7",
    desc: "Switched the intake to a claw. Despite battery issues, went 4–2 thanks to the ascent mechanism and autonomous.",
  },
  {
    title: "3rd Meet — Jan. 4",
    desc: "Spent winter break completely remodeling the robot into a claw-to-claw design — but it ended up ½ inch too tall, forcing a revert to the old design and a rough meet.",
  },
  {
    title: "4th Meet — Jan. 11",
    desc: "A focused week on programming and drivers paid off: a strong autonomous and improved TeleOp carried the team to 5–1 — the best performance of the season.",
  },
  {
    title: "League Tournament Prep",
    desc: "The biggest redesign yet — an intake-to-claw system with two horizontal and two vertical slide kits, and new hardware throughout.",
  },
];

const robotEvolution = [
  { name: "Basic Chassis", desc: "Six-wheeled pre-season build, later cut down to a mecanum design." },
  { name: "GoBilda Starter Bot", desc: "Mecanum wheels added at season reveal; chain and motor issues made it ineffective at Meet 1." },
  { name: "Claw-Equipped Robot", desc: "Durability and battery-charging issues at Meet 2 — but still went 4–2." },
  { name: "Remodeled Robot", desc: "½ inch oversized, forcing a revert to a modified old design; still went 5–1 at Meet 4." },
  { name: "Intake-to-Claw Robot", desc: "The final major iteration for the League Tournament, with dual slide kits." },
];

const components = [
  { title: "Claw", desc: "3D-printed, single servo, three iterations — moved from a metal-base/gear design to an all-3D-printed design for more clearance." },
  { title: "Mini-Arm", desc: "Originally metal channels with a flip servo and motor — too heavy, damaged servos, and once fell off. Redesigned as a lightweight 3D-printed arm on a servo." },
  { title: "Intake", desc: "Originally fully 3D-printed with multiple servos — too complex and inefficient. Simplified to a mix of 3D-printed and metal parts using cut-up gecko wheels for smoother intake." },
  { title: "Slide Kits", desc: "2-stage and 4-stage telescoping slides for reaching height and distance — one of the most critical scoring components." },
  { title: "Chassis", desc: "Started six-wheeled, cut to four wheels with a mecanum design; bevel gears solved motor placement issues." },
];

const problems = [
  { problem: "Weak 3D-printed parts (the claw broke)", fix: "Switched to more compact designs and ABS filament for durability" },
  { problem: "CAD-to-reality mismatches", fix: "Added a team-wide design review before builds" },
  { problem: "Heavy rotating claw arm caused tipping", fix: "Redesigned as a lighter 3D-printed, servo-driven arm" },
  { problem: "Battery dropping from 12V to 6–7V", fix: "Traced to a bad charger, not the battery" },
  { problem: "Screws stripping/breaking in hard-to-reach spots", fix: "Never fully solved — flagged as an ongoing challenge" },
  { problem: "Robot ½ inch over the height limit", fix: "Had to revert designs; became a standing lesson to check dimension limits early" },
];

const programming = [
  "Code written in Java on Android Studio, split into Initialization (hardware maps) and a Main Loop",
  "Progressed from time/power-based motor control to encoder-based control with ticks-per-second for precision",
  "Added strafing and splining for autonomous movement",
  "Used nested conditionals to let drivers toggle multiple mechanisms with single button presses",
  "Solved JDK/SDK compatibility issues (reverted to JDK 13, Android Studio Koala), a driver-station USB port failure (external USB hub workaround), and inconsistent servo positions (a tracked ServoPos variable reset at init)",
  "Added encoders to the arm for consistent specimen hanging in autonomous — boosting the auto score to 27+ points",
  "Identified RoadRunner/PedroPathing as a goal for future seasons — later adopted in the DECODE season",
];

const strategyEvolution = [
  {
    phase: "Autonomous",
    desc: "Started with a simple push-and-park; evolved to scoring specimens on the high chamber using encoders (+15 points). By the tournament, the team ran two separate autonomous routines — high basket and specimen-based — designed to not depend on an alliance partner.",
  },
  {
    phase: "TeleOp",
    desc: "Started picking samples from the submersible for the low basket plus a Level 2 ascent (unreliable); evolved to a claw-based strategy scoring 4–5 specimens with a consistent Level 2 ascent (~75 pts avg, up from ~30). The final strategy combined specimen hangs and high-basket samples via efficient human-player exchanges.",
  },
];

const rookieOutreachStats = [
  { to: 15, suffix: "+", label: "Teams Inspired" },
  { to: 1000, suffix: "+", label: "People Impacted" },
  { to: 25, suffix: "+", label: "People Who Helped Us" },
  { to: 1700, suffix: "+", label: "Social Media Interactions" },
];

const quotes = [
  {
    quote:
      "This season was a great learning experience that would help us for future seasons... I've realized that starting the season strong is important, as you can avoid last-minute scrambles.",
    name: "Arnav A",
  },
  {
    quote:
      "We had a strong season as a rookie team... Next season I would like to see more advanced coding, designing, and building techniques to take our robot to the next level.",
    name: "Nikhil",
  },
  {
    quote: "Success is not final, failure is not fatal, it is the courage to continue that counts.",
    name: "Ishaan",
  },
];

const History = () => {
  const navigate = useNavigate();
  usePageTitle("Our History — Rookie Season");

  return (
    <PageTransition>
      <PageHero
        eyebrow="INTO THE DEEP · 2024–25 · ROOKIE SEASON"
        title="Where It All Began"
        subtitle="Our first-ever FTC season — built on FIRST LEGO League roots, twice-a-week team meetings, and a lot of hard lessons."
      />

      {/* GOALS + ORG */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <Reveal direction="right">
                <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                  THE ROOKIE YEAR
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, mb: 2 }}>
                  Three Goals, One Season
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
                  We came into INTO THE DEEP with FIRST LEGO League experience and a clear plan. Full team
                  meetings ran twice a week — Tuesdays and Sundays — with subteams working independently in
                  between, organized through Google Drive, GitHub, Android Studio, and Discord.
                </Typography>
                {goals.map((g, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 2, mb: 2, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#fff",
                        background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {g}
                    </Typography>
                  </Box>
                ))}
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Reveal direction="left">
                <Box
                  component="img"
                  src="Images/RandomRobotInAction.jpg"
                  alt="Rookie season robot in action"
                  sx={{ width: "100%", borderRadius: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
                />
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* SEASON TIMELINE */}
      <Box sx={sectionSx}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                MEET BY MEET
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Season Timeline
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
            {timeline.map((t, i) => {
              const leftSide = i % 2 === 0;
              return (
                <Box
                  key={t.title}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: leftSide ? "row" : "row-reverse" },
                    alignItems: "center",
                    gap: 3,
                    mb: 4,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 19, md: "50%" },
                      transform: "translateX(-50%)",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2f7dff, #ff7a1a)",
                      border: "3px solid #0a0e17",
                      zIndex: 1,
                    }}
                  />
                  <Box sx={{ width: { xs: 0, md: "calc(50% - 24px)" }, display: { xs: "none", md: "block" } }} />
                  <Box sx={{ pl: { xs: 6, md: 0 }, width: { xs: "100%", md: "calc(50% - 24px)" } }}>
                    <Reveal direction={leftSide ? "right" : "left"} delay={i * 0.06}>
                      <Box sx={{ ...glassCardSx, p: 2.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {t.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {t.desc}
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

      {/* ROBOT EVOLUTION + COMPONENTS */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <BuildIcon sx={{ color: "primary.light", fontSize: 36, mb: 1 }} />
              <Typography variant="h3">The Rookie Robot</Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3} sx={{ mb: 5 }}>
            {robotEvolution.map((r, i) => (
              <Grid2 key={r.name} size={{ xs: 12, sm: 6, md: 2.4 }}>
                <Reveal delay={i * 0.07}>
                  <Box sx={{ ...glassCardSx, p: 2.5, height: "100%" }}>
                    <Chip
                      label={`V${i + 1}`}
                      size="small"
                      sx={{ mb: 1.5, bgcolor: "rgba(47,125,255,0.12)", color: "primary.light", fontWeight: 700 }}
                    />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {r.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {r.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>

          <Grid2 container spacing={3}>
            {components.map((c, i) => (
              <Grid2 key={c.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Reveal delay={(i % 3) * 0.08}>
                  <Box sx={{ ...glassCardSx, p: 3, height: "100%" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "primary.light" }}>
                      {c.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {c.desc}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* PROBLEMS & SOLUTIONS */}
      <Box sx={sectionSx}>
        <Container maxWidth="md">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                LEARNING THE HARD WAY
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Problems & Solutions
              </Typography>
            </Box>
          </Reveal>
          {problems.map((p, i) => (
            <Reveal key={p.problem} delay={i * 0.05}>
              <Box sx={{ ...glassCardSx, p: 2.5, mb: 2, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, flex: 1 }}>
                  {p.problem}
                </Typography>
                <Typography variant="body2" sx={{ color: "secondary.light", flex: 1 }}>
                  → {p.fix}
                </Typography>
              </Box>
            </Reveal>
          ))}
        </Container>
      </Box>

      {/* PROGRAMMING JOURNEY */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid2 container spacing={5}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <CodeIcon sx={{ color: "primary.light" }} />
                  <Typography variant="h4">The Programming Journey</Typography>
                </Box>
                {programming.map((p, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5, alignItems: "flex-start" }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.light", mt: 1, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {p}
                    </Typography>
                  </Box>
                ))}
              </Reveal>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                  <RocketLaunchIcon sx={{ color: "secondary.main" }} />
                  <Typography variant="h4">Strategy Evolution</Typography>
                </Box>
                {strategyEvolution.map((s) => (
                  <Box key={s.phase} sx={{ ...glassCardSx, p: 3, mb: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "primary.light" }}>
                      {s.phase}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {s.desc}
                    </Typography>
                  </Box>
                ))}
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* FINANCES */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <PaidIcon sx={{ color: "primary.light", fontSize: 36, mb: 1 }} />
              <Typography variant="h3">Rookie Season Finances</Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="right">
                <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Season Cost: ≈$6,500
                  </Typography>
                  {[
                    ["Parts", "$4,500"],
                    ["Tools & Supplies", "$1,000"],
                    ["Registration & League Fees", "$500"],
                    ["Other", "$500"],
                  ].map(([label, amount]) => (
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
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Reveal direction="left">
                <Box sx={{ ...glassCardSx, p: 4, height: "100%" }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Funds Raised: ≈$7,000
                  </Typography>
                  {[
                    ["Gene Haas Foundation Grant", "$2,000"],
                    ["DEKA / Bosch / Jabil Grant", "$750"],
                    ["Actuonix Sponsorship", "$250"],
                    ["Team Member Fees", "$4,000"],
                  ].map(([label, amount]) => (
                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.2, pb: 1.2, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {amount}
                      </Typography>
                    </Box>
                  ))}
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 2 }}>
                    Rookie season sponsors: Gene Haas Foundation, Jabil, Bosch, Actuonix Motion Devices, DEKA Foundation
                  </Typography>
                </Box>
              </Reveal>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* ROOKIE OUTREACH */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <PublicIcon sx={{ color: "secondary.main", fontSize: 36, mb: 1 }} />
              <Typography variant="h3" sx={{ mb: 2 }}>
                Rookie Year Outreach
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 680, mx: "auto" }}>
                From the Magic House and a Spectrum News interview to the Missouri Ganesha Temple event (50+
                people, sparking 2 new FLL teams), the Chess Cardinals presentation, and a Global Robotics
                Exchange spanning 13+ teams across 5 continents — including sharing our claw design with a
                team from Libya.
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={4} sx={{ mb: 5 }}>
            {rookieOutreachStats.map((s, i) => (
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
          <Reveal>
            <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", maxWidth: 680, mx: "auto" }}>
              Special thanks to our rookie-year mentors: Amit Jha (who taught the team Java through a 4-week
              course), Mr. Bhora (who helped 3D print parts), and Abhi Ganesh (FTC alum and software engineer
              who helped re-engineer the robot).
            </Typography>
          </Reveal>
        </Container>
      </Box>

      {/* TEAM VOICES */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Reveal>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 2 }}>
                TEAM VOICES
              </Typography>
              <Typography variant="h3" sx={{ mt: 1 }}>
                Reflections on Season One
              </Typography>
            </Box>
          </Reveal>
          <Grid2 container spacing={3}>
            {quotes.map((q, i) => (
              <Grid2 key={q.name} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.1}>
                  <Box sx={{ ...glassCardSx, p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>
                    <FormatQuoteIcon sx={{ color: "secondary.main", fontSize: 34, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: "text.secondary", fontStyle: "italic", flexGrow: 1, mb: 2 }}>
                      "{q.quote}"
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.light" }}>
                      — {q.name}
                    </Typography>
                  </Box>
                </Reveal>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Reveal>
            <Box
              sx={{
                textAlign: "center",
                p: { xs: 4, md: 6 },
                borderRadius: 6,
                background: "linear-gradient(135deg, rgba(47,125,255,0.16) 0%, rgba(255,122,26,0.16) 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>
                Every goal from season one — achieved in season two.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
                Integrate PedroPathing, add more sensors, set realistic goals, and expand outreach impact —
                the rookie season's ending goals became the DECODE season's reality.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => navigate("/robot")}>
                See Where We Are Now: Catalyst
              </Button>
            </Box>
          </Reveal>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default History;
