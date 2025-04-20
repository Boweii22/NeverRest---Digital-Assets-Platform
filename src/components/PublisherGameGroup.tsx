'use client';

import { useState } from 'react';
import GameCard from './GameCard';

interface Game {
  id: string;
  name: string;
  imageUrl: string;
  itemCount: number;
}

interface PublisherGameGroupProps {
  publisherName: string;
  publisherLogo: string;
  games: Game[];
}

const PublisherGameGroup = ({ publisherName, publisherLogo, games }: PublisherGameGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="col-span-full">
      <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img 
              src={publisherLogo} 
              alt={publisherName} 
              className="w-8 h-8 object-contain"
            />
            <h3 className="text-xl font-bold text-white">{publisherName}</h3>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg 
              className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherGameGroup; 