import React from 'react';
import { Link } from 'react-router-dom';
import './PhysicsLab.css';

const simulations = [
  { title: "3D Magnetic Field Simulation", path: "3D Magnetic Field Simulation" },
  { title: "Projectile Motion Simulator", path: "Projectile Motion Simulator" },
  { title: "Newton's Laws of Motion", path: "Newton's Laws of Motion" },
  { title: "Virtual Optics Lab", path: "Virtual Optics Lab" }
];

const PhysicsLab = () => {
  return (
    <div className="physics-lab-container">
      <h1 className="physics-lab-title">Physics Lab</h1>
      <p className="physics-lab-subtitle">Welcome to the Physics Lab! Explore the following sectors:</p>

      <ul className="physics-lab-list">
        {simulations.map((sim, index) => (
          <li key={index} className="physics-lab-item">
            <Link
              to={`/lab/physics/${encodeURIComponent(sim.path)}`}
              className="physics-lab-link"
            >
              {sim.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhysicsLab;
