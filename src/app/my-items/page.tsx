'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Item {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rarity: string;
  gameId: string;
  isPurchased?: boolean;
  isListed?: boolean;
  purchaseDate?: string;
  listingDate?: string;
}

export default function MyItemsPage() {
  const [activeTab, setActiveTab] = useState<'purchases' | 'listings'>('purchases');
  const [purchasedItems, setPurchasedItems] = useState<Item[]>([]);
  const [listedItems, setListedItems] = useState<Item[]>([]);

  useEffect(() => {
    // Load items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('myItems') || '[]');
    
    // Separate items into purchased and listed
    const purchased = storedItems.filter((item: Item) => item.isPurchased);
    const listed = storedItems.filter((item: Item) => item.isListed);
    
    setPurchasedItems(purchased);
    setListedItems(listed);
  }, []);

  const handleRemoveItem = (itemId: string) => {
    // Remove item from localStorage
    const updatedItems = [...purchasedItems, ...listedItems].filter(item => item.id !== itemId);
    localStorage.setItem('myItems', JSON.stringify(updatedItems));
    
    // Update state
    if (activeTab === 'purchases') {
      setPurchasedItems(purchasedItems.filter(item => item.id !== itemId));
    } else {
      setListedItems(listedItems.filter(item => item.id !== itemId));
    }
  };

  const renderEmptyState = (type: 'purchases' | 'listings') => (
    <div className="text-center py-12 bg-gray-800 rounded-lg">
      <svg 
        className="mx-auto h-12 w-12 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-white">
        {type === 'purchases' ? 'No purchased items yet' : 'No listed items yet'}
      </h3>
      <p className="mt-1 text-gray-400">
        {type === 'purchases' 
          ? 'You haven\'t purchased any items yet.' 
          : 'You haven\'t listed any items for sale yet.'}
      </p>
      {type === 'listings' && (
        <div className="mt-6">
          <Link
            href="/sell"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            List Your First Item
          </Link>
        </div>
      )}
    </div>
  );

  const renderItems = (items: Item[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-48">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-white">{item.name}</h3>
            <p className="text-sm text-gray-400 capitalize">{item.rarity}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-yellow-400 font-bold">
                ${item.price.toFixed(2)}
              </span>
              <button
                className="text-red-400 hover:text-red-300 text-sm"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
            {item.purchaseDate && (
              <p className="text-xs text-gray-500 mt-2">
                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
              </p>
            )}
            {item.listingDate && (
              <p className="text-xs text-gray-500 mt-2">
                Listed: {new Date(item.listingDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Items</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('purchases')}
              className={`${
                activeTab === 'purchases'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Purchases
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`${
                activeTab === 'listings'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Listings
            </button>
          </nav>
        </div>
        
        {/* Content */}
        {activeTab === 'purchases' 
          ? (purchasedItems.length > 0 
              ? renderItems(purchasedItems) 
              : renderEmptyState('purchases'))
          : (listedItems.length > 0 
              ? renderItems(listedItems) 
              : renderEmptyState('listings'))
        }
      </div>
    </main>
  );
} 