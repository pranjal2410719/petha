import CardNav from '../../../components/CardNav';
import Footer from '../../../components/Footer';

export default function Company() {
  const stats = [
    { number: "1000+", label: "Projects Launched" },
    { number: "150+", label: "Elite Collaborators" },
    { number: "45+", label: "Countries Reached" },
    { number: "99.8%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: "🚀",
      title: "Innovation First",
      description: "We push boundaries and embrace cutting-edge technologies to deliver exceptional results."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We believe in the power of teamwork and foster meaningful partnerships with our clients."
    },
    {
      icon: "🎯",
      title: "Quality Focus",
      description: "Every project receives our full attention to detail and commitment to excellence."
    },
    {
      icon: "🌍",
      title: "Global Impact",
      description: "We create solutions that make a positive difference in communities worldwide."
    }
  ];

  return (
    <div className="min-h-screen" style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}>
      <CardNav />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 h-screen flex items-center" style={{ scrollSnapAlign: 'start' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">DOPO</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            DOPO by BStudios is the premier creator-collaboration platform connecting elite innovators worldwide. 
            We empower developers, designers, and entrepreneurs to discover revolutionary projects and transform 
            cutting-edge ideas into reality through advanced collaboration technology.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="h-screen bg-white flex items-center" style={{ scrollSnapAlign: 'start' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                To revolutionize global innovation by connecting the world's most talented creators, 
                entrepreneurs, and visionaries on a cutting-edge platform that transforms breakthrough 
                ideas into market-leading solutions. We believe extraordinary projects emerge when 
                exceptional minds collaborate without boundaries.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">What We Do</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Connect elite creators with top-tier collaborators globally</li>
                  <li>• Provide advanced AI-powered project matching and discovery</li>
                  <li>• Enable real-time collaboration with cutting-edge tools</li>
                  <li>• Support revolutionary projects from ideation to market launch</li>
                  <li>• Facilitate blockchain, AI, and web3 innovation</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the global epicenter of technological innovation where the world's 
                most ambitious creators converge, breakthrough technologies emerge, and the 
                future is built through unprecedented collaborative excellence and 
                revolutionary digital transformation.
              </p>
              <div className="text-center">
                <div className="text-6xl mb-4">🌟</div>
                <p className="text-blue-600 font-semibold">"Connecting Visionaries, Creating Tomorrow"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="h-screen bg-gray-50 flex items-center" style={{ scrollSnapAlign: 'start' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="h-screen bg-white flex items-center" style={{ scrollSnapAlign: 'start' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Built by Visionaries, for Innovators</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our elite team comprises world-class developers, designers, AI specialists, and blockchain 
            experts who've revolutionized how innovation happens. We've built DOPO to be the ultimate 
            platform that accelerates breakthrough technologies and transforms visionary ideas into 
            market-disrupting realities.
          </p>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl">
            <h3 className="text-3xl font-bold mb-6">Ready to Build the Future?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join elite innovators who are already creating tomorrow's breakthrough technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/projects/discover" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Projects
              </a>
              <a href="/auth" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}