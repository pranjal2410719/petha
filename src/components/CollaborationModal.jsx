'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CollaborationModal({ isOpen, onClose, project, user }) {
  const [formData, setFormData] = useState({
    skills: '',
    reason: '',
    linkedin: '',
    domain: '',
    experience: '',
    availability: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('collaboration_requests')
        .insert({
          project_id: project.id,
          project_name: project.name || project.title || 'Unknown Project',
          project_author_id: project.author_id,
          requester_id: user.id,
          user_id: user.id,
          user_email: user.email,
          requester_email: user.email,
          user_name: user.user_metadata?.full_name || user.email,
          skills: formData.skills,
          reason: formData.reason,
          linkedin_profile: formData.linkedin,
          domain: formData.domain,
          tech_stack: '',
          experience: formData.experience,
          availability: formData.availability,
          status: 'pending'
        });

      if (error) throw error;

      alert('Collaboration request sent successfully!');
      onClose();
      setFormData({
        skills: '', reason: '', linkedin: '', domain: '', 
        experience: '', availability: ''
      });
    } catch (error) {
      alert('Error sending request: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Join "{project.name || project.title}"</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills *</label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g., React, Node.js, Python, UI/UX Design"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join? *</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Explain your motivation and what you can contribute..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile *</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain *</label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Domain</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business Development">Business Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="Beginner (0-1 years)">Beginner (0-1 years)</option>
                  <option value="Intermediate (2-4 years)">Intermediate (2-4 years)</option>
                  <option value="Advanced (5-7 years)">Advanced (5-7 years)</option>
                  <option value="Expert (8+ years)">Expert (8+ years)</option>
                </select>
              </div>
            </div>



            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Availability</option>
                <option value="Full-time (40+ hours/week)">Full-time (40+ hours/week)</option>
                <option value="Part-time (20-39 hours/week)">Part-time (20-39 hours/week)</option>
                <option value="Freelance (10-19 hours/week)">Freelance (10-19 hours/week)</option>
                <option value="Casual (5-9 hours/week)">Casual (5-9 hours/week)</option>
                <option value="Weekends only">Weekends only</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}