import React from 'react';
import { Sphere, OrbitControls } from '@react-three/drei';

const AtomModel = () => (
  <>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="blue" />
    </Sphere>
    <OrbitControls />
  </>
);

export default AtomModel;
