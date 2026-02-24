'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import Temple from './Temple';
import Diya from './Diya';

export default function TempleScene() {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ powerPreference: "high-performance" }} dpr={[1, 1.5]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD700" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
          color="#FFA500"
        />

        {/* Environment */}
        <Stars radius={100} depth={50} count={2000} factor={3} fade speed={0.5} />
        <Environment preset="sunset" />

        {/* 3D Models */}
        <Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <Temple />
          </Float>

          {/* Diyas around temple */}
          <Diya position={[-3, 0, 2]} />
          <Diya position={[3, 0, 2]} />
          <Diya position={[-3, 0, -2]} />
          <Diya position={[3, 0, -2]} />
        </Suspense>

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#2a1a4a" metalness={0.3} roughness={0.8} />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
