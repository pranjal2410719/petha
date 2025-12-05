const Crown = ({ rank, className = "" }) => {
  const colors = {
    1: "text-yellow-500",
    2: "text-gray-400", 
    3: "text-amber-600",
    4: "text-purple-500"
  };

  return (
    <div className={`${colors[rank]} ${className}`}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4-2.1 1.8L12 8l-3.1 2.4-2.1-1.8L7.7 14z"/>
      </svg>
    </div>
  );
};

export default Crown;