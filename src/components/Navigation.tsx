'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BalanceProvider from './BalanceProvider';
import ShoppingCart from './ShoppingCart';


export default function Navigation() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Buy', href: '/' },
    { name: 'Sell', href: '/sell' },
    { name: 'My Items', href: '/my-items' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              NeverReset
            </Link>
            <p className="ml-2 text-gray-400 text-sm">Loot Once, Trade Forever</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === tab.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
            <ShoppingCart />
            {/* <Wallet balance={1250.00} /> */}
            <BalanceProvider />
          </div>
        </div>
      </div>
    </nav>
  );
} 