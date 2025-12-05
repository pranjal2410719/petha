import CardNav from '../../../components/CardNav';
import Footer from '../../../components/Footer';

export default function Company() {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Active Collaborators" },
    { number: "25+", label: "Countries Reached" },
    { number: "99%", label: "Client Satisfaction" }
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
            About <span className="text-blue-600">Braynix Studios</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            We're a modern creator-collaboration platform empowering innovators worldwide to discover, 
            collaborate, and bring groundbreaking projects to life.
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
                To democratize innovation by connecting creators, entrepreneurs, and collaborators 
                in a seamless platform that transforms ideas into reality. We believe every great 
                project starts with passionate people coming together.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">What We Do</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Connect creators with skilled collaborators</li>
                  <li>• Provide tools for project management and discovery</li>
                  <li>• Foster innovation through real-time collaboration</li>
                  <li>• Support projects from concept to completion</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the world's leading platform where innovation thrives, 
                boundaries are broken, and the next generation of groundbreaking 
                projects are born through collaborative excellence.
              </p>
              <div className="text-center">
                <div className="text-6xl mb-4">🌟</div>
                <p className="text-blue-600 font-semibold">"Empowering Innovation, One Collaboration at a Time"</p>
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Built by Creators, for Creators</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our team consists of passionate developers, designers, and innovators who understand 
            the challenges of bringing ideas to life. We've built Braynix Studios to be the 
            platform we wished existed when we started our own creative journeys.
          </p>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl">
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Next Project?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of creators who are already building the future together.
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