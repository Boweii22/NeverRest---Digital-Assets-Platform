'use client';

import GameCard from './GameCard';
import PublisherGameGroup from './PublisherGameGroup';
import { gameItems } from './GameItems';

// Game data with actual item counts
const rockstarGames = [
  {
    id: 'rdr2',
    name: 'Red Dead Redemption 2',
    imageUrl: '/games/rdr2icon.jpg',
    itemCount: gameItems.rdr2.length,
  },
  {
    id: 'gta5',
    name: 'Grand Theft Auto V',
    imageUrl: '/games/gta5icon.jpeg',
    itemCount: gameItems.gta5.length,
  },
];

const games = [
  {
    id: 'valorant',
    name: 'Valorant',
    imageUrl: '/games/valoranticon.jpg',
    itemCount: gameItems.valorant.length,
  },
  {
    id: 'csgo',
    name: 'CS:GO',
    imageUrl: '/games/csgoicon.png',
    itemCount: gameItems.csgo.length,
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    imageUrl: '/games/fortniteicon.jpg',
    itemCount: gameItems.fortnite.length,
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    imageUrl: '/games/apexicon.jpeg',
    itemCount: gameItems.apex.length,
  },
  {
    id: 'lol',
    name: 'League of Legends',
    imageUrl: '/games/leagueoflegendsicon.jpg',
    itemCount: gameItems.lol.length,
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    imageUrl: '/games/dota2icon.png',
    itemCount: gameItems.dota2.length,
  },
];

export default function GamesList() {
  return (
    <>
      {/* Rockstar Games Section */}
      <PublisherGameGroup
        publisherName="Rockstar Games"
        publisherLogo="/games/rockstaricon.jpg"
        games={rockstarGames}
      />

      {/* Other Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </>
  );
} 