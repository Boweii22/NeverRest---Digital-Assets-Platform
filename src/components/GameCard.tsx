'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GameCardProps {
  id: string;
  name: string;
  imageUrl: string;
  itemCount: number;
}

const GameCard = ({ id, name, imageUrl, itemCount }: GameCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/games/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-gray-800 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="aspect-square relative">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg">{name}</h3>
        <p className="text-gray-300 text-sm">{itemCount} items available</p>
      </div>
    </div>
  );
};

export default GameCard; 