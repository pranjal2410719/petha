'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getProjects } from '../../../lib/database';
import CardNav from '../../../components/CardNav';
import ProjectFeedCard from '../../../components/ProjectFeedCard';


export default function DiscoverProjects() {


  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await getProjects();
    console.log('Projects data:', data);
    console.log('Projects error:', error);
    if (error) {
      setError(`Failed to load projects: ${error.message}`);
      setProjects([]);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        loadProjects();
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);



  return (
    <div>
      <CardNav />
      
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="w-full px-2 py-8">


          {/* Feed */}
          {loading ? (
            <div className="text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center mt-8">
              <p className="text-red-600">{error}</p>
              <button onClick={loadProjects} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center mt-8">
              <p className="text-gray-500">No projects found. Create your first project!</p>
              <a href="/projects/new-proposal" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Project
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectFeedCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}