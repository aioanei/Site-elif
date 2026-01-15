'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// You can use image paths (e.g., '/photo1.jpg') or emojis
// Put your photos in the 'public' folder first!
const emojis = [
  '/photo1.jpg',  // Replace with your photo paths
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg',
  '/photo7.jpg',
  '/photo8.jpg',
  // Or keep emojis: '💖', '💝', '💕', '💗', '💓', '💞', '💘', '❤️'
];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    emojis.forEach((emoji, index) => {
      gameCards.push(
        { id: index * 2, emoji, flipped: false, matched: false },
        { id: index * 2 + 1, emoji, flipped: false, matched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameWon(false);
    setStartTime(Date.now());
  };

  const handleStartGame = () => {
    if (playerName.trim()) {
      setShowNameInput(false);
      initializeGame();
    }
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.id === cardId ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === firstId)!;
      const secondCard = newCards.find((c) => c.id === secondId)!;

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, matched: true }
                : c
            )
          );
          setFlippedCards([]);
          
          const newMatchedPairs = matchedPairs + 1;
          setMatchedPairs(newMatchedPairs);
          
          if (newMatchedPairs === emojis.length) {
            setGameWon(true);
            setEndTime(Date.now());
            saveScore();
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const saveScore = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const score = Math.max(1000 - moves * 10 - timeTaken, 0);
    
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: playerName,
          score: score,
          game: 'memory',
        }),
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full"
        >
          <h1 className="text-5xl font-bold text-red-600 mb-6 text-center">
            ❤️ Memory Hearts
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Match all the hearts to win!
            <br />
            Test your memory and speed!
          </p>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
            className="w-full px-6 py-4 text-lg border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500 mb-6"
          />
          <button
            onClick={handleStartGame}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl text-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Game 🚀
          </button>
          <Link href="/">
            <button className="w-full mt-4 text-red-600 hover:text-red-700 py-2">
              ← Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-5xl font-bold text-red-600 mb-4">
          ❤️ Memory Hearts
        </h1>
        <div className="flex gap-8 justify-center text-xl">
          <span className="text-gray-700">
            Moves: <span className="font-bold text-red-600">{moves}</span>
          </span>
          <span className="text-gray-700">
            Matches: <span className="font-bold text-red-600">{matchedPairs}/{emojis.length}</span>
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="w-24 h-24 md:w-32 md:h-32 cursor-pointer perspective-500"
            style={{ perspective: '1000px' }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 rounded-2xl`}
              style={{
                transformStyle: 'preserve-3d',
                transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Back of card (question mark) */}
              <div
                className="absolute w-full h-full flex items-center justify-center text-5xl rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 hover:shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                ❓
              </div>
              {/* Front of card (revealed) */}
              <div
                className={`absolute w-full h-full flex items-center justify-center text-5xl rounded-2xl overflow-hidden ${
                  card.matched
                    ? 'bg-gradient-to-br from-green-400 to-green-600'
                    : 'bg-gradient-to-br from-pink-400 to-red-500'
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {card.emoji.startsWith('/') ? (
                  <img
                    src={card.emoji}
                    alt="Memory card"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  card.emoji
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={initializeGame}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
        >
          New Game 🔄
        </button>
        <Link href="/">
          <button className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-xl text-lg font-semibold hover:shadow-lg transition-all">
            ← Home
          </button>
        </Link>
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
        >
          <div className="bg-white p-12 rounded-3xl text-center max-w-md">
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-6"
            >
              🎉
            </motion.h2>
            <h2 className="text-5xl font-bold text-red-600 mb-4">
              You Won!
            </h2>
            <p className="text-2xl text-gray-700 mb-2">
              Moves: <span className="font-bold">{moves}</span>
            </p>
            <p className="text-2xl text-gray-700 mb-8">
              Time: <span className="font-bold">{Math.floor((endTime - startTime) / 1000)}s</span>
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={initializeGame}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
              >
                Play Again 🔄
              </button>
              <Link href="/leaderboard">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all">
                  Leaderboard 🏆
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
