'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Diya({ position }) {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (flameRef.current) {
      // Flickering flame effect
      const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.1 + 1;
      flameRef.current.scale.y = flicker;
      flameRef.current.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 5) * 0.05;
    }
    
    if (lightRef.current) {
      // Flickering light intensity
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Diya Base */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 16]} />
        <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Oil */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.3, 0]}>
        <coneGeometry args={[0.1, 0.3, 8]} />
        <meshStandardMaterial 
          color="#FFA500"
          emissive="#FF4500"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Flame Glow */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Point Light for flame */}
      <pointLight
        ref={lightRef}
        position={[0, 0.4, 0]}
        color="#FFA500"
        intensity={2}
        distance={3}
        decay={2}
      />
    </group>
  );
}
