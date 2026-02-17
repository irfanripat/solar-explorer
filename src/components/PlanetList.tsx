'use client';

import { useStore } from '../store';
import { planetData } from '../data';
import Image from 'next/image';

export default function PlanetList() {
    const { selectedPlanet, setSelectedPlanet } = useStore();

    return (
        <div className="absolute z-40 flex gap-4 transition-all
            bottom-6 left-6 right-6 flex-row overscroll-x-auto overflow-y-visible overflow-x-auto justify-start p-2
            md:top-1/2 md:-translate-y-1/2 md:left-6 md:right-auto md:flex-col md:bottom-auto md:overflow-visible md:justify-center md:p-0
        ">
            {planetData.map((planet) => (
                <button
                    key={planet.name}
                    onClick={() => setSelectedPlanet(planet)}
                    className={`group flex items-center gap-3 transition-all duration-300 flex-shrink-0 
                        flex-col md:flex-row
                        ${selectedPlanet?.name === planet.name ? 'scale-110 ml-0 md:ml-4' : 'hover:scale-105 hover:ml-0 md:hover:ml-2'
                        }`}
                >
                    <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-colors ${selectedPlanet?.name === planet.name ? 'border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]' : 'border-white/20 group-hover:border-white/50'
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
                    <span className={`text-xs md:text-sm font-medium tracking-wide transition-colors ${selectedPlanet?.name === planet.name ? 'text-blue-300' : 'text-white/60 group-hover:text-white'
                        }`}>
                        {planet.name}
                    </span>
                </button>
            ))}
        </div>
    );
}
