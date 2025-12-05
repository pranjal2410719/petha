// Centralized navigation configuration
export const getNavigationItems = (isAuthenticated = false) => [
  {
    label: "About",
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company", href: "/about/company" }
    ]
  },
  {
    label: "Projects", 
    bgColor: "#1a1a1a",
    textColor: "#fff",
    links: [
      { label: "Discover Projects", ariaLabel: "Discover Projects", href: "/projects/discover" },
      ...(isAuthenticated ? [{ label: "New Proposal", ariaLabel: "New Proposal", href: "/projects/new-proposal" }] : []),
      { label: "Top Growing Project", ariaLabel: "Top Growing Project", href: "/projects/top-growing" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#1a1a1a", 
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us", href: "/contact/email" },
      { label: "Twitter", ariaLabel: "Twitter", href: "/contact/twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn", href: "/contact/linkedin" }
    ]
  },
  ...(isAuthenticated ? [{
    label: "Leaderboard",
    bgColor: "#1a1a1a", 
    textColor: "#fff",
    links: [
      { label: "Top Contributors", ariaLabel: "Top Contributors", href: "/leaderboard/contributors" },
      { label: "Best Collaborators", ariaLabel: "Best Collaborators", href: "/leaderboard/collaborators" }
    ]
  }] : [])
];