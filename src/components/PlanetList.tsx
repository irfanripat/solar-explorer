'use client';

import { useStore } from '../store';
import { planetData } from '../data';
import Image from 'next/image';

export default function PlanetList() {
    const { selectedPlanet, setSelectedPlanet } = useStore();

    return (
        <div className="absolute top-1/2 -translate-y-1/2 left-6 z-40 flex flex-col gap-4">
            {planetData.map((planet) => (
                <button
                    key={planet.name}
                    onClick={() => setSelectedPlanet(planet)}
                    className={`group flex items-center gap-3 transition-all duration-300 ${selectedPlanet?.name === planet.name ? 'scale-110 ml-4' : 'hover:scale-105 hover:ml-2'
                        }`}
                >
                    <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${selectedPlanet?.name === planet.name ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]' : 'border-white/20 group-hover:border-white/50'
                        }`}>
                        {/* Using the texture as a preview image. 
                 Since textures are flat maps, they might look warped in a circle but it's consistent.
                 Alternatively we could use a solid color or Icon. Let's try image first. 
             */}
                        <img
                            src={planet.texture}
                            alt={planet.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className={`text-sm font-medium tracking-wide transition-colors ${selectedPlanet?.name === planet.name ? 'text-blue-300' : 'text-white/60 group-hover:text-white'
                        }`}>
                        {planet.name}
                    </span>
                </button>
            ))}
        </div>
    );
}
