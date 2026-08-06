import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { glassCardSx } from "./styles";
import { useAuth } from "../context/AuthContext";

const ForumSignIn = ({ redirectPath }) => {
  const { signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await signInWithMagicLink(email, redirectPath);
      setSent(true);
    } catch {
      setError("Couldn't send the sign-in link. Check the email and try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Box sx={{ ...glassCardSx, p: 3, textAlign: "center" }}>
        <Typography variant="body1">
          Check <strong>{email}</strong> for a sign-in link — click it to come back here and post.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ ...glassCardSx, p: 3 }}>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
        Sign in with your email to post — no password needed, just a one-click link. Anyone can join the
        conversation.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
        <TextField
          required
          type="email"
          size="small"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 220 }}
        />
        <Button type="submit" variant="contained" startIcon={sending ? <CircularProgress size={16} /> : <EmailIcon />} disabled={sending}>
          Send Sign-In Link
        </Button>
      </Box>
    </Box>
  );
};

export default ForumSignIn;
