'use client';
import { useState, useEffect } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { updateProjectLikes, createCollaborationRequest } from '../lib/database';
import CollaborationModal from './CollaborationModal';
import { Toggle } from './ui/toggle';

const ProjectFeedCard = ({ project }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(project.likes);
  const [isBanned, setIsBanned] = useState(false);
  const [collaborationStatus, setCollaborationStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.email);
        setUser(user);
      }
    };
    getUser();
  }, []);

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or if modal is open
    if (e.target.closest('button') || showCollabModal) return;
    
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

  const handleCollaborate = () => {
    if (isBanned || !user) return;
    setShowCollabModal(true);
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
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <Toggle
          pressed={isLiked}
          onPressedChange={handleLike}
          aria-label="Toggle like"
          size="sm"
          variant="outline"
          className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
        >
          <Heart className="w-4 h-4" />
          <span className="ml-1">Like</span>
        </Toggle>

        {currentUser ? (
          <>
            <button 
              onClick={handleCollaborate}
              disabled={isBanned || collaborationStatus === 'pending'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
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

            <Toggle
              pressed={isBookmarked}
              onPressedChange={handleBookmark}
              aria-label="Toggle bookmark"
              size="sm"
              variant="outline"
              className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
            >
              <Bookmark className="w-4 h-4" />
            </Toggle>
          </>
        ) : (
          <a href="/auth" className="text-blue-600 hover:underline text-sm ml-auto">
            Sign in to collaborate
          </a>
        )}
      </div>
      
      {showCollabModal && (
        <CollaborationModal
          isOpen={showCollabModal}
          onClose={() => setShowCollabModal(false)}
          project={project}
          user={user}
        />
      )}
    </div>
  );
};

export default ProjectFeedCard;