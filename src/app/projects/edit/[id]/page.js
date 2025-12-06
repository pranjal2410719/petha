'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import { getProjectById, updateProject } from '../../../../lib/database';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, BUDGET_RANGES } from '../../../../utils/constants';
import CardNav from '../../../../components/CardNav';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

export default function EditProject() {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
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
    const loadProject = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        window.location.href = '/auth';
        return;
      }

      const { data, error } = await getProjectById(id);
      if (error || !data) {
        alert('Project not found');
        window.location.href = '/dashboard';
        return;
      }

      if (data.author_id !== user.id) {
        alert('You can only edit your own projects');
        window.location.href = '/dashboard';
        return;
      }

      setProject(data);
      setFormData({
        name: data.name,
        description: data.description,
        author: data.author,
        category: data.category,
        technologies: data.technologies?.join(', ') || '',
        budget: data.budget,
        status: data.status,
        startDate: data.start_date || ''
      });
      setLoading(false);
    };

    loadProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updates = {
      name: formData.name,
      description: formData.description,
      author: formData.author,
      category: formData.category,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
      budget: formData.budget,
      status: formData.status,
      start_date: formData.startDate || new Date().toISOString().split('T')[0]
    };

    const { error } = await updateProject(id, updates);
    
    if (error) {
      alert('Error updating project: ' + error.message);
    } else {
      alert('Project updated successfully!');
      window.location.href = `/project/${id}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <CardNav />
      
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center pt-20">
        <div className="text-center px-4 max-w-5xl">
          <div className="mb-12 px-8 mt-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Edit Project</h1>
            <p className="text-xl text-gray-600">Update your project details</p>
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
              
              <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-lg">
                  Update Project
                </button>
                <button 
                  type="button" 
                  onClick={() => window.location.href = `/project/${id}`}
                  className="flex-1 bg-gray-600 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}