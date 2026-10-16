import { useState, useEffect, useRef } from 'react';
import { fruits, getRandomFruits } from '../data/fruits';
import Confetti from './Confetti';
import './FruitQuiz.css';

function FruitQuiz() {
  const [currentFruit, setCurrentFruit] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [usedFruitIds, setUsedFruitIds] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const generateQuestion = () => {
    
    const availableFruits = fruits.filter(fruit => !usedFruitIds.includes(fruit.id));
    
    if (availableFruits.length < 4) {
      setUsedFruitIds([]);
      const randomFruits = getRandomFruits(4);
      const correctFruit = randomFruits[0];
      const shuffledOptions = [...randomFruits].sort(() => Math.random() - 0.5);
      
      setCurrentFruit(correctFruit);
      setOptions(shuffledOptions);
      setUsedFruitIds([correctFruit.id]);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(null);
      return;
    }
    
    const shuffled = [...availableFruits].sort(() => Math.random() - 0.5);
    const randomFruits = shuffled.slice(0, 4);
    const correctFruit = randomFruits[0];
    const shuffledOptions = [...randomFruits].sort(() => Math.random() - 0.5);
    
    setCurrentFruit(correctFruit);
    setOptions(shuffledOptions);
    setUsedFruitIds(prev => [...prev, correctFruit.id]);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
  };

  const startQuiz = () => {
    setScore(0);
    setTotalQuestions(0);
    setQuizComplete(false);
    setUsedFruitIds([]);
    setCurrentStreak(0);
    setBestStreak(0);
    generateQuestion();
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silent fail
    }
  };

  const playErrorSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(280, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Silent fail
    }
  };

  const handleAnswerSelect = (option) => {
    if (showResult) return;
    
    setSelectedAnswer(option);
    const correct = option.id === currentFruit.id;
    setIsCorrect(correct);
    setShowResult(true);
    setTotalQuestions(totalQuestions + 1);
    
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      setShowConfetti(true);
      setCelebrating(true);
      playSuccessSound();
      setTimeout(() => {
        setShowConfetti(false);
        setCelebrating(false);
      }, 1000);
    } else {
      setCurrentStreak(0);
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (totalQuestions >= 10) {
      setQuizComplete(true);
    } else {
      generateQuestion();
    }
  };

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="quiz-container">
        <div className="quiz-complete">
          <h1>🎊 Quiz Complete! 🎊</h1>
          <div className="quiz-results">
            <p className="quiz-score-text">
              You got {score} out of {totalQuestions} correct!
            </p>
            <p className="quiz-percentage">
              {percentage}% Correct
            </p>
            {bestStreak > 0 && (
              <p className="best-streak">Best Streak: {bestStreak} correct in a row! ✨</p>
            )}
            {percentage === 100 && (
              <p className="quiz-perfect">Perfect Score! You're a fruit expert! 🌟</p>
            )}
            {percentage >= 80 && percentage < 100 && (
              <p className="quiz-great">Excellent! You know your fruits! 🎉</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="quiz-good">Great effort! Keep learning! 💪</p>
            )}
            {percentage < 60 && (
              <p className="quiz-encourage">Keep practicing! You'll improve! 📚</p>
            )}
          </div>
          <button className="quiz-restart-button" onClick={startQuiz}>
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <Confetti active={showConfetti} />
      <h1 className="quiz-title">Fruit Quiz</h1>
      <p className="quiz-instructions">
        Look at the fruit picture and choose the correct name!
      </p>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(totalQuestions / 10) * 100}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <p className="progress-text">
            Question {totalQuestions + 1} of 10
          </p>
          <div className="score-display">
            <span className="score-label">Score:</span>
            <span className="score-value">{score}/{totalQuestions || 1}</span>
            {currentStreak > 0 && (
              <span className="streak-indicator">🔥 {currentStreak} in a row!</span>
            )}
          </div>
        </div>
      </div>

      {currentFruit && (
        <>
          <div className="quiz-question">
            <div className="quiz-fruit-image-container">
              <img 
                src={currentFruit.image} 
                alt="What fruit is this?"
                className="quiz-fruit-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Fruit';
                }}
              />
            </div>

            <div className={`quiz-options ${celebrating ? 'celebrating' : ''}`}>
              <h2 className="options-title">What fruit is this?</h2>
              {options.map((option) => {
                const isSelected = selectedAnswer && selectedAnswer.id === option.id;
                const isCorrectOption = option.id === currentFruit.id;
                let buttonClass = 'quiz-option-button';
                
                if (showResult) {
                  if (isCorrectOption) {
                    buttonClass += ' correct';
                  } else if (isSelected && !isCorrectOption) {
                    buttonClass += ' incorrect';
                  }
                } else if (isSelected) {
                  buttonClass += ' selected';
                }

                return (
                  <button
                    key={option.id}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    aria-pressed={isSelected}
                  >
                    {option.name}
                    {showResult && isCorrectOption && (
                      <span className="option-check">✓</span>
                    )}
                    {showResult && isSelected && !isCorrectOption && (
                      <span className="option-x">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {showResult && (
            <div className="quiz-feedback">
              {isCorrect ? (
                <div className={`feedback-correct ${celebrating ? 'celebrate' : ''}`}>
                  <h2 className="celebration-text">🎊 Correct! 🎊</h2>
                  <p>Fantastic! This is a {currentFruit.name}.</p>
                  <p className="fruit-fact">{currentFruit.facts}</p>
                </div>
              ) : (
                <div className="feedback-incorrect">
                  <h2>Not quite</h2>
                  <p>The correct answer is: <strong>{currentFruit.name}</strong></p>
                  <p className="fruit-fact">{currentFruit.facts}</p>
                </div>
              )}
              <button className="quiz-next-button" onClick={handleNext}>
                {totalQuestions >= 10 ? 'Finish Quiz' : 'Next Question →'}
              </button>
            </div>
          )}
        </>
      )}

      <button className="quiz-restart-button-secondary" onClick={startQuiz}>
        🔄 Restart Quiz
      </button>
    </div>
  );
}

export default FruitQuiz;
