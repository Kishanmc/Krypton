import React from 'react';
import { useParams } from 'react-router-dom';

const GameSector = () => {
  const { sector } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Welcome to the {sector} sector!</h2>
      {/* Add dynamic content here */}
    </div>
  );
};

export default GameSector;
