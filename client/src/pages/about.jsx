import React from 'react';

const About = () => {
  return (
    <div style={{ backgroundColor: '#0D0D1A', color: 'white', padding: '40px', fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#00FFFF' }}>About Krypton</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          <strong>Krypton</strong> is a next-generation platform designed to revolutionize STEM learning using 3D animations, simulations, and gamified labs.
          Our goal is to make complex scientific concepts fun, visual, and easy to understand for all students — especially neurodivergent learners.
        </p>

        <h2 style={{ marginTop: '40px', fontSize: '1.8rem', color: '#00FFFF' }}>🚀 Our Mission</h2>
        <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>🔬 Make science learning immersive using 3D virtual labs and real-time simulations</li>
          <li>🎮 Turn abstract topics into interactive learning games and animated explainers</li>
          <li>🧠 Build accessible tools for neurodivergent and visual learners</li>
          <li>🌍 Democratize high-quality STEM education for students around the world</li>
        </ul>

        <h2 style={{ marginTop: '40px', fontSize: '1.8rem', color: '#00FFFF' }}>🧑‍🔬 Who We Are</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          We are a passionate team of developers, educators, and designers on a mission to blend creativity and technology for better education.
          Our tools combine <strong>Three.js</strong>, <strong>React</strong>, and <strong>AI explainers</strong> to bring textbooks to life.
        </p>

        <h2 style={{ marginTop: '40px', fontSize: '1.8rem', color: '#00FFFF' }}>📫 Get in Touch</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Have ideas, suggestions, or want to collaborate? Reach us at: <br />
          <a href="mailto:team@kryptonlabs.io" style={{ color: '#00FFFF' }}>team@kryptonlabs.io</a>
        </p>
      </div>
    </div>
  );
};

export default About;
