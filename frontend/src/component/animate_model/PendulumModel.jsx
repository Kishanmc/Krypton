import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PendulumModel = ({ length = 2, gravity = 9.81 }) => {
  const rodRef = useRef();
  const ballRef = useRef();

  // Pendulum physics state
  const state = useRef({
    angle: Math.PI / 6, // starting angle (30 degrees)
    velocity: 0,
    acceleration: 0,
  });

  useFrame(() => {
    const dt = 0.02; // timestep
    const { angle, velocity } = state.current;

    // Simple pendulum physics: θ'' = -(g/L) * sin(θ)
    state.current.acceleration = -(gravity / length) * Math.sin(angle);
    state.current.velocity += state.current.acceleration * dt;
    state.current.angle += velocity * dt;

    // Apply rotation to rod
    if (rodRef.current) {
      rodRef.current.rotation.z = state.current.angle;
    }

    // Update ball position (end of rod)
    if (ballRef.current) {
      ballRef.current.position.x = Math.sin(state.current.angle) * length;
      ballRef.current.position.y = -Math.cos(state.current.angle) * length;
    }
  });

  return (
    <>
      {/* Rod */}
      <mesh ref={rodRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, length]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Ball */}
      <mesh ref={ballRef} position={[0, -length, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};

export default PendulumModel;
