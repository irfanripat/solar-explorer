'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { Decal } from '@react-three/drei';

import { useStore } from '../store';

export default function Sun() {
    const meshRef = useRef<Mesh>(null);
    const { showSpecialSun } = useStore();

    // Try to load texture, but handle failure gracefully? 
    // R3F useLoader will suspend. We need error boundaries if texture fails, 
    // but our download script ensured files exist (even if placeholders).
    const texture = useLoader(TextureLoader, '/textures/sun.jpg');
    // Load special texture safely (Next.js public folder)
    const specialTexture = useLoader(TextureLoader, '/textures/fatimah.jpg');

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group>
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <sphereGeometry args={[16, 64, 64]} />
                {/* Normal Sun Material */}
                {!showSpecialSun && (
                    <meshStandardMaterial
                        map={texture}
                        emissiveMap={texture}
                        emissiveIntensity={0.6}
                        emissive="#ffcc00"
                        color="#ffffff"
                    />
                )}

                {/* Special Sun Mode: Solid Background + Double Decal */}
                {showSpecialSun && (
                    <>
                        {/* Background Color (User provided gray sample) */}
                        <meshBasicMaterial color="#d1d1d1" />

                        {/* Front Decal */}
                        <Decal position={[0, 0, 16]} rotation={[0, 0, 0]} scale={24}>
                            <meshBasicMaterial map={specialTexture} transparent polygonOffset polygonOffsetFactor={-1} />
                        </Decal>

                        {/* Back Decal */}
                        <Decal position={[0, 0, -16]} rotation={[0, Math.PI, 0]} scale={24}>
                            <meshBasicMaterial map={specialTexture} transparent polygonOffset polygonOffsetFactor={-1} />
                        </Decal>
                    </>
                )}
            </mesh>
            <pointLight intensity={2} decay={0} distance={300} color="#ffaa00" />
        </group>
    );
}
