import React from 'react';
import { Link } from 'react-router-dom';

const simulations = [
  { title: "3D Magnetic Field Simulation", path: "3D Magnetic Field Simulation" },
  { title: "Projectile Motion Simulator", path: "Projectile Motion Simulator" },
  { title: "Newton's Laws of Motion", path: "Newton's Laws of Motion" },
  { title: "Virtual Optics Lab", path: "Virtual Optics Lab" }
];

const PhysicsLab = () => {
  return (
    <>
      <style>{`
        .physics-lab-container {
          max-width: 800px;
          margin: 50px auto;
          padding: 30px;
          background: #f8fafc;
          border-radius: 20px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .physics-lab-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 15px;
        }

        .physics-lab-subtitle {
          font-size: 1.2rem;
          color: #475569;
          margin-bottom: 25px;
        }

        .physics-lab-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .physics-lab-item {
          margin: 15px 0;
        }

        .physics-lab-link {
          display: inline-block;
          width: 100%;
          max-width: 400px;
          padding: 15px 20px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .physics-lab-link:hover {
          background: linear-gradient(135deg, #1d4ed8, #2563eb);
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        }

        .physics-lab-link:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="physics-lab-container">
        <h1 className="physics-lab-title">Physics Lab</h1>
        <p className="physics-lab-subtitle">
          Welcome to the Physics Lab! Explore the following sectors:
        </p>

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
    </>
  );
};

export default PhysicsLab;
