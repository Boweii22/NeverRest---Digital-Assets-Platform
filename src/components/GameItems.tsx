'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageModal from './ImageModal';




// Mock data - replace with actual data from your backend
export const gameItems = {
  rdr2: [
    {
      id: 'rdr2_grizzlies',
      name: 'The Grizzlies Outlaw Outfit',
      price: 24.99,
      imageUrl: '/games/rdr2TheGrizzliesOutlawOutfit.jpg',
      rarity: 'Rare',
    },
    {
      id: 'rdr2_ultimate',
      name: 'Ultimate Edition Outfit',
      price: 29.99,
      imageUrl: '/games/rdr2ultimateeditionoutfit.jpeg',
      rarity: 'Exclusive',
    },
    {
      id: 'rdr2_arabian',
      name: 'Black Arabian Horse Skin',
      price: 45.99,
      imageUrl: '/games/rdr2BlackArabianHorse.jpg',
      rarity: 'Legendary',
    },
  ],
  gta5: [
    {
      id: 'gta5_penthouse',
      name: 'Diamond Casino Penthouse Design',
      price: 34.99,
      imageUrl: '/games/gta5DiamondCasinoPenthouseDesign.jpeg',
      rarity: 'Exclusive',
    },
    {
      id: 'gta5_vehicles',
      name: 'Luxury Vehicle Skin Pack',
      price: 24.99,
      imageUrl: '/games/luxuryvehicleGTA5.jpg',
      rarity: 'Premium',
    },
    {
      id: 'gta5_criminal',
      name: 'Criminal Enterprise Outfit Collection',
      price: 29.99,
      imageUrl: '/games/gta5CriminalEnterpriseOutfitCollection.jpg',
      rarity: 'Premium',
    },
  ],
  valorant: [
    {
      id: 'val_prime_vandal',
      name: 'Prime Vandal Skin',
      price: 17.75,
      imageUrl: '/games/primevandalValorant.jpg',
      rarity: 'Premium',
    },
    {
      id: 'val_reaver_op',
      name: 'Reaver Operator Skin',
      price: 17.75,
      imageUrl: '/games/valorantReaverOperator.jpg',
      rarity: 'Premium',
    },
    {
      id: 'val_glitchpop',
      name: 'Glitchpop Dagger Skin',
      price: 14.99,
      imageUrl: '/games/valorantGlitchpopDaggerSkin.jpg',
      rarity: 'Premium',
    },
  ],
  csgo: [
    {
      id: 'csgo_dlore',
      name: 'AWP | Dragon Lore Skin',
      price: 1500.00,
      imageUrl: '/games/CSGOawpDragonLore.png',
      rarity: 'Covert',
    },
    {
      id: 'csgo_howl',
      name: 'M4A4 | Howl Skin',
      price: 1200.00,
      imageUrl: '/games/csgoHowl.png',
      rarity: 'Covert',
    },
    {
      id: 'csgo_butterfly',
      name: 'Butterfly Knife | Fade',
      price: 899.99,
      imageUrl: '/games/csgoButterflyKnifeFade.png',
      rarity: 'Covert',
    },
  ],
  fortnite: [
    {
      id: 'fn_renegade',
      name: 'Renegade Raider Skin',
      price: 49.99,
      imageUrl: '/games/fortniteRenegadeRaiderSkin.jpg',
      rarity: 'Legendary',
    },
    {
      id: 'fn_galaxy',
      name: 'Galaxy Scout Outfit',
      price: 39.99,
      imageUrl: '/games/fortniteGalaxyScoutOutfit.jpg',
      rarity: 'Epic',
    },
    {
      id: 'fn_starwand',
      name: 'Star Wand Pickaxe',
      price: 29.99,
      imageUrl: '/games/fortniteStarWandPickaxe.jpg',
      rarity: 'Rare',
    },
  ],
  apex: [
    {
      id: 'apex_kunai',
      name: 'Wraith Kunai Heirloom',
      price: 159.99,
      imageUrl: '/games/apexWraithKunaiHeirloom.jpg',
      rarity: 'Heirloom',
    },
    {
      id: 'apex_wraith',
      name: 'Void Prowler Wraith Skin',
      price: 19.99,
      imageUrl: '/games/apexVoidProwlerWraithSkin.jpg',
      rarity: 'Legendary',
    },
    {
      id: 'apex_pathfinder',
      name: 'Pathfinder Boxing Gloves',
      price: 159.99,
      imageUrl: '/games/ApexPathfinderBoxingGloves.jpg',
      rarity: 'Heirloom',
    },
  ],
  lol: [
    {
      id: 'lol_ahri',
      name: 'Spirit Blossom Ahri Skin',
      price: 14.99,
      imageUrl: '/games/lolSpiritBlossomAhriSkin.jpg',
      rarity: 'Legendary',
    },
    {
      id: 'lol_seraphine',
      name: 'K/DA ALL OUT Seraphine Bundle',
      price: 29.99,
      imageUrl: '/games/lolK:DAALLOUTSeraphineBundle.jpg',
      rarity: 'Ultimate',
    },
    {
      id: 'lol_dark_lux',
      name: 'Dark Cosmic Lux Skin',
      price: 19.99,
      imageUrl: '/games/lolDarkCosmicLuxSkin.jpg',
      rarity: 'Legendary',
    },
    {
      id: 'lol_vayne',
      name: 'PROJECT: Vayne Skin',
      price: 14.99,
      imageUrl: '/games/lolPROJECT-VayneSkin.jpg',
      rarity: 'Legendary',
    },
    {
      id: 'lol_elementalist',
      name: 'Elementalist Lux Ultimate Skin',
      price: 34.99,
      imageUrl: '/games/lolElementalistLuxUltimateSkin.jpg',
      rarity: 'Ultimate',
    },
  ],
  dota2: [
    {
      id: 'dota_pa',
      name: 'Manifold Paradox Phantom Assassin Arcana',
      price: 29.99,
      imageUrl: '/games/dota2ManifoldParadoxPhantomAssassinArcana.jpeg',
      rarity: 'Arcana',
    },
    {
      id: 'dota_sf',
      name: 'Demon Eater Shadow Fiend Arcana',
      price: 29.99,
      imageUrl: '/games/dota2DemonEaterShadowFiendArcana.jpeg',
      rarity: 'Arcana',
    },
    {
      id: 'dota_es',
      name: 'Planetfall Earthshaker Arcana',
      price: 29.99,
      imageUrl: '/games/Dota2PlanetfallEarthshakerArcana.png',
      rarity: 'Arcana',
    },
  ],
};

