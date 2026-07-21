import { Component } from "react";
import { Box, Typography } from "@mui/material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

class RobotCanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            color: "text.secondary",
          }}
        >
          <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />
          <Typography variant="body2">3D preview isn't available in this browser.</Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default RobotCanvasErrorBoundary;
