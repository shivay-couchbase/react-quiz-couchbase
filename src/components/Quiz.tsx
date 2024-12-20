import React, { useState } from 'react';
import { questions } from '../lib/questions';
import { saveScore, getTopScores } from '../lib/api';
import { Trophy } from 'lucide-react';

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userName, setUserName] = useState('');
  const [topScores, setTopScores] = useState<{ userName: string; score: number }[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleSubmitScore = async () => {
    if (!userName.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await saveScore(userName, score);
      const topScoresData = await getTopScores(5);
      setTopScores(topScoresData);
      setShowLeaderboard(true);
    } catch (error) {
      console.error('Error saving score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowLeaderboard(false);
    setUserName('');
    setIsSubmitting(false);
  };

  if (showLeaderboard) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
          <h2 className="text-2xl font-bold">Leaderboard</h2>
        </div>
        <div className="space-y-4">
          {topScores.map((entry, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">{entry.userName}</span>
              <span className="text-green-600 font-bold">{entry.score}/{questions.length}</span>
            </div>
          ))}
        </div>
        <button
          onClick={restartQuiz}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg mb-4">
          Your score: <span className="font-bold text-green-600">{score}</span> out of {questions.length}
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your name to save score:
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </div>
        <button
          onClick={handleSubmitScore}
          disabled={!userName.trim() || isSubmitting}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Saving...' : 'Save Score'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Question {currentQuestion + 1}/{questions.length}</h2>
        <p className="text-gray-600">{questions[currentQuestion].question}</p>
      </div>
      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Score: {score}/{currentQuestion}
      </div>
    </div>
  );
}