'use client';

import { useStore } from '../store';

export default function Overlay() {
    const { selectedPlanet, setSelectedPlanet, useRealScale, toggleRealScale } = useStore();

    if (!selectedPlanet) {
        // Show Toggle Button when no planet is selected
        return (
            <div className="absolute top-10 right-10 z-50">
                <button
                    onClick={toggleRealScale}
                    className="bg-black/60 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                    <span className={useRealScale ? "text-green-400" : "text-gray-400"}>●</span>
                    {useRealScale ? "Realistic Scale" : "Playable Scale"}
                </button>
            </div>
        );
    }

    return (
        <div className="absolute top-10 right-10 w-96 bg-black/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white z-50 animate-in fade-in slide-in-from-right-10 duration-500 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {selectedPlanet.name}
                </h2>
                <button
                    onClick={() => setSelectedPlanet(null)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all border border-white/20 text-sm font-medium"
                >
                    <span>←</span> Back to Orbit
                </button>
            </div>
            <p className="text-white/60 text-sm mt-1 mb-6">{selectedPlanet.realDistance} from Sun</p>


            <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoItem label="Year" value={selectedPlanet.yearDuration} />
                <InfoItem label="Day" value={selectedPlanet.dayDuration} />
                <InfoItem label="Temp" value={selectedPlanet.temperature} />
                <InfoItem label="Moons" value={selectedPlanet.moons.toString()} />
            </div>

            <div className="space-y-4">
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
    );
}

function InfoItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{label}</div>
            <div className="font-mono text-lg font-medium">{value}</div>
        </div>
    );
}
