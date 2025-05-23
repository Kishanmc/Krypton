import React from 'react';
import { useParams } from 'react-router-dom';
import './ChemistryLab.css';

const simulationMap = {
  "Periodic Table": "https://zippy-tarsier-a08bf0.netlify.app/",
  "Acid Base Reaction": "https://neon-klepon-2313de.netlify.app/",
  "Molecular Dynamic Simulator": "https://scintillating-torte-91ceda.netlify.app/",
  "3D Chemistry Lab Simulator": "https://fancy-medovik-21d99d.netlify.app/"
};

const ChemistrySimulationPage = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const simulationUrl = simulationMap[decodedTitle];

  if (!simulationUrl) {
    return <h2>Simulation not found.</h2>;
  }

  return (
    <div className="chem-lab-container">
      <h2 className="chem-lab-title">{decodedTitle}</h2>
      <iframe
        src={simulationUrl}
        title={decodedTitle}
        className="chem-iframe"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default ChemistrySimulationPage;
