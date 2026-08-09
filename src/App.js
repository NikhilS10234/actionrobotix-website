import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import MainApp from './pages/MainApp';
import AboutUs from './pages/AboutUs';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import theme from './theme';

import {
  Outlet,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import FIRST from './pages/FIRST';
import Outreach from './pages/Outreach';
import SupportUs from './pages/SupportUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import FTC from './pages/FTC';
import FRC from './pages/FRC';
import FLL from './pages/FLL';
import JoinUs from './pages/JoinUs';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import Season from './pages/Season';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolios from './pages/Portfolios';
import SubmitPortfolio from './pages/SubmitPortfolio';
import Community from './pages/Community';
import Webinars from './pages/Webinars';
import Podcast from './pages/Podcast';
import Forum from './pages/Forum';
import ForumThread from './pages/ForumThread';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';
import ScrollToTop from './components/ScrollToTop';
import RequireAdmin from './components/RequireAdmin';
import { AuthProvider } from './context/AuthContext';

const Layout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
    <ScrollToTop />
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'fixed',
        top: -80,
        left: 16,
        zIndex: 3000,
        bgcolor: 'primary.main',
        color: '#fff',
        px: 2,
        py: 1,
        borderRadius: 1,
        transition: 'top 0.2s ease',
        '&:focus': { top: 16 },
      }}
    >
      Skip to main content
    </Box>
    <ScrollProgress />
    <ResponsiveAppBar />
    <Box component="main" id="main-content" sx={{ flex: 1 }}>
      <Outlet />
    </Box>
    <Footer />
    <BackToTop />
    <CommandPalette />
  </Box>
);

const routers = createBrowserRouter([
  {
    element: <Layout />,
    children: [
          { path: "/", element: <MainApp /> },
          { path: "/aboutus", element: <AboutUs /> },
          { path: "/first", element: <FIRST /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/outreach", element: <Outreach /> },
          { path: "/join", element: <JoinUs /> },
          { path: "/supportus", element: <SupportUs /> },
          { path: "/contactus", element: <ContactUs /> },
          { path: "/ftc", element: <FTC /> },
          { path: "/frc", element: <FRC /> },
          { path: "/fll", element: <FLL /> },
          { path: "/season", element: <Season /> },
          { path: "/blog", element: <Blog /> },
          { path: "/blog/:slug", element: <BlogPost /> },
          { path: "/portfolios", element: <Portfolios /> },
          { path: "/portfolios/submit", element: <SubmitPortfolio /> },
          { path: "/community", element: <Community /> },
          { path: "/webinars", element: <Webinars /> },
          { path: "/podcast", element: <Podcast /> },
          { path: "/forum", element: <Forum /> },
          { path: "/forum/:id", element: <ForumThread /> },
          { path: "/admin/login", element: <AdminLogin /> },
          { path: "/admin", element: <RequireAdmin><AdminDashboard /></RequireAdmin> },
          { path: "*", element: <NotFound /> },
    ]
  }
]);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <AuthProvider>
          <RouterProvider router={routers} />
        </AuthProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
