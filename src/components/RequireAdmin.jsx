import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import BackendNotice from "./BackendNotice";

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const { user, isAdmin, loading } = useAuth();

  if (!isSupabaseConfigured) {
    return <BackendNotice feature="The admin panel" />;
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
