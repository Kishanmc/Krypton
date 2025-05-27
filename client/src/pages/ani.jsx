import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AtomModel from './AtomModel';
import WaveModel from './wave';
import PendulumModel from './PendulumModel';

const Ani = () => {
  const [text, setText] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [explanation, setExplanation] = useState('');

  const speak = (msg) => {
    const utter = new SpeechSynthesisUtterance(msg);
    utter.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const keywordToExplanation = {
    atom: "An atom consists of a nucleus made of protons and neutrons, surrounded by electrons orbiting in shells.",
    pendulum: "A pendulum is a mass hung from a fixed point so that it can swing freely under the effect of gravity.",
    wave: "A wave is a repeating disturbance or vibration that travels through space or a medium, carrying energy.",
  };

  const handlePlay = () => {
    const input = text.toLowerCase();

    if (input.includes("atom")) {
      setCurrentKeyword("atom");
      setExplanation(keywordToExplanation.atom);
      speak(keywordToExplanation.atom);
    } else if (input.includes("pendulum")) {
      setCurrentKeyword("pendulum");
      setExplanation(keywordToExplanation.pendulum);
      speak(keywordToExplanation.pendulum);
    } else if (input.includes("wave")) {
      setCurrentKeyword("wave");
      setExplanation(keywordToExplanation.wave);
      speak(keywordToExplanation.wave);
    } else {
      setCurrentKeyword("");
      setExplanation("Sorry, I couldn't recognize that concept.");
      speak("Sorry, I couldn't recognize that concept.");
    }
  };

  const renderModel = () => {
    switch (currentKeyword) {
      case 'atom':
        return <AtomModel />;
      case 'pendulum':
        return <PendulumModel />;
      case 'wave':
        return <WaveModel />;
      default:
        return null;
    }
  };

  return (
    <div style={{
      padding: '5vw',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: 'Poppins, sans-serif',
      color: '#f1f1f1',
      backgroundColor: '#1e1e2f',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        marginBottom: '1rem',
        textAlign: 'center',
        color: '#00d1ff'
      }}>
        🧪 3D Science Explainer
      </h2>

      <textarea
        placeholder="Type something like: Structure of an atom"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: 'clamp(14px, 2vw, 18px)',
          borderRadius: '8px',
          border: 'none',
          marginBottom: '1rem',
          outline: 'none',
          resize: 'none',
          backgroundColor: '#2a2a40',
          color: '#f1f1f1',
          boxSizing: 'border-box'
        }}
      />

      <button
        onClick={handlePlay}
        style={{
          backgroundColor: '#00d1ff',
          color: '#1e1e2f',
          padding: '10px 20px',
          fontSize: 'clamp(14px, 2vw, 18px)',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '1rem',
          transition: 'all 0.3s ease',
          width: '100%',
        }}
      >
        ▶️ Explain & Animate
      </button>

      <p style={{
        fontSize: 'clamp(14px, 2vw, 18px)',
        marginBottom: '20px',
        lineHeight: '1.5'
      }}>
        <strong style={{ color: '#00ffc3' }}>Explanation:</strong> {explanation}
      </p>

      <div style={{
        height: '60vh',
        minHeight: '300px',
        backgroundColor: '#121222',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '100%'
      }}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {renderModel()}
        </Canvas>
      </div>
    </div>
  );
};

export default Ani;
