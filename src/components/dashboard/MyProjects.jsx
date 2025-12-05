'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getUserProjects } from '../../lib/database';

const MyProjects = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProjects = async () => {
      setLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        const { data, error } = await getUserProjects(currentUser.id);
        if (!error) {
          setProjects(data || []);
        }
      }
      setLoading(false);
    };
    
    loadUserProjects();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('user_projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        loadUserProjects();
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">My Projects</h3>
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No projects yet. Create your first project!</p>
          <a href="/projects/new-proposal" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Project
          </a>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span>❤️ {project.likes || 0}</span>
                    <span>👥 {project.collaborators || 1}</span>
                    <span>👁️ {project.views || 0}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ml-4 ${
                  project.status === 'Active' ? 'bg-green-100 text-green-800' :
                  project.status === 'Beta' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Alpha' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;