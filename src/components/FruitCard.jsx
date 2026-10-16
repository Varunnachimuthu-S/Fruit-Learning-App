import './FruitCard.css';

function FruitCard({ fruit, showFacts = false, onClick }) {

  const speakFruitName = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(fruit.name);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for child-friendly voice
      utterance.volume = 1;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(fruit);
    }
  };

  return (
    <div 
      className={`fruit-card ${onClick ? 'clickable' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={speakFruitName}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={onClick ? `Select ${fruit.name}` : `${fruit.name} card`}
    >
      <div className="fruit-card-image-container">
        <img 
          src={fruit.image} 
          alt={fruit.name}
          className="fruit-card-image"
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.src = 'https://via.placeholder.com/300x300?text=' + fruit.name;
          }}
        />
      </div>
      
      <div className="fruit-card-content">
        <h3 className="fruit-card-name">{fruit.name}</h3>
        
        {showFacts && (
          <div className="fruit-card-info">
            <p className="fruit-card-color">🎨 {fruit.color}</p>
            <p className="fruit-card-facts">{fruit.facts}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FruitCard;
