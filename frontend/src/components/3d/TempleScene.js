'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars, PerspectiveCamera, Text } from '@react-three/drei';
import { Suspense } from 'react';
import Temple from './Temple';
import Diya from './Diya';

export default function TempleScene() {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ powerPreference: "high-performance" }} dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={60} />
        
        {/* Enhanced Lighting for Padmavati Temple */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[15, 15, 8]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#FFF8DC"
        />
        <pointLight position={[0, 8, 0]} intensity={0.8} color="#FFD700" />
        <pointLight position={[-5, 5, 5]} intensity={0.6} color="#FF69B4" />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#FF69B4" />
        <spotLight
          position={[0, 12, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.7}
          castShadow
          color="#FFA500"
        />

        {/* Environment */}
        <Stars radius={150} depth={80} count={3000} factor={4} fade speed={0.3} />
        <Environment preset="dawn" />

        {/* 3D Models */}
        <Suspense fallback={null}>
          <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
            <Temple />
          </Float>

          {/* More Diyas around Padmavati temple */}
          <Diya position={[-4, 0, 3]} />
          <Diya position={[4, 0, 3]} />
          <Diya position={[-4, 0, -3]} />
          <Diya position={[4, 0, -3]} />
          <Diya position={[-2, 0, 4]} />
          <Diya position={[2, 0, 4]} />
          <Diya position={[0, 0, -4]} />
          <Diya position={[-6, 0, 0]} />
          <Diya position={[6, 0, 0]} />

          {/* Temple Name Text */}
          <Text
            position={[0, 8, 0]}
            fontSize={0.8}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            font="/fonts/hindi.woff"
          >
            🕉️ Padmavati Devi Temple 🕉️
          </Text>
        </Suspense>

        {/* Enhanced Ground with patterns */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial 
            color="#2a1a4a" 
            metalness={0.4} 
            roughness={0.7}
            emissive="#1a0a2a"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Decorative ground patterns */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
          <ringGeometry args={[8, 10, 32]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={0.8} 
            roughness={0.3}
            emissive="#FFA500"
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.54, 0]} receiveShadow>
          <ringGeometry args={[12, 14, 32]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            metalness={0.6} 
            roughness={0.4}
            emissive="#FF1493"
            emissiveIntensity={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
