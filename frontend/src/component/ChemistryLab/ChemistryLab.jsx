import React from 'react';
import { Link } from 'react-router-dom';
import './ChemistryLab.css';

const simulations = [
  { title: "Periodic Table", path: "Periodic Table" },
  { title: "Acid Base Reaction", path: "Acid Base Reaction" },
  { title: "Molecular Dynamic Simulator", path: "Molecular Dynamic Simulator" },
  { title: "3D Chemistry Lab Simulator", path: "3D Chemistry Lab Simulator" }
];

const ChemistryLab = () => {
  return (
    <div className="chem-lab-container">
      <h1 className="chem-lab-title">Chemistry Lab</h1>
      <p className="chem-lab-subtitle">Welcome to the Chemistry Lab! Explore the following sectors:</p>

      <ul className="chem-lab-list">
        {simulations.map((sim, index) => (
          <li key={index} className="chem-lab-item">
            <Link to={`/lab/chemistry/${encodeURIComponent(sim.path)}`} className="chem-lab-link">
              {sim.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChemistryLab;
