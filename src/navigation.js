export const navGroups = [
  { label: "Home", path: "/" },
  {
    label: "Team",
    items: [
      { label: "About Us", path: "/aboutus" },
      { label: "Gallery", path: "/gallery" },
    ],
  },
  {
    label: "Programs",
    items: [
      { label: "FIRST", path: "/first" },
      { label: "FTC", path: "/ftc" },
      { label: "FRC", path: "/frc" },
      { label: "FLL", path: "/fll" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Outreach", path: "/outreach" },
      { label: "Podcast", path: "/podcast" },
      { label: "2026-2027 BioBuzz Season", path: "/season" },
    ],
  },
  {
    label: "Contact",
    items: [
      { label: "Contact Us", path: "/contactus" },
      { label: "Join Us", path: "/join" },
    ],
  },
];

// Flat list of every leaf link, in nav order, for the footer's Quick Links column.
export const footerLinks = navGroups.flatMap((group) =>
  group.items ? group.items : group.path === "/" ? [] : [{ label: group.label, path: group.path }]
);

export const allPages = [
  { label: "Home", path: "/" },
  ...footerLinks,
  { label: "Support Us", path: "/supportus" },
];
