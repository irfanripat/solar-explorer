'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import SolarSystem from './SolarSystem';
import CameraController from './CameraController';

export default function Scene() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas camera={{ position: [0, 50, 90], fov: 45 }}>
                <Suspense fallback={null}>
                    <CameraController />
                    <color attach="background" args={['#000000']} />
                    <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    <ambientLight intensity={0.1} />
                    <SolarSystem />

                    <OrbitControls
                        makeDefault
                        enablePan={true}
                        enableZoom={true}
                        maxDistance={3000}
                        minDistance={1.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
