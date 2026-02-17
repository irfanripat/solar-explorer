'use client';

import { useStore } from '../store';
import { useState, useEffect } from 'react';

export default function Overlay() {
    const { selectedPlanet, setSelectedPlanet, useRealScale, toggleRealScale } = useStore();

    const [isInfoOpen, setIsInfoOpen] = useState(false);

    // Reset info panel state when planet changes
    useEffect(() => {
        setIsInfoOpen(false);
    }, [selectedPlanet]);

    if (!selectedPlanet) {
        // Show Toggle Button when no planet is selected
        return (
            <div className="absolute top-4 right-4 z-50 md:top-10 md:right-10">
                <button
                    onClick={toggleRealScale}
                    className="bg-black/60 backdrop-blur-md border border-white/30 text-white px-4 py-2 text-xs md:px-6 md:py-3 md:text-base rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                    <span className={useRealScale ? "text-green-400" : "text-gray-400"}>●</span>
                    {useRealScale ? "Realistic Scale" : "Playable Scale"}
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Back Button - Always Visible */}
            <div className="absolute top-4 right-4 z-50 md:top-6 md:right-6">
                <button
                    onClick={() => setSelectedPlanet(null)}
                    className="flex items-center gap-2 bg-black/60 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/20 text-sm font-medium shadow-lg"
                >
                    <span>←</span> Back to Orbit
                </button>
            </div>

            {/* Info Toggle Button - Visible when closed */}
            {!isInfoOpen && (
                <div className="absolute bottom-36 right-4 z-50 md:bottom-10 md:right-10 animate-in fade-in zoom-in duration-300">
                    <button
                        onClick={() => setIsInfoOpen(true)}
                        className="bg-black/60 backdrop-blur-md hover:bg-white/20 text-white px-5 py-2.5 rounded-full transition-all border border-white/20 text-sm font-bold shadow-lg"
                        aria-label="Show Info"
                    >
                        <span>Info</span>
                    </button>
                </div>
            )}

            {/* Easter Egg Button - Floating (Sun Only) */}
            {(!isInfoOpen && selectedPlanet.name === 'Sun') && (
                <div className="absolute bottom-36 left-4 z-50 md:bottom-10 md:left-10 animate-in fade-in zoom-in duration-300 delay-100">
                    <button
                        onClick={useStore.getState().toggleSpecialSun}
                        className="bg-black/60 backdrop-blur-md border border-pink-500/50 text-pink-100 px-5 py-2.5 rounded-full shadow-lg transform active:scale-95 transition-all text-sm font-bold animate-pulse hover:bg-pink-500/20 hover:scale-105 hover:border-pink-500"
                    >
                        {useStore.getState().showSpecialSun ? "See original sun" : "Want to see another sun? 😉"}
                    </button>
                </div>
            )}

            {/* Info Panel - Collapsible */}
            {/* Info Panel - Collapsible */}
            {isInfoOpen && (
                <div className="fixed inset-x-0 bottom-0 top-auto z-50 w-full bg-black/90 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl text-white animate-in slide-in-from-bottom duration-500 shadow-2xl max-h-[70vh] flex flex-col
                    md:absolute md:top-10 md:right-10 md:bottom-auto md:w-96 md:bg-black/80 md:border md:border-white/20 md:rounded-2xl md:fade-in md:slide-in-from-right-10 md:border-t-0 md:rounded-t-2xl md:max-h-[85vh]
                ">
                    {/* Fixed Header */}
                    <div className="flex-shrink-0 p-6 border-b border-white/10 flex justify-between items-center bg-[#111] rounded-t-3xl md:rounded-t-2xl z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                {selectedPlanet.name}
                            </h2>
                            <p className="text-white/60 text-xs md:text-sm mt-1">{selectedPlanet.realDistance} from Sun</p>
                        </div>
                        <button
                            onClick={() => setIsInfoOpen(false)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all border border-white/20"
                            aria-label="Close Info"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-custom">



                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                            <InfoItem label="Type" value={selectedPlanet.type} />
                            <InfoItem label="Gravity" value={selectedPlanet.gravity} />
                            <InfoItem label="Year" value={selectedPlanet.yearDuration} />
                            <InfoItem label="Day" value={selectedPlanet.dayDuration} />
                            <InfoItem label="Temp" value={selectedPlanet.temperature} />
                            <InfoItem label="Moons" value={selectedPlanet.moons.toString()} />
                            <InfoItem label="Surface Area" value={selectedPlanet.surfaceArea} className="col-span-2" />
                            <InfoItem label="Composition" value={selectedPlanet.composition} className="col-span-2" />
                        </div>

                        {/* Satellites Section */}
                        {(selectedPlanet.notableMoons && selectedPlanet.notableMoons.length > 0) && (
                            <div className="mb-6">
                                <h3 className="text-white/40 text-xs uppercase tracking-wider font-bold mb-3">Notable Satellites (Natural)</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPlanet.notableMoons.map((moon) => (
                                        <span key={moon} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white border border-white/5">
                                            {moon}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Missions Section */}
                        {(selectedPlanet.artificialSatellites && selectedPlanet.artificialSatellites.length > 0) && (
                            <div className="mb-6">
                                <h3 className="text-white/40 text-xs uppercase tracking-wider font-bold mb-3">Artificial Satellites & Missions</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedPlanet.artificialSatellites.map((sat) => (
                                        <span key={sat.name} className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-xs font-medium text-blue-200 border border-blue-500/30">
                                            <span>{sat.name}</span>
                                            <span className="opacity-50 text-[10px] uppercase border-l border-blue-200/20 pl-2">{sat.type}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 pb-6 md:pb-0">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h3 className="text-sm font-semibold text-blue-300 mb-2">Description</h3>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    {selectedPlanet.description}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-orange-500/30">
                                <h3 className="text-sm font-semibold text-orange-300 mb-2">Did You Know?</h3>
                                <p className="text-white/90 text-sm italic">
                                    "{selectedPlanet.funFact}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function InfoItem({ label, value, className = '' }: { label: string, value: string, className?: string }) {
    return (
        <div className={`bg-white/5 p-3 rounded-xl border border-white/10 ${className}`}>
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-wider font-bold mb-1">{label}</p>
            <p className="text-white font-medium text-sm md:text-base">{value}</p>
        </div>
    );
}
