import GamesList from '@/components/GamesList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Games</h2>
        <GamesList />
      </div>
    </main>
  );
}
