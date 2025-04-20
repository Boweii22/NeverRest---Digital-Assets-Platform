'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AVAILABLE_GAMES = [
  { id: 'rdr2', name: 'Red Dead Redemption 2', image: '/images/rdr2.jpg' },
  { id: 'gta5', name: 'Grand Theft Auto V', image: '/images/gta5.jpg' },
  { id: 'dota2', name: 'Dota 2', image: '/images/dota2.jpg' },
  { id: 'fortnite', name: 'Fortnite', image: '/images/fortnite.jpg' },
  { id: 'apex', name: 'Apex Legends', image: '/images/apex.jpg' },
  { id: 'lol', name: 'League of Legends', image: '/images/lol.jpg' },
  { id: 'csgo', name: 'Counter-Strike: Global Offensive', image: '/images/csgo.jpg' },
  { id: 'valorant', name: 'Valorant', image: '/images/valorant.jpg' },
];

const RARITY_OPTIONS = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

export default function SellPage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [rarity, setRarity] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedGame || !itemName || !price || !rarity || !imageFile) {
      setError('Please fill in all fields and upload an image');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price');
      return;
    }

    // In a real application, you would upload the image to a server
    // For this demo, we'll use the preview URL as the image URL
    const imageUrl = previewUrl || '';

    // Create new item
    const newItem = {
      id: Math.random().toString(36).substring(2, 15),
      name: itemName,
      price: priceNum,
      rarity,
      gameId: selectedGame,
      imageUrl,
      isListed: true,
      listingDate: new Date().toISOString(),
    };

    // Get existing items from localStorage
    const existingItems = JSON.parse(localStorage.getItem('myItems') || '[]');
    
    // Add new item to myItems
    localStorage.setItem('myItems', JSON.stringify([...existingItems, newItem]));

    // Get existing available items
    const availableItems = JSON.parse(localStorage.getItem('availableItems') || '[]');
    
    // Add new item to available items
    localStorage.setItem('availableItems', JSON.stringify([...availableItems, newItem]));

    // Redirect to my items page
    router.push('/my-items');
  };

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Sell an Item</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Game Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Game
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {AVAILABLE_GAMES.map((game) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => setSelectedGame(game.id)}
                  className={`relative h-24 rounded-lg overflow-hidden ${
                    selectedGame === game.id
                      ? 'ring-2 ring-blue-500'
                      : 'hover:ring-2 hover:ring-gray-400'
                  }`}
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium text-center px-2">
                      {game.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-300">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Rarity */}
          <div>
            <label htmlFor="rarity" className="block text-sm font-medium text-gray-300">
              Rarity
            </label>
            <select
              id="rarity"
              value={rarity}
              onChange={(e) => setRarity(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select rarity</option>
              {RARITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Item Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex text-sm text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            List Item
          </button>
        </form>
      </div>
    </main>
  );
} 