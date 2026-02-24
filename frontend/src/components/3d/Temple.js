'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Temple() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Platform */}
      <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.3, 6]} />
        <meshStandardMaterial color="#8B4513" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Main Temple Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#D2691E" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Pillars */}
      {[
        [-1.5, 1, 1.5],
        [1.5, 1, 1.5],
        [-1.5, 1, -1.5],
        [1.5, 1, -1.5]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 2.5, 16]} />
          <meshStandardMaterial color="#CD853F" metalness={0.3} roughness={0.6} />
        </mesh>
      ))}

      {/* Dome/Shikhara */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[2.5, 2, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Top Kalash */}
      <mesh position={[0, 4.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={1} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, 0.5, 2.01]} castShadow>
        <boxGeometry args={[1.2, 1.8, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Decorative Elements - Reduced */}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 2.3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, 2.2, z]} castShadow>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial 
              color="#FFD700" 
              metalness={0.8} 
              roughness={0.2}
              emissive="#FFA500"
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}

      {/* Om Symbol on front */}
      <mesh position={[0, 1.5, 2.05]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
