import React from 'react';
import { Link } from 'react-router-dom';

const Games = () => {
  const sectors = [
    'Action',
    'Adventure',
    'Puzzle',
    'Strategy',
    'Sports',
    'RPG',
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Game Sectors</h2>
      <ul className="space-y-2">
        {sectors.map((sector, index) => (
          <li key={index}>
            <Link
              to={`/games/${sector.toLowerCase()}`}
              className="text-blue-600 hover:underline"
            >
              {sector}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
