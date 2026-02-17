'use client';

import React from 'react';
import Sun from './Sun';
import Planet from './Planet';
import { useStore } from '../store';
import { planetData } from '../data';

export default function SolarSystem() {
    const { selectedPlanet } = useStore();

    return (
        <group>
            {/* 
              When a planet is selected, we hide the Sun and other planets.
              But we need to ensure there is lighting for the selected planet.
              The Sun component provides the main pointLight.
            */}
            {/* 
              Render Sun if nothing selected OR Sun is selected. 
              The Sun component handles its own geometry and material.
            */}
            {(!selectedPlanet || selectedPlanet.name === 'Sun') && <Sun />}

            {/* 
               If Sun is hidden, we need a light source for the isolated planet.
               A directional light mimics the sun from a distance, or just a nice studio light.
             */}
            {selectedPlanet && selectedPlanet.name !== 'Sun' && (
                <>
                    {/* 
                       Base Ambient Light: Ensures nothing is pitch black.
                       Camera Headlight (in CameraController): Provides the main "studio" light from user's angle.
                       Rim Light: Added here for a bit of 3D depth from fixed angle
                    */}
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#aaaaff" />
                </>
            )}

            {planetData.map((data) => {
                // If a planet is selected, only render that planet
                if (selectedPlanet && selectedPlanet.name !== data.name) {
                    return null;
                }

                // Skip rendering Sun as a Planet component
                if (data.name === 'Sun') return null;

                return (
                    <Planet
                        key={data.name}
                        data={data}
                    />
                );
            })}
        </group>
    );
}
