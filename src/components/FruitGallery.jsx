import { useState } from 'react';
import FruitCard from './FruitCard';
import './FruitGallery.css';

function FruitGallery({ fruits }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'tropical', 'berries', 'citrus', 'stone', 'common'];

  const filteredFruits = selectedCategory === 'all' 
    ? fruits 
    : fruits.filter(fruit => fruit.category === selectedCategory);

  return (
    <div className="fruit-gallery">
      <h1 className="gallery-title">Fruit Garden</h1>
      <p className="gallery-subtitle">Explore delicious fruits from around the world!</p>
      
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
          >
            {category === 'all' ? '🌈 All Fruits' : 
             category === 'tropical' ? '🏝️ Tropical' :
             category === 'berries' ? '🫐 Berries' :
             category === 'citrus' ? '🍊 Citrus' :
             category === 'stone' ? '🍑 Stone Fruits' :
             '🍎 Common'}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredFruits.map(fruit => (
          <FruitCard 
            key={fruit.id} 
            fruit={fruit} 
            showFacts={true}
          />
        ))}
      </div>
      
      {filteredFruits.length === 0 && (
        <p className="no-fruits">No fruits found in this category.</p>
      )}
    </div>
  );
}

export default FruitGallery;
