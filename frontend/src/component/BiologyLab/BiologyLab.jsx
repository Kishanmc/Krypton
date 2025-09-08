import React from 'react';
import { Link } from 'react-router-dom';
import './BiologyLab.css';

const tools = [
  { title: 'Plant Hormone', path: 'plant-hormone' },
  { title: 'Mendelian Genetics Simulator', path: 'mendelian-genetics' },
  
  { title: 'Hibiscus Dissection', path: 'hibiscus-dissection' },{ title: '3D Human Organ Viewer', path: 'human-organ-viewer' },
  { title: 'Division: Mitosis and Meiosis', path: 'cell-division' },
  { title: '3D Human Circulation System', path: 'human-circulation' },
];

const BiologyLab = () => {
  return (
    <div className="bio-lab-container">
      <h1>Biology Lab</h1>
      <p>Welcome to the interactive Biology Lab!</p>
      <div className="bio-tools">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={`/lab/biology/${tool.path}`}
            className="bio-card"
          >
            {tool.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BiologyLab;
