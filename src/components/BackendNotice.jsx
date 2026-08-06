import { Box, Container, Typography } from "@mui/material";
import { glassCardSx } from "./styles";

const BackendNotice = ({ feature }) => (
  <Container maxWidth="sm" sx={{ py: 8 }}>
    <Box sx={{ ...glassCardSx, p: 4, textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        {feature} isn't set up yet
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        This feature needs the site's Supabase backend to be configured. See SETUP.md in the project
        root for setup steps.
      </Typography>
    </Box>
  </Container>
);

export default BackendNotice;
