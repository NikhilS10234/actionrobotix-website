import { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import RobotModel from "./RobotModel";
import RobotCanvasErrorBoundary from "./RobotCanvasErrorBoundary";

const RobotScene = ({ activePart = -1, height = 440, hint = true, allowZoom = true }) => (
  <Box sx={{ position: "relative", height, borderRadius: 4, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", bgcolor: "#0d1220" }}>
    <RobotCanvasErrorBoundary>
      <Canvas shadows camera={{ position: [2.6, 1.9, 2.6], fov: 38 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.15} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-3, 2, -2]} intensity={12} color="#2f7dff" />
        <pointLight position={[2.5, 1.2, -3]} intensity={10} color="#ff7a1a" />
        <Suspense fallback={null}>
          <RobotModel activePart={activePart} />
          <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={4.5} blur={2.4} far={2} />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={allowZoom}
          minDistance={2.4}
          maxDistance={4.6}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 5}
          autoRotate
          autoRotateSpeed={1.1}
        />
      </Canvas>
    </RobotCanvasErrorBoundary>
    {hint && (
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.55)",
          bgcolor: "rgba(10,14,23,0.5)",
          px: 1.5,
          py: 0.5,
          borderRadius: 999,
          pointerEvents: "none",
        }}
      >
        Drag to rotate · Scroll to zoom
      </Typography>
    )}
  </Box>
);

export default RobotScene;
