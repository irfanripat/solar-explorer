'use client';

import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5); // Default volume 50%

    useEffect(() => {
        // Attempt to auto-play on mount
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = volume;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay blocked, waiting for user interaction");
                    // Keep isPlaying as false internally for the icon, but ready to play
                }
            }
        };

        playAudio();

        // Add global click listener to start audio if it hasn't started yet
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => console.error("Play failed", e));
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src="/music/interstellar.mp3"
                loop
                preload="auto"
            />

            {/* Mute/Unmute Control - Top Right (Below Scale/Back buttons) */}
            <div className="fixed top-20 right-4 z-50 md:top-28 md:right-10">
                <button
                    onClick={togglePlay}
                    className="bg-black/40 backdrop-blur-md hover:bg-white/10 text-white/50 hover:text-white p-3 rounded-full transition-all border border-white/10 group"
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
