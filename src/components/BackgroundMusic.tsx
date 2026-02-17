'use client';

import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5); // Default volume 50%

    // Sync state with actual audio events (Source of Truth)
    const handleOnPlay = () => setIsPlaying(true);
    const handleOnPause = () => setIsPlaying(false);

    useEffect(() => {
        // Attempt to auto-play on mount
        const playAudio = async () => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
                try {
                    await audioRef.current.play();
                } catch (err) {
                    console.log("Autoplay blocked, waiting for user interaction");
                }
            }
        };

        playAudio();

        // One-time global interaction listener to unlock audio if blocked
        const handleInteraction = () => {
            // Only try to play if currently paused
            if (audioRef.current && audioRef.current.paused) {
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            // Success! Remove listeners now that audio is unlocked.
                            ['click', 'keydown', 'touchstart'].forEach(event =>
                                window.removeEventListener(event, handleInteraction)
                            );
                        })
                        .catch(e => {
                            console.log("Interaction play failed (probably not a user gesture yet):", e);
                            // Do NOT remove listeners yet, try again on next interaction
                        });
                }
            }
        };

        ['click', 'keydown', 'touchstart'].forEach(event =>
            window.addEventListener(event, handleInteraction, { passive: true })
        );

        return () => {
            ['click', 'keydown', 'touchstart'].forEach(event =>
                window.removeEventListener(event, handleInteraction)
            );
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
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
                onPlay={handleOnPlay}
                onPause={handleOnPause}
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
