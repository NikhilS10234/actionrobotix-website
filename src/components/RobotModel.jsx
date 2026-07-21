import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT_BLUE = "#2f7dff";
const ACCENT_ORANGE = "#ff7a1a";
const METAL = "#232a3d";
const DARK_TRIM = "#3a4258";

// Maps to the `robotParts` array order in FTC.jsx
export const PART_INDEX = { drivetrain: 0, intake: 1, lift: 2, hub: 3, power: 4, bumpers: 5 };

const RobotModel = ({ activePart = -1 }) => {
  const groupRef = useRef();
  const wheelRefs = useRef([]);
  const armRef = useRef();
  const clawLeftRef = useRef();
  const clawRightRef = useRef();
  const ledRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    const wheelSpeed = activePart === PART_INDEX.drivetrain ? 7 : 1;
    wheelRefs.current.forEach((w) => {
      if (w) w.rotation.x += delta * wheelSpeed;
    });

    if (armRef.current) {
      const target = activePart === PART_INDEX.lift ? 0.55 : 0.12;
      armRef.current.position.y = THREE.MathUtils.lerp(armRef.current.position.y, target, delta * 3);
    }

    const clawTarget = activePart === PART_INDEX.intake ? 0.55 : 0.05;
    if (clawLeftRef.current) {
      clawLeftRef.current.rotation.z = THREE.MathUtils.lerp(clawLeftRef.current.rotation.z, clawTarget, delta * 4);
    }
    if (clawRightRef.current) {
      clawRightRef.current.rotation.z = THREE.MathUtils.lerp(clawRightRef.current.rotation.z, -clawTarget, delta * 4);
    }

    if (ledRef.current) {
      const isActive = activePart === PART_INDEX.hub;
      const base = isActive ? 2.4 : 0.5;
      const wobble = Math.sin(t * (isActive ? 6 : 2)) * (isActive ? 0.8 : 0.2);
      ledRef.current.material.emissiveIntensity = base + wobble;
    }

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.025;
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const color = (key, base) => (activePart === PART_INDEX[key] ? ACCENT_ORANGE : base);
  const glow = (key) => (activePart === PART_INDEX[key] ? 0.65 : 0);

  return (
    <group ref={groupRef}>
      {/* Chassis */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.22, 1.4]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Bumpers */}
      {[
        { pos: [-0.95, 0.3, 0], size: [0.08, 0.24, 1.5] },
        { pos: [0.95, 0.3, 0], size: [0.08, 0.24, 1.5] },
        { pos: [0, 0.3, 0.75], size: [1.9, 0.24, 0.08] },
        { pos: [0, 0.3, -0.75], size: [1.9, 0.24, 0.08] },
      ].map((b, i) => (
        <mesh key={i} position={b.pos} castShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={color("bumpers", ACCENT_BLUE)}
            emissive={ACCENT_ORANGE}
            emissiveIntensity={glow("bumpers")}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Wheels */}
      {[
        [-0.85, 0.07, 0.55],
        [0.85, 0.07, 0.55],
        [-0.85, 0.07, -0.55],
        [0.85, 0.07, -0.55],
      ].map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => (wheelRefs.current[i] = el)}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.26, 0.26, 0.2, 20]} />
          <meshStandardMaterial
            color={activePart === PART_INDEX.drivetrain ? ACCENT_ORANGE : "#0d1017"}
            roughness={0.9}
            emissive={ACCENT_ORANGE}
            emissiveIntensity={glow("drivetrain")}
          />
        </mesh>
      ))}

      {/* Control hub + LED */}
      <mesh position={[-0.4, 0.53, 0]} castShadow>
        <boxGeometry args={[0.32, 0.16, 0.3]} />
        <meshStandardMaterial
          color={color("hub", ACCENT_BLUE)}
          metalness={0.3}
          roughness={0.4}
          emissive={ACCENT_ORANGE}
          emissiveIntensity={glow("hub")}
        />
      </mesh>
      <mesh ref={ledRef} position={[-0.4, 0.64, 0.11]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color={ACCENT_BLUE} emissive={ACCENT_BLUE} emissiveIntensity={0.8} />
      </mesh>

      {/* Battery / power system */}
      <mesh position={[0.5, 0.48, 0]} castShadow>
        <boxGeometry args={[0.34, 0.16, 0.26]} />
        <meshStandardMaterial
          color={color("power", DARK_TRIM)}
          emissive={ACCENT_ORANGE}
          emissiveIntensity={glow("power")}
        />
      </mesh>

      {/* Lift / arm */}
      <group position={[0, 0.4, -0.48]}>
        <mesh castShadow>
          <boxGeometry args={[0.09, 0.85, 0.09]} />
          <meshStandardMaterial
            color={color("lift", DARK_TRIM)}
            emissive={ACCENT_ORANGE}
            emissiveIntensity={glow("lift")}
          />
        </mesh>
        <mesh ref={armRef} position={[0, 0.12, 0.32]} castShadow>
          <boxGeometry args={[0.46, 0.07, 0.46]} />
          <meshStandardMaterial
            color={color("lift", ACCENT_BLUE)}
            emissive={ACCENT_ORANGE}
            emissiveIntensity={glow("lift")}
          />
        </mesh>
      </group>

      {/* Intake / claw */}
      <group position={[0, 0.26, 0.85]}>
        <mesh ref={clawLeftRef} position={[-0.13, 0, 0]} castShadow>
          <boxGeometry args={[0.26, 0.055, 0.055]} />
          <meshStandardMaterial
            color={color("intake", ACCENT_ORANGE)}
            emissive={ACCENT_ORANGE}
            emissiveIntensity={glow("intake")}
          />
        </mesh>
        <mesh ref={clawRightRef} position={[0.13, 0, 0]} castShadow>
          <boxGeometry args={[0.26, 0.055, 0.055]} />
          <meshStandardMaterial
            color={color("intake", ACCENT_ORANGE)}
            emissive={ACCENT_ORANGE}
            emissiveIntensity={glow("intake")}
          />
        </mesh>
      </group>
    </group>
  );
};

export default RobotModel;
