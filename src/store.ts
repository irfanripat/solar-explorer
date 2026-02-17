import { Mesh } from 'three';
import { create } from 'zustand';

export interface PlanetData {
    name: string;
    radius: number;
    distance: number;
    speed: number;
    texture: string;
    hasRing?: boolean;
    ringTexture?: string;
    // Educational Data
    yearDuration: string;
    dayDuration: string;
    temperature: string;
    moons: number;
    realDistance: string;
    description: string;
    funFact: string;

    // Detailed Data
    type: 'Star' | 'Planet' | 'Dwarf Planet' | 'Moon';
    gravity: string;
    surfaceArea: string;
    composition: string;

    // Visual Data
    color: string;
    distanceAU: number;
    relativeRadius: number;

    // Satellites & Missions
    notableMoons?: string[];
    artificialSatellites?: { name: string; type: string }[];
}

interface AppState {
    selectedPlanet: PlanetData | null;
    setSelectedPlanet: (planet: PlanetData | null) => void;

    // Store refs to 3D objects for camera Focus
    planetRefs: Record<string, Mesh>;
    addPlanetRef: (name: string, ref: Mesh) => void;
    removePlanetRef: (name: string) => void;

    // Scale Mode
    useRealScale: boolean;
    toggleRealScale: () => void;

    // Easter Egg
    showSpecialSun: boolean;
    toggleSpecialSun: () => void;
}

export const useStore = create<AppState>((set) => ({
    selectedPlanet: null,
    setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),

    planetRefs: {},
    addPlanetRef: (name, ref) => set((state) => ({ planetRefs: { ...state.planetRefs, [name]: ref } })),
    removePlanetRef: (name) => set((state) => {
        const newRefs = { ...state.planetRefs };
        delete newRefs[name];
        return { planetRefs: newRefs };
    }),
    useRealScale: false,
    toggleRealScale: () => set((state) => ({ useRealScale: !state.useRealScale })),

    showSpecialSun: false,
    toggleSpecialSun: () => set((state) => ({ showSpecialSun: !state.showSpecialSun })),
}));

