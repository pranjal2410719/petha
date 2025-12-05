'use client';
import Crown from './Crown';
import PixelCard from './PixelCard';

const ProjectCard = ({ project, rank, isTop4 = false }) => {
  const cardHeight = isTop4 ? (rank === 1 ? 'h-96' : rank === 2 ? 'h-88' : 'h-80') : 'h-72';
  
  const handleClick = () => {
    window.location.href = `/project/${project.id}`;
  };
  
  if (!isTop4) {
    return (
      <PixelCard variant="pink" onClick={handleClick} className="cursor-pointer">
        <div className="absolute inset-0 p-6 text-center flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {project.name.charAt(0)}
            </div>
            
            <h3 className="text-lg font-bold text-black mb-3 drop-shadow-sm">
              {project.name}
            </h3>
            
            <p className="text-blue-600 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                <span className="text-red-500">❤️</span>
                <span className="font-semibold text-black">{project.likes}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full">
                <span className="text-blue-500">👥</span>
                <span className="font-semibold text-black">{project.collaborators}</span>
              </div>
            </div>
            
            <div className="text-sm text-blue-600 font-medium">
              Rank #{rank}
            </div>
          </div>
        </div>
      </PixelCard>
    );
  }
  
  return (
    <div 
      className={`bg-gradient-to-br ${rank === 1 ? 'from-yellow-100 to-yellow-200' : rank === 2 ? 'from-gray-100 to-gray-200' : rank === 3 ? 'from-amber-100 to-amber-200' : 'from-purple-100 to-purple-200'} p-8 rounded-2xl shadow-xl border-2 ${rank === 1 ? 'border-yellow-300' : rank === 2 ? 'border-gray-300' : rank === 3 ? 'border-amber-300' : 'border-purple-300'} ${cardHeight} m-4 relative transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
      onClick={handleClick}
    >
      {isTop4 && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <Crown rank={rank} className="drop-shadow-lg" />
        </div>
      )}
      
      <div className="text-center h-full flex flex-col justify-between">
        <div>
          <div className={`${isTop4 ? 'w-24 h-24 text-2xl' : 'w-16 h-16 text-xl'} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold shadow-lg`}>
            {project.name.charAt(0)}
          </div>
          
          <h3 className={`${isTop4 ? 'text-2xl' : 'text-lg'} font-bold text-gray-900 mb-3 drop-shadow-sm`}>
            {project.name}
          </h3>
          
          <p className={`text-gray-600 ${isTop4 ? 'text-base' : 'text-sm'} mb-4 line-clamp-3`}>
            {project.description}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-center gap-6 text-lg">
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
              <span className="text-red-500">❤️</span>
              <span className="font-semibold text-gray-700">{project.likes}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
              <span className="text-blue-500">👥</span>
              <span className="font-semibold text-gray-700">{project.collaborators}</span>
            </div>
          </div>
          
          {!isTop4 && (
            <div className="text-sm text-gray-500 font-medium">
              Rank #{rank}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;