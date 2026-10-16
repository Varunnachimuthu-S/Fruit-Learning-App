import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">🍎 Fruit Garden 🍇</h1>
        <p className="home-subtitle">
          Discover colorful fruits through fun and interactive activities!
        </p>
      </div>

      <div className="activities-grid">
        <Link to="/gallery" className="activity-card">
          <div className="activity-icon">🍓</div>
          <h2 className="activity-title">Fruit Explorer</h2>
          <p className="activity-description">
            Discover our colorful collection of fruits from around the world. 
            Tap each fruit to learn fascinating facts!
          </p>
          <div className="activity-button">Start Exploring →</div>
        </Link>

        <Link to="/matching" className="activity-card">
          <div className="activity-icon">🎮</div>
          <h2 className="activity-title">Pair & Match</h2>
          <p className="activity-description">
            Connect fruit images with their correct names.
            Challenge yourself and match them all!
          </p>
          <div className="activity-button">Play Now →</div>
        </Link>

        <Link to="/quiz" className="activity-card">
          <div className="activity-icon">🏆</div>
          <h2 className="activity-title">Fruit Challenge</h2>
          <p className="activity-description">
            Put your fruit knowledge to the test! Complete 10 questions
            and earn your score!
          </p>
          <div className="activity-button">Take Challenge →</div>
        </Link>
      </div>

      <div className="home-features">
        <h2 className="features-title">What You'll Learn</h2>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🌈</span>
            <span className="feature-text">Discover fruit colors</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💡</span>
            <span className="feature-text">Amazing fruit facts</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧠</span>
            <span className="feature-text">Memory building games</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⭐</span>
            <span className="feature-text">Earn achievements</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;