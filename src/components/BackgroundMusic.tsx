'use client';

import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Sync state with actual audio events (Source of Truth)
    const handleOnPlay = () => setIsPlaying(true);
    const handleOnPause = () => setIsPlaying(false);

    useEffect(() => {
        // Force load on mount to ensure readiness
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, []);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (audio.paused) {
                // On iOS, we must call play() directly within the handler
                await audio.play();
            } else {
                audio.pause();
            }
        } catch (error) {
            console.error("Playback failed:", error);
            // If it failed, it might need a reload or it's a restriction
            // We could try: audio.load() then audio.play(), but let's stick to simple first
        }
    };

    return (
        <>
            {/* Hidden Audio Element */}
            {/* playsInline is critical for iOS to not force fullscreen */}
            <audio
                ref={audioRef}
                src="/music/interstellar.mp3"
                loop
                playsInline
                preload="auto"
                onPlay={handleOnPlay}
                onPause={handleOnPause}
            />

            {/* Mute/Unmute Control - Top Right (Below Scale/Back buttons) */}
            <div className="fixed top-24 right-4 z-[100] md:top-28 md:right-10 pointer-events-none">
                <button
                    onClick={togglePlay}
                    className="pointer-events-auto bg-black/40 backdrop-blur-md hover:bg-white/10 text-white/50 hover:text-white p-3 rounded-full transition-all border border-white/10 group active:scale-95 touch-manipulation shadow-lg"
                    aria-label={isPlaying ? "Mute Music" : "Play Music"}
                >
                    {isPlaying ? (
                        /* Volume Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-pulse">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                    ) : (
                        /* Mute Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
}
