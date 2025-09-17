import React from 'react';

const WaveModel = () => {
  const wavePoints = Array.from({ length: 1000 }, (_, i) => {
    const x = i * 0.2 - 10;
    const y = Math.sin(i * 0.3) * 0.5;
    return [x, y, 0];
  });

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={wavePoints.length}
          array={new Float32Array(wavePoints.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="red" />
    </line>
  );
};

export default WaveModel;
