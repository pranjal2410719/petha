// Centralized navigation configuration
export const getNavigationItems = (isAuthenticated = false) => [
  {
    label: "About",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company", href: "/about/company" },
      {
        label: "Upcoming Features",
        ariaLabel: "Upcoming Features",
        href: "/upcoming-features",
      },
    ],
  },
  {
    label: "Projects",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      ...(isAuthenticated
        ? [
            {
              label: "New Proposal",
              ariaLabel: "New Proposal",
              href: "/projects/new-proposal",
            },
          ]
        : []),
        {
        label: "Discover Projects",
        ariaLabel: "Discover Projects",
        href: "/projects/discover",
      },
      {
        label: "Top Growing Project",
        ariaLabel: "Top Growing Project",
        href: "/projects/top-growing",
      },
    ],
  },
  {
    label: "Additional",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Pricing", ariaLabel: "Pricing Plans", href: "#" },
      { label: "Contact Us", ariaLabel: "Contact Us", href: "/contact" },
    ],
  },
  ...(isAuthenticated
    ? [
        {
          label: "Leaderboard",
          bgColor: "#1a1a1a",
          textColor: "#fff",
          links: [
            {
              label: "Top Contributors",
              ariaLabel: "Top Contributors",
              href: "/leaderboard/contributors",
            },
            {
              label: "Best Collaborators",
              ariaLabel: "Best Collaborators",
              href: "/leaderboard/collaborators",
            },
          ],
        },
      ]
    : []),
];
