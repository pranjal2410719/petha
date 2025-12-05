'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getUserProjects } from '../../lib/database';

const ProjectStats = ({ user }) => {
  const [stats, setStats] = useState({ projects: 0, collaborators: 0, likes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        const { data, error } = await getUserProjects(currentUser.id);
        if (!error && data) {
          const totalCollaborators = data.reduce((sum, p) => sum + (p.collaborators || 0), 0);
          const totalLikes = data.reduce((sum, p) => sum + (p.likes || 0), 0);
          
          setStats({
            projects: data.length,
            collaborators: totalCollaborators,
            likes: totalLikes
          });
        }
      }
      setLoading(false);
    };
    
    loadStats();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('project_stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        loadStats();
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Projects</h3>
        {loading ? (
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mt-2"></div>
        ) : (
          <p className="text-3xl font-bold text-blue-600">{stats.projects}</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Collaborators</h3>
        {loading ? (
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mt-2"></div>
        ) : (
          <p className="text-3xl font-bold text-green-600">{stats.collaborators}</p>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Likes</h3>
        {loading ? (
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mt-2"></div>
        ) : (
          <p className="text-3xl font-bold text-red-600">{stats.likes}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectStats;