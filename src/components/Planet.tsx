'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { Html } from '@react-three/drei';
import { useStore, PlanetData } from '../store'; // Ensure PlanetData is exported from store

interface PlanetProps {
    data: PlanetData;
    rotationSpeed?: number;
}

export default function Planet({ data, rotationSpeed = 0.01 }: PlanetProps) {
    // Data properties
    const { name, texture: texturePath, radius: defaultRadius, distance: defaultDistance, speed, hasRing, ringTexture: ringTexturePath } = data;
    // Extended data properties (cast as any safely or update interface if I could)
    const { distanceAU = 1, relativeRadius = 1 } = data as any;

    const { selectedPlanet, setSelectedPlanet, addPlanetRef, removePlanetRef, useRealScale } = useStore();

    // Calculate actual render values based on mode
    // Playable Mode: Use hand-tuned 'radius' and 'distance'
    // Realistic Mode: 
    //   Distance: 1 AU = 50 units (Earth @ 50, Neptune @ 1500)
    //   Radius:   1 Earth Radius = 0.5 units (Earth @ 0.5, Jupiter @ 5.5) - slightly scaled down relative to distance to be visible
    const AU_SCALE = 50;
    const RADIUS_SCALE = 0.5;

    const targetDistance = useRealScale ? distanceAU * AU_SCALE : defaultDistance;
    const targetRadius = useRealScale ? relativeRadius * RADIUS_SCALE : defaultRadius;

    // We can use springs or lerping, but for simplicity let's rely on useFrame to interpolate visual values if we wanted smooth transition.
    // simpler: Just use them directly. React Three Fiber handles prop updates.
    // Actually, converting to refs for smooth transition using GSAP or lerp would be nicer, but let's stick to direct updates first.

    // HOWEVER, the orbit animation depends on distance.
    // And standard material Scale needs to update.

    const meshRef = useRef<Mesh>(null);
    const orbitRef = useRef<Mesh>(null);


    // Texture loading
    const texture = useLoader(TextureLoader, texturePath) as any;
    const ringTexture = ringTexturePath ? useLoader(TextureLoader, ringTexturePath) as any : null;

    // Register ref
    useEffect(() => {
        if (meshRef.current) addPlanetRef(name, meshRef.current);
        return () => removePlanetRef(name);
    }, [name, addPlanetRef, removePlanetRef]);

    // Random start angle
    const [angle] = useState(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        const isSelected = selectedPlanet?.name === name;

        if (orbitRef.current && !isSelected) {
            // Orbital movement - Pause if selected
            orbitRef.current.rotation.y += speed * delta;
        }
        if (meshRef.current) {
            // Self rotation - Always rotate
            meshRef.current.rotation.y += rotationSpeed;
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        setSelectedPlanet(data);
    };

    return (
        <group>
            {/* Orbital Path (Visual Only) - Hide when any planet is selected */}
            {!selectedPlanet && (
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[targetDistance - 0.05, targetDistance + 0.05, 128]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.5} transparent side={2} />
                </mesh>
            )}

            {/* Orbit Pivot Group - Rotates to move planet */}
            <group ref={orbitRef} rotation={[0, angle, 0]}>
                <group position={[targetDistance, 0, 0]}>
                    {/* The Planet Mesh */}
                    <mesh
                        ref={meshRef}

                        onClick={handleClick}
                        scale={[1, 1, 1]} // We adjust geometry args instead of scale for simplicity with ring
                    >
                        <sphereGeometry args={[targetRadius, 64, 64]} />
                        <meshStandardMaterial map={texture} />

                        {/* Textured Ring for Saturn */}
                        {hasRing && (
                            <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                                <ringGeometry args={[targetRadius * 1.4, targetRadius * 2.5, 64]} />
                                <meshStandardMaterial
                                    map={ringTexture}
                                    color={ringTexture ? "#ffffff" : "#bfaea2"}
                                    opacity={0.8}
                                    transparent
                                    side={2}
                                />
                            </mesh>
                        )}
                    </mesh>


                </group>
            </group>
        </group>
    );
}
