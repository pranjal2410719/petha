'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { updateProjectLikes, createCollaborationRequest } from '../lib/database';

const ProjectFeedCard = ({ project }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(project.likes);
  const [isBanned, setIsBanned] = useState(false);
  const [collaborationStatus, setCollaborationStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.email);
      }
    };
    getUser();
  }, []);

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons
    if (e.target.closest('button')) return;
    
    const projectId = project.id;
    window.location.href = `/project/${projectId}`;
  };

  const handleLike = async () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setIsLiked(!isLiked);
    setLikes(newLikes);
    await updateProjectLikes(project.id, newLikes);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCollaborate = async () => {
    if (isBanned || !currentUser) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const newRequest = {
      project_id: project.id,
      project_name: project.name,
      project_author_id: project.author_id,
      requester_id: user.id,
      requester_email: user.email,
      status: 'pending'
    };
    
    const { error } = await createCollaborationRequest(newRequest);
    if (!error) {
      setCollaborationStatus('pending');
      alert('Collaboration request sent!');
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow h-full cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
          {project.author.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{project.author}</h3>
          <p className="text-sm text-gray-500">{project.timeAgo} • {project.category}</p>
        </div>
      </div>

      {/* Project Content */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h2>
        <p className="text-gray-700 mb-3">{project.description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {tech}
            </span>
          ))}
        </div>


      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>{likes || 0} likes</span>
        <span>{project.collaborators || 1} collaborators</span>
        <span>{project.views || 0} views</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isLiked ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50 text-gray-600'
          }`}
        >
          <span className={isLiked ? 'text-red-500' : 'text-gray-400'}>❤️</span>
          Like
        </button>

        {currentUser ? (
          <>
            <button 
              onClick={handleCollaborate}
              disabled={isBanned || collaborationStatus === 'pending'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isBanned ? 'bg-red-50 text-red-400 cursor-not-allowed' :
                collaborationStatus === 'pending' ? 'bg-gray-50 text-gray-400 cursor-not-allowed' :
                collaborationStatus === 'rejected' ? 'bg-orange-50 text-orange-600' :
                'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <span>🤝</span>
              {isBanned ? 'Banned' :
               collaborationStatus === 'pending' ? 'Pending' :
               collaborationStatus === 'rejected' ? 'Rejected' :
               'Collaborate'}
            </button>

            <button 
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isBookmarked ? 'bg-yellow-50 text-yellow-600' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span className={isBookmarked ? 'text-yellow-500' : 'text-gray-400'}>🔖</span>
              Bookmark
            </button>
          </>
        ) : (
          <a href="/auth" className="text-blue-600 hover:underline text-sm">
            Sign in to collaborate
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectFeedCard;