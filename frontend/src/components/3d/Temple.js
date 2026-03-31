'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function Temple() {
  const groupRef = useRef();

  // Remove useFrame hook to prevent Canvas errors
  // Static temple without animation to avoid hook issues

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Platform - Larger for Padmavati Temple */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.4, 8]} />
        <meshStandardMaterial color="#8B4513" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Steps leading to temple */}
      <mesh position={[0, -0.1, 3]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshStandardMaterial color="#A0522D" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Main Temple Body - Traditional style */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[5, 2.5, 5]} />
        <meshStandardMaterial color="#F4A460" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Second Tier - Padmavati style */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <boxGeometry args={[4, 1.5, 4]} />
        <meshStandardMaterial color="#DEB887" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Ornate Pillars - 8 pillars for grandeur */}
      {[
        [-2, 1.2, 2], [2, 1.2, 2], [-2, 1.2, -2], [2, 1.2, -2],
        [-1.5, 1.2, 2.5], [1.5, 1.2, 2.5], [-1.5, 1.2, -2.5], [1.5, 1.2, -2.5]
      ].map((pos, i) => (
        <group key={i}>
          <mesh position={pos} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 2.8, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Pillar capitals */}
          <mesh position={[pos[0], pos[1] + 1.5, pos[2]]} castShadow>
            <cylinderGeometry args={[0.25, 0.15, 0.3, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Main Shikhara - Multi-tiered */}
      <mesh position={[0, 4, 0]} castShadow>
        <coneGeometry args={[2.8, 2.5, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFA500"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Secondary Shikhara */}
      <mesh position={[0, 5.8, 0]} castShadow>
        <coneGeometry args={[1.8, 1.5, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Top Kalash - More ornate */}
      <mesh position={[0, 7, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={1} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Trident on top */}
      <mesh position={[0, 7.8, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={1} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Main Entrance - Grander */}
      <mesh position={[0, 0.8, 2.51]} castShadow>
        <boxGeometry args={[1.8, 2.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Entrance arch */}
      <mesh position={[0, 1.9, 2.52]} castShadow>
        <torusGeometry args={[0.9, 0.1, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFA500"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Decorative Elements - More ornate */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, 3.5, z]} castShadow>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial 
              color="#FFD700" 
              metalness={0.8} 
              roughness={0.2}
              emissive="#FFA500"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}

      {/* Padmavati Symbol on front */}
      <mesh position={[0, 2, 2.52]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Lotus petals around the symbol */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.7;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, 2 + y * 0.3, 2.53]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.3, 0.1, 0.02]} />
            <meshStandardMaterial 
              color="#FF69B4" 
              metalness={0.6} 
              roughness={0.3}
              emissive="#FF1493"
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Side decorative windows */}
      <mesh position={[-2.51, 1.5, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#2a1a1a" />
      </mesh>
      <mesh position={[2.51, 1.5, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color="#2a1a1a" />
      </mesh>
    </group>
  );
}
