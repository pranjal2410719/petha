'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function Debug() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkData = async () => {
      // Check user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Check projects
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      console.log('Raw projects:', data);
      console.log('Projects error:', error);
      setProjects(data || []);
      setLoading(false);
    };

    checkData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">User Status:</h2>
        <p>{user ? `Logged in as: ${user.email}` : 'Not logged in'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Projects in Database:</h2>
        <p>Count: {projects.length}</p>
        {projects.length > 0 ? (
          <div className="space-y-2">
            {projects.map(project => (
              <div key={project.id} className="border p-2 rounded">
                <p><strong>ID:</strong> {project.id}</p>
                <p><strong>Name:</strong> {project.name}</p>
                <p><strong>Author:</strong> {project.author}</p>
                <p><strong>Likes:</strong> {project.likes}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
}