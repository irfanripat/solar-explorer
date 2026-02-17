'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, PointLight } from 'three';
import { useStore } from '../store';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function CameraController() {
    const { camera, controls } = useThree();
    const { selectedPlanet, planetRefs } = useStore();

    // Animate camera when selection changes
    useEffect(() => {
        const ctrl = controls as any;
        if (!ctrl) return;

        // Add a "Headlight" to the camera so the planet is always well-lit from the viewer's angle
        const headlight = new PointLight(0xffffff, 1.5, 3000); // High intensity, long range
        camera.add(headlight);

        if (selectedPlanet && planetRefs[selectedPlanet.name]) {
            const planetMesh = planetRefs[selectedPlanet.name];
            const planetPos = new Vector3();
            planetMesh.getWorldPosition(planetPos);

            // Calculate target position (closer zoom)
            const viewDistance = selectedPlanet.radius * 3.0;

            // Maintain current angle but get closer
            // ctrl.target is likely defined if it's OrbitControls
            const currentDir = new Vector3().subVectors(camera.position, ctrl.target).normalize();
            // If we are resetting or too far, maybe enforce a nice angle?
            // Let's just zoom in from the current angle for smoothness,
            // OR enforce a "beauty shot" angle (e.g. from slightly above).
            // Let's stick to current angle to be less jarring, but ensure we aren't "under" it.
            if (currentDir.y < 0) currentDir.y = 0.2; // Ensure we aren't looking from below
            currentDir.normalize();

            const targetCamPos = new Vector3().copy(planetPos).add(currentDir.multiplyScalar(viewDistance));

            // Animate Controls Target
            gsap.to(ctrl.target, {
                x: planetPos.x,
                y: planetPos.y,
                z: planetPos.z,
                duration: 1.5,
                ease: "power3.out",
                onUpdate: () => ctrl.update()
            });

            // Animate Camera Position
            gsap.to(camera.position, {
                x: targetCamPos.x,
                y: targetCamPos.y,
                z: targetCamPos.z,
                duration: 1.5,
                ease: "power3.out"
            });

        } else {
            // Reset to default view (Solar System Overview)
            gsap.to(ctrl.target, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => ctrl.update()
            });

            gsap.to(camera.position, {
                x: 0,
                y: 50,
                z: 90,
                duration: 1.5,
                ease: "power3.inOut"
            });
        }

        // Cleanup function to remove light
        return () => {
            camera.remove(headlight);
        };
    }, [selectedPlanet, camera, controls, planetRefs]);

    return null;
}
