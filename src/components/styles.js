export const glassCardSx = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 4,
  backdropFilter: "blur(6px)",
  transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    borderColor: "rgba(47,125,255,0.5)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  },
};

export const sectionSx = {
  position: "relative",
  py: { xs: 8, md: 12 },
};
