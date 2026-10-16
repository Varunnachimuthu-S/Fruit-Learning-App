import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import FruitGallery from './components/FruitGallery';
import FruitMatchingGame from './components/FruitMatchingGame';
import FruitQuiz from './components/FruitQuiz';
import AddFruit from './components/AddFruit';
import { fruits as initialFruits } from './data/fruits';

function App() {
  const [fruits, setFruits] = useState(initialFruits);

  const addFruit = (newFruit) => {
    setFruits(prevFruits => [...prevFruits, newFruit]);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<FruitGallery fruits={fruits} />} />
          <Route path="/matching" element={<FruitMatchingGame />} />
          <Route path="/quiz" element={<FruitQuiz />} />
          <Route path="/add-fruit" element={<AddFruit addFruit={addFruit} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