interface GameItemsProps {
  gameId: string;
}

export default function GameItems({ gameId }: GameItemsProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
  const [listedItems, setListedItems] = useState<any[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Load items from localStorage
    const storedItems = JSON.parse(localStorage.getItem('myItems') || '[]');
    
    // Filter items by game ID
    const gameListedItems = storedItems.filter((item: any) => 
      item.gameId === gameId && !item.isPurchased
    );
    
    const gamePurchasedItems = storedItems.filter((item: any) => 
      item.gameId === gameId && item.isPurchased
    );
    
    setListedItems(gameListedItems);
    setPurchasedItems(gamePurchasedItems);
  }, [gameId]);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      rarity: item.rarity,
      gameId: item.gameId || gameId,
      owner: item.owner,
    });
  };

  // Get items for the selected game
  const defaultItems = gameItems[gameId as keyof typeof gameItems] || [];

  // Create a set of purchased item IDs for faster lookup
  const purchasedItemIds = new Set(purchasedItems.map(item => item.id));
  
  // Filter out purchased items from default items
  const availableDefaultItems = defaultItems.filter(item => !purchasedItemIds.has(item.id));
  
  // Create a map of default item IDs to track which ones are already in the default list
  const defaultItemIds = new Set(availableDefaultItems.map(item => item.id));
  
  // Filter out listed items that have the same ID as default items
  const uniqueListedItems = listedItems.filter(item => !defaultItemIds.has(item.id));
  
  // Combine default items with unique listed items
  const allItems = [...availableDefaultItems, ...uniqueListedItems];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allItems.map((item) => (
        <div
          key={item.id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div
            className="relative h-48 cursor-pointer"
            onClick={() => setSelectedImage({ url: item.imageUrl, alt: item.name })}
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-full">
              {item.rarity}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-white">{item.name}</h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-yellow-400 font-bold">
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-600 text-white rounded-lg px-3 py-1 text-sm hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      {allItems.length === 0 && (
        <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
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
          <h3 className="mt-2 text-lg font-medium text-white">No items available</h3>
          <p className="mt-1 text-gray-400">
            There are no items available for this game yet.
          </p>
        </div>
      )}

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
} 