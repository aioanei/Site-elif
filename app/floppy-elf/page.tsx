'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function FloppyElfPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [waitingToStart, setWaitingToStart] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('floppyElfHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 800;
    canvas.height = 600;

    // Load favicon image for the bird
    const birdImage = new Image();
    birdImage.src = '/favicon.ico';

    // Game variables
    let bird = {
      x: 100,
      y: canvas.height / 2,
      velocity: 0,
      radius: 20,
    };

    const gravity = 0.15;  // Very low gravity for easy gameplay
    const jump = -5;       // Gentle jump for better control
    let pipes: Array<{ x: number; y: number; width: number; gap: number; scored?: boolean }> = [];
    const pipeWidth = 60;
    const pipeGap = 180;   // Tighter gap for more challenge
    let frameCount = 0;
    let currentScore = 0;
    let animationId: number;

    const handleJump = () => {
      if (!gameOver) {
        bird.velocity = jump;
      }
    };

    canvas.addEventListener('click', handleJump);
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    });

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#E0F2FE';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update bird
      bird.velocity += gravity;
      bird.y += bird.velocity;

      // Draw bird using favicon image
      const birdSize = bird.radius * 2;
      if (birdImage.complete) {
        ctx.drawImage(birdImage, bird.x - bird.radius, bird.y - bird.radius, birdSize, birdSize);
      } else {
        // Fallback circle while image loads
        ctx.fillStyle = '#FB7185';
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Generate pipes (less frequently)
      if (frameCount % 150 === 0) {
        const minHeight = 80;
        const maxHeight = canvas.height - pipeGap - minHeight;
        const pipeHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        
        pipes.push({
          x: canvas.width,
          y: pipeHeight,
          width: pipeWidth,
          gap: pipeGap,
        });
      }

      // Update and draw pipes (slower movement)
      pipes.forEach((pipe, index) => {
        pipe.x -= 2;  // Slower pipe speed

        // Draw top pipe
        ctx.fillStyle = '#8B5CF6';
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        
        // Draw bottom pipe
        ctx.fillRect(
          pipe.x,
          pipe.y + pipe.gap,
          pipe.width,
          canvas.height - pipe.y - pipe.gap
        );

        // Add decorative cap
        ctx.fillStyle = '#A78BFA';
        ctx.fillRect(pipe.x - 5, pipe.y - 20, pipe.width + 10, 20);
        ctx.fillRect(
          pipe.x - 5,
          pipe.y + pipe.gap,
          pipe.width + 10,
          20
        );

        // Check collision
        if (
          bird.x + bird.radius > pipe.x &&
          bird.x - bird.radius < pipe.x + pipe.width &&
          (bird.y - bird.radius < pipe.y ||
            bird.y + bird.radius > pipe.y + pipe.gap)
        ) {
          endGame();
        }

        // Score point
        if (pipe.x + pipe.width < bird.x && !pipe.scored) {
          pipe.scored = true;
          currentScore++;
          setScore(currentScore);
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
          pipes.splice(index, 1);
        }
      });

      // Check boundaries
      if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
        endGame();
      }

      // Draw score
      ctx.fillStyle = '#BE123C';
      ctx.font = 'bold 40px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${currentScore}`, 20, 50);

      frameCount++;
      animationId = requestAnimationFrame(gameLoop);
    };

    const endGame = () => {
      cancelAnimationFrame(animationId);
      setGameOver(true);
      
      if (currentScore > highScore) {
        setHighScore(currentScore);
        localStorage.setItem('floppyElfHighScore', currentScore.toString());
        
        // Save to leaderboard
        fetch('/api/leaderboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playerName,
            score: currentScore,
            game: 'floppy-elf',
          }),
        }).catch(console.error);
      }
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleJump);
    };
  }, [gameStarted, gameOver, highScore, playerName]);

  const handleStartGame = () => {
    if (playerName.trim()) {
      setShowNameInput(false);
      setWaitingToStart(true);
      setGameStarted(false);
      setGameOver(false);
      setScore(0);
    }
  };

  const handleRestart = () => {
    setWaitingToStart(true);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  // Handle space key to start/restart game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) {
          handleRestart();
        } else if (waitingToStart) {
          setWaitingToStart(false);
          setGameStarted(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, waitingToStart]);

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full"
        >
          <h1 className="text-5xl font-bold text-purple-600 mb-6 text-center">
            🧚 Floppy Elf
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Help the magical elf fly through the pipes!
            <br />
            Click or press SPACE to jump.
          </p>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
            className="w-full px-6 py-4 text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 mb-6"
          />
          <button
            onClick={handleStartGame}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl text-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Game 🚀
          </button>
          <Link href="/">
            <button className="w-full mt-4 text-purple-600 hover:text-purple-700 py-2">
              ← Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">
          🧚 Floppy Elf
        </h1>
        <p className="text-xl text-gray-700">
          High Score: {highScore} | Current: {score}
        </p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-8 border-purple-400 rounded-xl shadow-2xl bg-sky-200"
        />
        
        {waitingToStart && !gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-xl"
          >
            <div className="bg-white p-12 rounded-3xl text-center">
              <h2 className="text-5xl font-bold text-purple-600 mb-4">
                🧚 Ready?
              </h2>
              <p className="text-2xl text-gray-700 mb-4">
                Press <kbd className="bg-gray-100 px-4 py-2 rounded-lg shadow font-bold">SPACE</kbd> to Start
              </p>
            </div>
          </motion.div>
        )}

        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-xl"
          >
            <div className="bg-white p-12 rounded-3xl text-center">
              <h2 className="text-5xl font-bold text-purple-600 mb-4">
                Game Over! 🎮
              </h2>
              <p className="text-3xl font-bold text-gray-800 mb-2">
                Score: {score}
              </p>
              <p className="text-xl text-gray-600 mb-8">
                {score > highScore ? '🎉 New High Score!' : `High Score: ${highScore}`}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
                >
                  Play Again 🔄
                </button>
                <Link href="/leaderboard">
                  <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all">
                    Leaderboard 🏆
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700 mb-4">
          Click or press <kbd className="bg-white px-3 py-1 rounded shadow">SPACE</kbd> to jump
        </p>
        <Link href="/">
          <button className="text-purple-600 hover:text-purple-700 py-2">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
