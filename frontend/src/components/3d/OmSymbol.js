'use client';

import { useRef } from 'react';
import { Center } from '@react-three/drei';
import * as THREE from 'three';

export default function OmSymbol() {
  const meshRef = useRef();
  const glowRef = useRef();

  // Remove useFrame hook to prevent Canvas errors
  // Static Om symbol without animation to avoid hook issues

  return (
    <Center>
      <group>
        {/* Main Om Symbol - Using Torus and Spheres to create Om shape */}
        <mesh ref={meshRef} castShadow>
          <torusGeometry args={[1.5, 0.3, 16, 100]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#F7B801"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Center dot */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFA500"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Top curve */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <torusGeometry args={[0.8, 0.2, 16, 100, Math.PI]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#F7B801"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glowRef} position={[0, 0, 0]}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial
            color="#FFA500"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Center>
  );
}
