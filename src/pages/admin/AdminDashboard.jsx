import { useState } from "react";
import { Box, Container, Typography, Tabs, Tab, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import usePageTitle from "../../hooks/usePageTitle";
import { useAuth } from "../../context/AuthContext";
import AdminBlogManager from "./AdminBlogManager";
import AdminPortfolioManager from "./AdminPortfolioManager";
import AdminNewsletterManager from "./AdminNewsletterManager";
import AdminSettingsManager from "./AdminSettingsManager";
import AdminWebinarManager from "./AdminWebinarManager";
import AdminPodcastManager from "./AdminPodcastManager";
import AdminForumManager from "./AdminForumManager";

const TABS = [
  { label: "Blog", Component: AdminBlogManager },
  { label: "Portfolios", Component: AdminPortfolioManager },
  { label: "Webinars", Component: AdminWebinarManager },
  { label: "Podcast", Component: AdminPodcastManager },
  { label: "Forum", Component: AdminForumManager },
  { label: "Newsletter", Component: AdminNewsletterManager },
  { label: "Site Settings", Component: AdminSettingsManager },
];

const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState(0);
  const ActiveComponent = TABS[tab].Component;

  return (
    <Box sx={{ pt: { xs: 12, md: 14 }, pb: 10, minHeight: "80vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4">Admin Dashboard</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Signed in as {user?.email}
            </Typography>
          </Box>
          <Button variant="outlined" color="secondary" startIcon={<LogoutIcon />} onClick={signOut}>
            Sign Out
          </Button>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 4, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {TABS.map((t) => (
            <Tab key={t.label} label={t.label} />
          ))}
        </Tabs>

        <ActiveComponent />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
