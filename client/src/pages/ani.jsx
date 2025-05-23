import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AtomModel from './AtomModel';
import WaveModel from './wave';
import PendulumModel from './PendulumModel';
const GEMINI_API_KEY = "AIzaSyCRu85W-xWLGjsCaMCfiylOa_5IW53KgUI";

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
    <div style={{ padding: '20px' }}>
      <h2>🧪 3D Science Explainer</h2>

      <textarea
        placeholder="Type something like: Structure of an atom"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />

      <button onClick={handlePlay} style={{ marginTop: '10px', padding: '10px 20px' }}>
        ▶️ Explain & Animate
      </button>

      <p><strong>Explanation:</strong> {explanation}</p>

      <div style={{ height: '400px', marginTop: '20px' }}>
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
