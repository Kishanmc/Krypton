import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
import poster from "../component/assets/poster.jpg";       // Main poster
import aboutImage from "../component/assets/about.jpg";    // About section image
import game1 from "../component/assets/game1.png";        // 3D Lab
import game2 from "../component/assets/game2.png";        // 3D Animation
import game3 from "../component/assets/game3.png";        // Games

const Home = () => {
  return (
    <div className="home">
      {/* Poster Section */}
      <section className="poster">
        <img src={poster} alt="Krypton Poster" className="poster-img" />
      </section>

      {/* Games Suggestion Section */}
      <section className="games">
      <h2 style={{
  fontFamily: "'Orbitron', sans-serif",
  fontSize: "2rem",
  fontWeight: 600,
  color: "#ffffff",
  textAlign: "center",
  margin: "2rem 0",
  lineHeight: "1.4",
  textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
}}>
  Step Into Our Immersive 3D Experience And Explore Science Experiments
  Safely And Interactively
</h2>

        <div className="game-list">
          {/* 3D Lab */}
          <Link to="/3dlab" className="game-item">
            <img src={game1} alt="3D Lab" />
            <h3>3D Lab</h3>
          </Link>

          {/* 3D Animation */}
          <Link to="/3danimation" className="game-item">
            <img src={game2} alt="3D Animation" />
            <h3>3D Animation</h3>
          </Link>

          {/* Games */}
          <Link to="/games" className="game-item">
            <img src={game3} alt="Games" />
            <h3>Games</h3>
          </Link>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <img src={aboutImage} alt="About Krypton" className="about-img" />
          <div className="about-text">
            <h2>About Krypton</h2>
            <p>
              Krypton is a revolutionary learning platform that integrates AI,
              gamification, and immersive education techniques to make learning
              fun and engaging.
            </p>
            <p>
              We provide interactive content, real-world simulations, and
              personalized learning experiences for students across various
              domains.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Krypton. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
