'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles, Filter, Search, X } from 'lucide-react';
import { Button, Input, Badge } from '../ui/primitives';

interface FavoritesPageProps {
  onBack: () => void;
}

interface FavoriteDream {
  id: string;
  title: string;
  category: string;
  progress: number;
  achieved: boolean;
  dateAdded: string;
  gradient: string;
}

export default function FavoritesPage({ onBack }: FavoritesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const [favoriteDreams] = useState<FavoriteDream[]>([
    {
      id: '1',
      title: 'Master React & TypeScript',
      category: 'Career',
      progress: 75,
      achieved: false,
      dateAdded: '2026-01-01',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      id: '2',
      title: 'Run a Marathon',
      category: 'Health',
      progress: 100,
      achieved: true,
      dateAdded: '2025-12-15',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: '3',
      title: 'Visit Tokyo',
      category: 'Travel',
      progress: 40,
      achieved: false,
      dateAdded: '2026-01-02',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      id: '4',
      title: 'Save $10,000',
      category: 'Finance',
      progress: 60,
      achieved: false,
      dateAdded: '2025-11-20',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: '5',
      title: 'Launch My Design Portfolio',
      category: 'Career',
      progress: 100,
      achieved: true,
      dateAdded: '2025-10-10',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ]);

  const categories = ['All', 'Career', 'Health', 'Travel', 'Finance'];

  const filteredDreams = favoriteDreams.filter((dream) => {
    const matchesSearch = dream.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || filterCategory === 'All' || dream.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6"
        >
          ← Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <Heart size={32} className="text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Favorite Dreams
              </h1>
              <p className="text-gray-600">Your most cherished goals and achievements</p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search your favorite dreams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filterCategory === category || (!filterCategory && category === 'All') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory(category === 'All' ? null : category)}
                    className={
                      filterCategory === category || (!filterCategory && category === 'All')
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : ''
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredDreams.length} of {favoriteDreams.length} dreams
            </div>
          </div>

          {/* Dreams Grid */}
          <AnimatePresence mode="popLayout">
            {filteredDreams.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-12 text-center"
              >
                <Sparkles size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No dreams found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDreams.map((dream, index) => (
                  <motion.div
                    key={dream.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                  >
                    {/* Card Header */}
                    <div className={`h-2 bg-gradient-to-r ${dream.gradient}`} />
                    
                    <div className="p-6">
                      {/* Title & Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 flex-1">
                          {dream.title}
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-pink-500"
                        >
                          <Heart size={24} fill="currentColor" />
                        </motion.button>
                      </div>

                      {/* Category Badge */}
                      <Badge className={`bg-gradient-to-r ${dream.gradient} text-white mb-4`}>
                        {dream.category}
                      </Badge>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-gray-800">{dream.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${dream.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${dream.gradient}`}
                          />
                        </div>
                      </div>

                      {/* Achievement Status */}
                      {dream.achieved && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3"
                        >
                          <Star size={18} fill="currentColor" />
                          <span className="font-medium">Achieved!</span>
                        </motion.div>
                      )}

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                        Added on {new Date(dream.dateAdded).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Favorites Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {favoriteDreams.length}
                </div>
                <div className="text-sm text-gray-500 mt-1">Total Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {favoriteDreams.filter(d => d.achieved).length}
                </div>
                <div className="text-sm text-gray-500 mt-1">Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {Math.round(favoriteDreams.reduce((acc, d) => acc + d.progress, 0) / favoriteDreams.length)}%
                </div>
                <div className="text-sm text-gray-500 mt-1">Avg. Progress</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
