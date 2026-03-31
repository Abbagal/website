'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls, Sparkles } from '@react-three/drei';
import Safe3DWrapper from '../Safe3DWrapper';
import OmSymbol from './OmSymbol';
import Lotus from './Lotus';
import Diya from './Diya';
import Temple from './Temple';

function SceneAsset({ type }) {
  if (type === 'lotus') {
    return <Lotus scale={1.2} />;
  }

  if (type === 'diya') {
    return <Diya position={[0, -0.2, 0]} />;
  }

  if (type === 'temple') {
    return <Temple />;
  }

  return <OmSymbol />;
}

export default function SacredCardScene({ type = 'om' }) {
  return (
    <div className="h-48 w-full rounded-3xl overflow-hidden border border-white/10 bg-black/10">
      <Safe3DWrapper fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
          <div className="text-4xl">🕉️</div>
        </div>
      }>
        <Canvas camera={{ position: [0, 0, type === 'temple' ? 8 : 5], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffd27d" />
          <pointLight position={[-4, 2, 4]} intensity={1} color="#ff7b54" />
          <Environment preset="sunset" />
          <Sparkles count={20} size={2} scale={4} speed={0.3} color="#facc15" />
          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
            <SceneAsset type={type} />
          </Float>
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </Safe3DWrapper>
    </div>
  );
}
