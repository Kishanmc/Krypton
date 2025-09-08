import React from 'react';
import { useParams } from 'react-router-dom';

const toolMap = {
  "3D Magnetic Field Simulation": "https://playful-syrniki-82159f.netlify.app/",
  "Projectile Motion Simulator": "https://classy-pastelito-66e1d6.netlify.app/",
  "Newton's Laws of Motion": "https://symphonious-clafoutis-4d7094.netlify.app/",
  "Virtual Optics Lab": "https://genuine-kitsune-03546c.netlify.app/"
};

const SimulationPage = () => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const simUrl = toolMap[decodedTitle];

  if (!simUrl) {
    return <h2>Simulation not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{decodedTitle}</h2>
      <iframe
        src={simUrl}
        title={decodedTitle}
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc", borderRadius: "8px" }}
      />
    </div>
  );
};

export default SimulationPage;
