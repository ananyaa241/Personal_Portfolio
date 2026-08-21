import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEggVideo() {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let intervalId;
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                // Trigger the animation
                setIsVisible(true);

                // Continuous loop: 3s visible, 2s hidden (total 5s)
                intervalId = setInterval(() => {
                    setIsVisible(false);
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 2000);
                }, 5000);
            } else {
                setIsVisible(false);
                clearInterval(intervalId);
            }
        }, { threshold: 0.1 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            clearInterval(intervalId);
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute bottom-0 right-2 md:right-8 w-64 h-64 pointer-events-none z-50 flex items-end" style={{ clipPath: 'polygon(-100% -100%, 200% -100%, 200% 100%, -100% 100%)' }}>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className="relative w-full h-[150%] flex justify-center items-end"
                        initial={{ y: "100%" }}
                        animate={{ y: "30%" }}
                        exit={{ y: "100%", transition: { duration: 0.5, ease: "easeInOut" } }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.6
                        }}
                    >
                        {/* Character Image */}
                        <img
                            src="/easter-egg-character.png"
                            alt="Developer Character"
                            className="w-auto h-full object-cover object-top"
                            style={{
                                imageRendering: 'pixelated'
                            }}
                        />

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
