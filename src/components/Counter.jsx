import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Typography } from "@mui/material";

const Counter = ({ to, prefix = "", suffix = "", duration = 1.6, variant = "h3", sx }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, to, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => setDisplay(Math.round(latest)));
    return unsubscribe;
  }, [springValue]);

  return (
    <Typography ref={ref} variant={variant} sx={{ fontVariantNumeric: "tabular-nums", ...sx }}>
      {prefix}
      {display}
      {suffix}
    </Typography>
  );
};

export default Counter;
