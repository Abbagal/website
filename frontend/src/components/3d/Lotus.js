'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function Lotus({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();

  // Remove useFrame hook to prevent Canvas errors
  // Static lotus without animation to avoid hook issues

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Center */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color="#F7B801" emissive="#F7B801" emissiveIntensity={0.3} />
      </mesh>

      {/* Petals - Reduced count */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.6;
        const z = Math.sin(angle) * 0.6;
        
        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, angle, Math.PI / 6]}
          >
            <boxGeometry args={[0.4, 0.05, 0.8]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              emissive="#FF1493"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
