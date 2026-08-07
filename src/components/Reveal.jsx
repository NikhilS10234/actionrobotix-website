import { motion } from "framer-motion";

const DIRECTIONS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { y: 0, x: 40 },
  right: { y: 0, x: -40 },
  none: { y: 0, x: 0 },
};

const Reveal = ({ children, direction = "up", delay = 0, duration = 0.6, once = true, amount = 0.2, sx, as }) => {
  const offset = DIRECTIONS[direction] || DIRECTIONS.up;
  return (
    <motion.div
      style={{ height: "100%", ...sx }}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
