'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';

export default function Sun() {
    const meshRef = useRef<Mesh>(null);

    // Try to load texture, but handle failure gracefully? 
    // R3F useLoader will suspend. We need error boundaries if texture fails, 
    // but our download script ensured files exist (even if placeholders).
    const texture = useLoader(TextureLoader, '/textures/sun.jpg');

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[16, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                emissiveMap={texture}
                emissiveIntensity={0.6}
                emissive="#ffcc00"
                color="#ffffff"
            />
            <pointLight intensity={2} decay={0} distance={300} color="#ffaa00" />
        </mesh>
    );
}
