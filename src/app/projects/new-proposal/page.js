'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { createProject } from '../../../lib/database';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, BUDGET_RANGES } from '../../../utils/constants';
import CardNav from '../../../components/CardNav';
import Footer from '../../../components/Footer';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/ui/select';

export default function NewProposal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author: '',
    category: '',
    technologies: '',
    budget: 'Free',
    status: 'Development',
    startDate: ''
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const authorName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
        setFormData(prev => ({ ...prev, author: authorName }));
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">You must be logged in to create a project proposal.</p>
          <a href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Login / Sign Up
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please login to create a project');
      return;
    }

    const newProject = {
      name: formData.name,
      description: formData.description,
      author: formData.author,
      author_id: user.id,
      category: formData.category,
      likes: 0,
      collaborators: 1,
      views: 0,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      budget: formData.budget,
      status: formData.status,
      start_date: formData.startDate || new Date().toISOString().split('T')[0],
      team: [formData.author]
    };

    const { error } = await createProject(newProject);
    
    if (error) {
      alert('Error creating project: ' + error.message);
    } else {
      setFormData({
        name: '',
        description: '',
        author: '',
        category: '',
        technologies: '',
        budget: 'Free',
        status: 'Development',
        startDate: ''
      });
      window.location.href = '/projects/discover';
    }
  };

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/about/company" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      cardHref: "/projects/discover",
      links: [
        { label: "Discover Projects", ariaLabel: "Discover Projects", href: "/projects/discover" },
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
    }
  ];

  return (
    <div>
      <CardNav
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center pt-20">
        <div className="text-center px-4 max-w-5xl">
          <div className="mb-12 px-8 mt-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">New Project Proposal</h1>
            <p className="text-xl text-gray-600">Submit your innovative project ideas and bring them to life with our expert team.</p>
          </div>
          
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mb-16">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">Author Name *</label>
                  <input 
                    type="text" 
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                <textarea 
                  rows="4" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PROJECT_CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {BUDGET_RANGES.map(budget => (
                          <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">Project Status</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {PROJECT_STATUSES.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                  />
                </div>
              </div>
              

              
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">Technologies (comma separated) *</label>
                <input 
                  type="text" 
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                  required
                />
              </div>
              
              <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg mb-8">
                Create Project
              </button>
            </form>
          </div>
        </div>
      </section>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}