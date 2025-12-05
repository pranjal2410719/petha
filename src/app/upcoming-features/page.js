'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardNav from '../../components/CardNav';
import Hyperspeed from '../../components/Hyperspeed';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Real-time Chat System",
    description: "Instant messaging between team members with file sharing, emoji reactions, and thread conversations.",
    status: "In Development",
    eta: "Q2 2024",
    icon: "💬"
  },
  {
    title: "Comment System",
    description: "Rich commenting on projects with mentions, replies, and real-time notifications for better collaboration.",
    status: "In Development",
    eta: "Q2 2024",
    icon: "💭"
  },
  {
    title: "Profile Search & Discovery",
    description: "Advanced search to find creators by skills, location, experience level, and project history.",
    status: "Planning",
    eta: "Q3 2024",
    icon: "🔍"
  },
  {
    title: "Following System",
    description: "Follow your favorite creators, get updates on their projects, and build your professional network.",
    status: "Planning",
    eta: "Q3 2024",
    icon: "👥"
  },
  {
    title: "AI-Powered Project Matching",
    description: "Smart algorithms will automatically match creators with projects based on skills, interests, and collaboration history.",
    status: "Research",
    eta: "Q4 2024",
    icon: "🤖"
  },
  {
    title: "Mobile App",
    description: "Native iOS and Android apps with offline capabilities and push notifications.",
    status: "Research",
    eta: "Q1 2025",
    icon: "📱"
  }
];

const statusColors = {
  "In Development": "bg-green-500",
  "Planning": "bg-yellow-500",
  "Research": "bg-blue-500"
};

export default function UpcomingFeatures() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current.children, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Features animation
      gsap.fromTo(".feature-card", 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for background
      gsap.to(".hyperspeed-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <CardNav />
      
      {/* Background */}
      <div className="hyperspeed-bg fixed inset-0 z-0 w-full h-full">
        <Hyperspeed />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Upcoming Features
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            The future of creator collaboration is being built. Here's what's coming to Braynix Studios.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Actively developing new features</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What's Coming Next</h2>
            <p className="text-xl text-gray-400">Social features and tools to enhance creator collaboration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <div className={`w-3 h-3 rounded-full ${statusColors[feature.status]}`}></div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 bg-white/10 rounded-full border border-white/20">
                    {feature.status}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">{feature.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to Shape the Future?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community and help us build the features that matter most to creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors duration-300"
            >
              Request a Feature
            </a>
            <a
              href="/projects/discover"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold border border-white/20 transition-all duration-300"
            >
              Explore Current Projects
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Braynix Studios. Building the future of creator collaboration.
          </p>
        </div>
      </footer>
    </div>
  );
}