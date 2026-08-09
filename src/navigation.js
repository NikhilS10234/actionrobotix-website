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
    label: "Get Involved",
    items: [
      { label: "Outreach", path: "/outreach" },
      { label: "Join Us", path: "/join" },
      { label: "Portfolio Database", path: "/portfolios" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    label: "Rookie Support",
    items: [
      { label: "Webinars", path: "/webinars" },
      { label: "Podcast", path: "/podcast" },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Discord & Newsletter", path: "/community" },
      { label: "Forum", path: "/forum" },
      { label: "2026–27 Season", path: "/season" },
    ],
  },
  { label: "Contact", path: "/contactus" },
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
