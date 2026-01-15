'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Score {
  id: number;
  name: string;
  score: number;
  game: string;
  created_at: string;
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'quiz' | 'floppy-elf' | 'memory'>('all');

  useEffect(() => {
    fetchScores();
  }, [filter]);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/leaderboard' 
        : `/api/leaderboard?game=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setScores(data.scores || []);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
    setLoading(false);
  };

  const getGameEmoji = (game: string) => {
    switch (game) {
      case 'quiz': return '💝';
      case 'floppy-elf': return '🧚';
      case 'memory': return '❤️';
      default: return '🎮';
    }
  };

  const getGameName = (game: string) => {
    switch (game) {
      case 'quiz': return 'Quiz About Her';
      case 'floppy-elf': return 'Floppy Elf';
      case 'memory': return 'Memory Hearts';
      default: return game;
    }
  };

  const getMedalEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-2xl text-gray-700">
            See who knows her best and who's the gaming champion!
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            label="🎮 All Games"
          />
          <FilterButton
            active={filter === 'quiz'}
            onClick={() => setFilter('quiz')}
            label="💝 Quiz"
          />
          <FilterButton
            active={filter === 'floppy-elf'}
            onClick={() => setFilter('floppy-elf')}
            label="🧚 Floppy Elf"
          />
          <FilterButton
            active={filter === 'memory'}
            onClick={() => setFilter('memory')}
            label="❤️ Memory"
          />
        </div>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin text-6xl mb-4">⭐</div>
              <p className="text-xl text-gray-600">Loading scores...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-3xl mb-4">🎮</p>
              <p className="text-xl text-gray-600">
                No scores yet! Be the first to play!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Player</th>
                    {filter === 'all' && (
                      <th className="px-6 py-4 text-left text-lg font-semibold">Game</th>
                    )}
                    <th className="px-6 py-4 text-left text-lg font-semibold">Score</th>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => (
                    <motion.tr
                      key={score.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-gray-200 hover:bg-pink-50 transition-colors ${
                        index < 3 ? 'bg-yellow-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-2xl font-bold text-gray-800">
                        {getMedalEmoji(index) || `#${index + 1}`}
                      </td>
                      <td className="px-6 py-4 text-lg font-semibold text-gray-800">
                        {score.name}
                      </td>
                      {filter === 'all' && (
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full text-purple-700 font-medium">
                            {getGameEmoji(score.game)} {getGameName(score.game)}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 text-xl font-bold text-pink-600">
                        {score.score}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(score.created_at).toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/">
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:shadow-lg transition-all">
              ← Back to Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all ${
        active
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </motion.button>
  );
}
