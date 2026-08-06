import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2f7dff", light: "#6ba3ff", dark: "#1a5ad9", contrastText: "#ffffff" },
    secondary: { main: "#ff7a1a", light: "#ff9c4d", dark: "#d4600a", contrastText: "#0a0e17" },
    background: { default: "#0a0e17", paper: "#111726" },
    text: { primary: "#eef1f8", secondary: "#9aa5ba" },
    divider: "rgba(255,255,255,0.08)",
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Sora", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"Sora", sans-serif', fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontFamily: '"Sora", sans-serif', fontWeight: 700, letterSpacing: "-0.01em" },
    h4: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Sora", sans-serif', fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, padding: "10px 26px" },
        containedPrimary: {
          background: "linear-gradient(135deg, #2f7dff 0%, #1a5ad9 100%)",
          boxShadow: "0 8px 24px rgba(47,125,255,0.35)",
          "&:hover": { boxShadow: "0 10px 30px rgba(47,125,255,0.5)" },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #ff9c4d 0%, #ff7a1a 100%)",
          boxShadow: "0 8px 24px rgba(255,122,26,0.35)",
          "&:hover": { boxShadow: "0 10px 30px rgba(255,122,26,0.5)" },
        },
        outlined: { borderWidth: 2, "&:hover": { borderWidth: 2 } },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(10,14,23,0.75)",
          backdropFilter: "blur(14px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
  },
});

export default theme;
