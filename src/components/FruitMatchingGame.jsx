import { useState, useEffect } from 'react';
import { fruits as allFruits } from '../data/fruits';
import Confetti from './Confetti';
import './FruitMatchingGame.css';

function FruitMatchingGame() {
  const [fruits, setFruits] = useState([]);
  const [fruitNames, setFruitNames] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastMatchedId, setLastMatchedId] = useState(null);

  const startNewGame = () => {
    // Get 6 unique random fruits (no duplicates)
    const shuffled = [...allFruits].sort(() => Math.random() - 0.5);
    const gameFruits = shuffled.slice(0, 6);
    const names = gameFruits.map(f => f.name).sort(() => Math.random() - 0.5);
    
    setFruits(gameFruits);
    setFruitNames(names);
    setSelectedFruit(null);
    setSelectedName(null);
    setMatchedPairs([]);
    setScore(0);
    setGameComplete(false);
    setLastMatchedId(null);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleFruitClick = (fruit) => {
    if (matchedPairs.includes(fruit.id)) return;
    
    if (selectedFruit === fruit.id) {
      setSelectedFruit(null);
    } else {
      setSelectedFruit(fruit.id);
      checkMatch(fruit.id, selectedName);
    }
  };

  const handleNameClick = (name) => {
    if (matchedPairs.some(id => {
      const fruit = fruits.find(f => f.id === id);
      return fruit && fruit.name === name;
    })) return;

    if (selectedName === name) {
      setSelectedName(null);
    } else {
      setSelectedName(name);
      checkMatch(selectedFruit, name);
    }
  };

  const playMatchSound = () => {
    // Gentle, calming sound for autism-friendly design
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5 - brighter tone
      
      gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Silent fail
    }
  };

  const playErrorSound = () => {
    // Very gentle error sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(280, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      // Silent fail
    }
  };

  const checkMatch = (fruitId, name) => {
    if (fruitId && name) {
      const fruit = fruits.find(f => f.id === fruitId);
      if (fruit && fruit.name === name) {
        // Correct match!
        playMatchSound();
        setLastMatchedId(fruitId);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 800);
        
        setMatchedPairs(prevMatchedPairs => {
          const newMatchedPairs = [...prevMatchedPairs, fruitId];
          
          setTimeout(() => {
            if (newMatchedPairs.length === fruits.length) {
              setGameComplete(true);
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 1500);
            }
          }, 500);
          
          return newMatchedPairs;
        });
        setScore(prevScore => prevScore + 10);
        setSelectedFruit(null);
        setSelectedName(null);
      } else {
        // Incorrect match
        playErrorSound();
        setTimeout(() => {
          setSelectedFruit(null);
          setSelectedName(null);
        }, 1000);
      }
    }
  };

  const isMatched = (fruitId) => {
    return matchedPairs.includes(fruitId);
  };

  const isNameMatched = (name) => {
    return matchedPairs.some(id => {
      const fruit = fruits.find(f => f.id === id);
      return fruit && fruit.name === name;
    });
  };

  const isFruitSelected = (fruitId) => {
    return selectedFruit === fruitId;
  };

  const isNameSelected = (name) => {
    return selectedName === name;
  };

  return (
    <div className="fruit-matching-game">
      <Confetti active={showConfetti} />
      <h1 className="game-title">Fruit Matching Game</h1>
      <p className="game-instructions">
        Click on a fruit picture and then click on its name to make a match!
      </p>

      <div className="game-score">
        <div className="score-info">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
          <span className="score-max">/ {fruits.length * 10}</span>
        </div>
        <button className="new-game-button" onClick={startNewGame}>
          🔄 New Game
        </button>
      </div>

      {gameComplete && (
        <div className="game-complete" role="alert">
          <h2>🎊 Fantastic! 🎊</h2>
          <p>You matched all the fruits!</p>
          <p>Final Score: {score}</p>
          <button className="play-again-button" onClick={startNewGame}>
            Play Again
          </button>
        </div>
      )}

      <div className="matching-container">
        <div className="fruits-section">
          <h2 className="section-title">Fruits</h2>
          <div className="fruits-grid">
            {fruits.map(fruit => (
              <button
                key={fruit.id}
                className={`fruit-match-card ${
                  isMatched(fruit.id) ? 'matched' : ''
                } ${
                  isFruitSelected(fruit.id) ? 'selected' : ''
                } ${
                  lastMatchedId === fruit.id ? 'just-matched' : ''
                }`}
                onClick={() => handleFruitClick(fruit)}
                disabled={isMatched(fruit.id)}
                aria-label={`Select ${fruit.name}`}
              >
                <img 
                  src={fruit.image} 
                  alt={fruit.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=' + fruit.name;
                  }}
                />
                {isMatched(fruit.id) && (
                  <span className="match-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="names-section">
          <h2 className="section-title">Names</h2>
          <div className="names-grid">
            {fruitNames.map((name, index) => (
              <button
                key={`${name}-${index}`}
                className={`name-button ${
                  isNameMatched(name) ? 'matched' : ''
                } ${
                  isNameSelected(name) ? 'selected' : ''
                }`}
                onClick={() => handleNameClick(name)}
                disabled={isNameMatched(name)}
                aria-label={`Select name ${name}`}
              >
                {name}
                {isNameMatched(name) && (
                  <span className="match-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FruitMatchingGame;
