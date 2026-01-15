'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 3000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 overflow-hidden">
      {/* Floating hearts background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle"
          style={{ left: heart.x, top: heart.y }}
        >
          ❤️
        </div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-romantic-600 mb-6 animate-heart-beat"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
          >
            Happy 21st Anniversary! 💖
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl md:text-3xl text-romantic-700 mb-12 max-w-3xl"
          >
            To the most incredible person in my life.
            <br />
            I created something special just for you! 💝
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full"
        >
          <GameCard
            title="💝 Quiz About Her"
            description="Think you know her well? Take the ultimate quiz and compete for the top spot!"
            href="/quiz"
            gradient="from-pink-400 to-rose-500"
            delay={1.2}
          />

          <GameCard
            title="🦋 Floppy Elf"
            description="Help the magical elf soar through the sky in this fun and addictive game!"
            href="/floppy-elf"
            gradient="from-purple-400 to-pink-500"
            delay={1.4}
          />

          <GameCard
            title="❤️ Memory Hearts"
            description="Match the hearts and reveal romantic surprises in this memory game!"
            href="/memory-game"
            gradient="from-red-400 to-pink-500"
            delay={1.6}
          />

          <GameCard
            title="🏆 Leaderboard"
            description="See who knows her best and check out the top scores across all games!"
            href="/leaderboard"
            gradient="from-rose-400 to-red-500"
            delay={1.8}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-romantic-600 italic">
            "Every moment with you is a gift. Here's to many more adventures together!" 🌹
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function GameCard({
  title,
  description,
  href,
  gradient,
  delay,
}: {
  title: string;
  description: string;
  href: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={href}>
        <div
          className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer h-full`}
        >
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white text-lg opacity-90">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
