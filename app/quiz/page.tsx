'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// CUSTOMIZE THESE QUESTIONS FOR YOUR GIRLFRIEND!
const questions = [
  {
    id: 1,
    question: "What's her favorite color?",
    options: ["Pink", "Purple", "Blue", "N/A"],
    correctAnswer: 3, // Index of correct answer (0 = Pink)
  },
  {
    id: 2,
    question: "What's her dream vacation destination?",
    options: ["Paris", "Maldives", "Tokyo", "New York"],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "What's her favorite car brand",
    options: ["BMW", "Audi", "Mercedes", "Alfa Romeo"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What's her biggest fear?",
    options: ["Spiders", "Heights", "Dark", "Public Spaces"],
    correctAnswer: 0,
  },
  {
    id: 5,
    question: "What's her favorite subject?",
    options: ["Physics", "Informatics", "Maths", "Chemistry"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Where was she born?",
    options: ["Agigea", "Constanta", "23 August", "Bucuresti"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What time does she usually wake up?",
    options: ["6-7 AM", "7-8 AM", "8-9 AM", "9-10 AM"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "What's her favorite hobby?",
    options: ["Reading", "Dancing", "Painting", "Gaming"],
    correctAnswer: 2,
  },
  {
    id: 9,
    question: "What's her favorite artist?",
    options: ["Ian", "Azteca", "Taylor Swift", "Harry Styles"],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "What shoes size is she wearing?",
    options: [
      "36",
      "37",
      "38",
      "39",
    ],
    correctAnswer: 2,
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const router = useRouter();

  const handleStartQuiz = () => {
    if (playerName.trim()) {
      setShowNameInput(false);
    }
  };

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        saveScoreToServer(newScore);
      }
    }, 1500);
  };

  const saveScoreToServer = async (finalScore: number) => {
    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: playerName,
          score: finalScore,
          game: 'quiz',
        }),
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const getFinalScore = () => {
    // The last question's score might not be updated yet in state
    // So we need to check if the last answer was correct
    if (quizCompleted && selectedAnswer !== null) {
      return selectedAnswer === questions[questions.length - 1].correctAnswer ? score : score;
    }
    return score;
  };

  const getScoreMessage = (finalScore: number) => {
    const percentage = (finalScore / questions.length) * 100;

    if (percentage === 100) return "Perfect! You know her like no one else! 💖";
    if (percentage >= 80) return "Amazing! You really know her well! 🌟";
    if (percentage >= 60) return "Good job! You know her pretty well! 💝";
    if (percentage >= 40) return "Not bad! But there's more to learn! 😊";
    return "Keep trying! Get to know her better! 💪";
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full"
        >
          <h1 className="text-4xl font-bold text-romantic-600 mb-6 text-center">
            💝 Quiz About Her
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Think you know her well? Let's find out!
          </p>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
            className="w-full px-6 py-4 text-lg border-2 border-romantic-300 rounded-xl focus:outline-none focus:border-romantic-500 mb-6"
          />
          <button
            onClick={handleStartQuiz}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-romantic-500 to-pink-500 text-white py-4 rounded-xl text-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Quiz 🚀
          </button>
          <Link href="/">
            <button className="w-full mt-4 text-romantic-600 hover:text-romantic-700 py-2">
              ← Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center"
        >
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.h1>
          <h2 className="text-4xl font-bold text-romantic-600 mb-4">
            Quiz Complete!
          </h2>
          <p className="text-3xl font-bold text-romantic-700 mb-4">
            Score: {score} / {questions.length}
          </p>
          <p className="text-xl text-gray-700 mb-8">{getScoreMessage(score)}</p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswer(null);
                setQuizCompleted(false);
                setShowNameInput(true);
              }}
              className="bg-gradient-to-r from-romantic-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all"
            >
              Play Again 🔄
            </button>
            <Link href="/leaderboard">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all">
                View Leaderboard 🏆
              </button>
            </Link>
          </div>
          
          <Link href="/">
            <button className="mt-6 text-romantic-600 hover:text-romantic-700 py-2">
              ← Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 flex items-center justify-center p-8">
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl w-full"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-romantic-600 font-semibold text-lg">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-romantic-600 font-semibold text-lg">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              className="bg-gradient-to-r from-romantic-500 to-pink-500 h-3 rounded-full"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
              whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
              className={`p-6 rounded-xl text-lg font-semibold transition-all ${
                selectedAnswer === null
                  ? 'bg-gray-100 hover:bg-romantic-100 text-gray-800'
                  : selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : index === question.correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800 opacity-50'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <Link href="/">
          <button className="mt-8 text-romantic-600 hover:text-romantic-700 py-2">
            ← Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
