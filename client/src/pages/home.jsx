import React from "react";
import "./css/Home.css";
import poster from "../component/assets/poster.jpg"; // Main poster
import aboutImage from "../component/assets/about.jpg"; // About section image
import game1 from "../component/assets/game1.png"; // Game suggestions
import game2 from "../component/assets/game2.png";
import game3 from "../component/assets/game3.png";

const Home = () => {
  return (
    <div className="home">
      {/* Poster Section */}
      <section className="poster">
        <img src={poster} alt="Krypton Poster" className="poster-img" />
      </section>

    

      {/* Most Researched Topics */}
      <section className="trending">
        <h2> Most Researched Education Topics</h2>
        <ul>
          <li> AI in Education</li>
          <li>Virtual & Augmented Reality Learning</li>
          <li> Gamification in STEM</li>
          <li> Adaptive Learning Platforms</li>
          <li> Coding for Kids</li>
        </ul>
      </section>

      {/* Games Suggestion Section */}
      <section className="games">
        <h2>🎮 Try These Educational Games</h2>
        <div className="game-list">
          <div className="game-item">
            <img src={game1} alt="Game 1" />
            <h3>Code Quest</h3>
          </div>
          <div className="game-item">
            <img src={game2} alt="Game 2" />
            <h3>Math Adventure</h3>
          </div>
          <div className="game-item">
            <img src={game3} alt="Game 3" />
            <h3>Physics Simulator</h3>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <img src={aboutImage} alt="About Krypton" className="about-img" />
          <div className="about-text">
            <h2>About Krypton</h2>
            <p>
              Krypton is a revolutionary learning platform that integrates AI, gamification, 
              and immersive education techniques to make learning fun and engaging.
            </p>
            <p>
              We provide interactive content, real-world simulations, and personalized learning 
              experiences for students across various domains.
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
