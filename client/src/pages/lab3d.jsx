import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Lab3d.css';

import physicsImg from './phy.png';   // Replace with actual image path
import chemistryImg from './chem.png';
import biologyImg from './bio.png';

const Lab3D = () => {
  const navigate = useNavigate();

  return (
    <div className="lab3d-container">
      <h2>Select a Science Lab</h2>
      <div className="lab-grid">
        <div className="lab-card" onClick={() => navigate('/lab/physics')}>
          <img src={physicsImg} alt="Physics Lab" />
          <div className="lab-label">Physics</div>
        </div>
        <div className="lab-card" onClick={() => navigate('/lab/chemistry')}>
          <img src={chemistryImg} alt="Chemistry Lab" />
          <div className="lab-label">Chemistry</div>
        </div>
        <div className="lab-card" onClick={() => navigate('/lab/biology')}>
          <img src={biologyImg} alt="Biology Lab" />
          <div className="lab-label">Biology</div>
        </div>
      </div>
    </div>
  );
};

export default Lab3D;
