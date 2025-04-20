'use client';

import { useState } from 'react';

interface WalletProps {
  balance: number;
}

const Wallet = ({ balance }: WalletProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all duration-200">
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        <span className="text-white font-medium">${balance.toFixed(2)}</span>
      </div>
      
      {isHovered && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 px-4">
          <div className="text-sm text-gray-300">
            <p>Available Balance</p>
            <p className="text-yellow-400 font-bold">${balance.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet; 