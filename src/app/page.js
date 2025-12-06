import CardNav from '../components/CardNav';
import Footer from '../components/Footer';
import Hyperspeed from '../components/Hyperspeed';
const App = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about/company" },
        { label: "Careers", ariaLabel: "About Careers", href: "/about/careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      cardHref: "/projects/discover",
      links: [
        { label: "New Proposal", ariaLabel: "New Proposal", href: "/projects/new-proposal" },
        { label: "Top Growing Project", ariaLabel: "Top Growing Project", href: "/projects/top-growing" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Collaborators", ariaLabel: "Collaborators", href: "/contact/collaborators" }
      ]
    },
    {
      label: "Leaderboard",
      bgColor: "#1E2A37", 
      textColor: "#fff",
      links: [
        { label: "Top Contributors", ariaLabel: "Top Contributors", href: "/leaderboard/contributors" },
        { label: "Best Collaborators", ariaLabel: "Best Collaborators", href: "/leaderboard/collaborators" }
      ]
    }
  ];

  return (
    <div className="scroll-smooth" style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}>
      <CardNav />
      
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden" style={{ scrollSnapAlign: 'start', background: 'linear-gradient(to bottom, transparent 80%, rgba(0,0,0,0.8) 100%)' }}>
        <div className="absolute inset-0 z-0 w-full h-full">
          <Hyperspeed />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
            <span className="text-gray-600">Welcome to </span>
            <span className="text-blue-600">DOPO</span>
          </h1>
          <p className="text-2xl max-w-3xl mx-auto font-light leading-relaxed text-gray-500">The premier creator collaboration platform by BStudios. Connect with elite developers, designers, and innovators worldwide. Transform revolutionary ideas into reality with cutting-edge AI, blockchain, and next-generation digital solutions. Shape the future of technology together.</p>
          <div className="mt-8 flex gap-4 justify-center">
            <a href="/projects/discover" className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/30">Projects</a>
            <a href="/projects/top-growing" className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/30">Leaderboard</a>
          </div>
        </div>
      </section>


    </div>
  );
};

export default App;
