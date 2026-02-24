'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Environment, Sparkles } from '@react-three/drei';
import OmSymbol from './OmSymbol';
import Lotus from './Lotus';
import ParticleRing from './ParticleRing';

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF6B35" />
        <spotLight 
          position={[0, 10, 0]} 
          angle={0.3} 
          intensity={1}
          color="#FFA500"
          penumbra={1}
        />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={2000} factor={3} fade speed={0.5} />
        <Environment preset="sunset" />
        
        {/* Sparkles Effect - Reduced */}
        <Sparkles
          count={50}
          scale={10}
          size={2}
          speed={0.3}
          opacity={0.4}
          color="#FFD700"
        />
        
        {/* Main Om Symbol */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <OmSymbol />
        </Float>
        
        {/* Lotus Below */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <Lotus position={[0, -3, 0]} />
        </Float>

        {/* Particle Ring */}
        <ParticleRing />
        
        {/* Additional Floating Lotuses - Removed for performance */}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
