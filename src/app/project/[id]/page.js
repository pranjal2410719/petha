'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProjectById, updateProjectViews, deleteProject } from '../../../lib/database';
import { supabase } from '../../../lib/supabase';
import CardNav from '../../../components/CardNav';

export default function ProjectDetails() {
  const params = useParams();
  const id = params.id;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await getProjectById(id);
      
      console.log('Project data:', data);
      console.log('Project error:', fetchError);
      console.log('Project ID:', id);
      
      if (fetchError) {
        console.error('Error loading project:', fetchError);
        setError(fetchError.message);
        setProject(null);
      } else {
        setProject(data);
        // Increment view count
        updateProjectViews(id);
      }
      setLoading(false);
    };
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    if (id) {
      loadProject();
    }
    checkUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Project Not Found</h1>
          <p className="text-gray-600 mt-2">
            {error ? `Error: ${error}` : "The project you're looking for doesn't exist."}
          </p>
          <p className="text-sm text-gray-500 mt-1">Project ID: {id}</p>
          <a href="/projects/discover" className="text-blue-600 hover:underline mt-4 inline-block">Back to Projects</a>
        </div>
      </div>
    );
  }

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
      <CardNav />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-12 mt-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {project.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600">{project.category} • {project.status || 'New'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <p className="text-gray-600">{project.details}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Statistics</h3>
                  <div className="flex gap-4">
                    <div className="bg-red-50 px-4 py-2 rounded-lg">
                      <span className="text-red-500">❤️</span> {project.likes} likes
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg">
                      <span className="text-blue-500">👥</span> {project.collaborators} collaborators
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.team && (
                  <div>
                    <h3 className="font-semibold mb-2">Team Members</h3>
                    <div className="space-y-2">
                      {project.team.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
                            {member.charAt(0)}
                          </div>
                          <span className="text-gray-700">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.author && (
                  <div>
                    <h3 className="font-semibold mb-2">Project Creator</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm text-white">
                        {project.author.charAt(0)}
                      </div>
                      <span className="text-gray-700">{project.author}</span>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Project Details</h3>
                  <p className="text-sm text-gray-600">Started: {project.startDate}</p>
                  <p className="text-sm text-gray-600">Status: {project.status}</p>
                </div>
              </div>
            </div>

            {user ? (
              user.id === project.author_id ? (
                <div className="flex gap-4">
                  <button 
                    onClick={() => window.location.href = `/projects/edit/${project.id}`} 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Edit Project
                  </button>
                  <button 
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this project?')) {
                        const { error } = await deleteProject(project.id);
                        if (error) {
                          alert('Error deleting project: ' + error.message);
                        } else {
                          alert('Project deleted successfully!');
                          window.location.href = '/dashboard';
                        }
                      }
                    }} 
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Project
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button 
                    onClick={() => alert('Collaboration request sent!')} 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Collaborate
                  </button>
                  <button 
                    onClick={() => alert('Coming Soon!')} 
                    className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </button>
                </div>
              )
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-3">Sign in to collaborate on this project</p>
                <a href="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}