import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import MainApp from './MainApp';
import AboutUs from './AboutUs';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import theme from './theme';

import {
  Outlet,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import FIRST from './FIRST';
import Projects from './Projects';
import Outreach from './Outreach';
import SupportUs from './SupportUs';
import ContactUs from './ContactUs';
import Footer from './Footer';
import FTC from './FTC';
import FRC from './FRC';
import FLL from './FLL';
import JoinUs from './JoinUs';
import Gallery from './Gallery';
import Robot from './Robot';
import History from './History';
import NotFound from './NotFound';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';
import ScrollToTop from './components/ScrollToTop';

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
          { path: "/robot", element: <Robot /> },
          { path: "/history", element: <History /> },
          { path: "/first", element: <FIRST /> },
          { path: "/projects", element: <Projects /> },
          { path: "/gallery", element: <Gallery /> },
          { path: "/outreach", element: <Outreach /> },
          { path: "/join", element: <JoinUs /> },
          { path: "/supportus", element: <SupportUs /> },
          { path: "/contactus", element: <ContactUs /> },
          { path: "/ftc", element: <FTC /> },
          { path: "/frc", element: <FRC /> },
          { path: "/fll", element: <FLL /> },
          { path: "*", element: <NotFound /> },
    ]
  }
]);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <RouterProvider router={routers} />
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
