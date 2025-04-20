import BalanceProvider from '@/components/BalanceProvider';
import GameItems from '@/components/GameItems';
import ShoppingCart from '@/components/ShoppingCart';
import Link from 'next/link';

interface GamePageProps {
  params: {
    id: string;
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = params as { id: string };
    

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              NeverReset
            </Link>
            <div className="flex items-center space-x-4">
              <ShoppingCart />
              {/* <Wallet balance={1250.00} /> */}
              <BalanceProvider />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <GameItems gameId={id} />
      </div>
    </main>
  );
} 