'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { getTopGrowingProjects } from '../../../lib/database';
import CardNav from '../../../components/CardNav';
import ProjectCard from '../../../components/ProjectCard';

export default function TopGrowing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await getTopGrowingProjects();
    console.log('Top projects data:', data);
    console.log('Top projects error:', error);
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
    
    const subscription = supabase
      .channel('top-projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        loadProjects();
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const top4 = projects.slice(0, 4);
  const others = projects.slice(4);

  return (
    <div>
      <CardNav />
      
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4 pt-16">Top Growing Projects</h1>
          <p className="text-xl text-center text-gray-600 mb-12">Most liked and collaborated projects by our community</p>
          
          {loading ? (
            <div className="text-center mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading top projects...</p>
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
              <p className="text-gray-500">No projects found yet.</p>
            </div>
          ) : (
            <>
              {/* Top 4 Projects */}
              {top4.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  {top4.map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      project={project}
                      rank={index + 1}
                      isTop4={true}
                    />
                  ))}
                </div>
              )}
              
              {/* Other Projects */}
              {others.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Other Rising Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {others.map((project, index) => (
                      <ProjectCard 
                        key={project.id}
                        project={project}
                        rank={index + 5}
                        isTop4={false}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

    </div>
  );
}