import React from 'react';
import { motion } from 'framer-motion';

const hackathonImages = [
    "WhatsApp Image 2026-08-02 at 17.52.08.jpeg",
    "WhatsApp Image 2026-08-02 at 17.52.09.jpeg",
    "WhatsApp Image 2026-08-02 at 17.52.10.jpeg",
    "WhatsApp Image 2026-08-02 at 17.52.25.jpeg",
    "WhatsApp Image 2026-08-02 at 17.52.26.jpeg",
    "WhatsApp Image 2026-08-02 at 17.55.24.jpeg",
    "WhatsApp Image 2026-08-15 at 15.44.25.jpeg",
    "WhatsApp Image 2026-08-15 at 15.46.40.jpeg",
    "WhatsApp Image 2026-08-15 at 15.48.12.jpeg"
];

const rotations = [-6, 4, -4, 5, -5, 6, -3, 3, -7];
const offsets = [10, -20, 15, -10, 25, -15, 5, -25, 20];

export default function Hackathons() {
    return (
        <section className="py-24 w-full flex flex-col items-center relative overflow-hidden bg-portfolio-pink">

            <div className="w-full max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
                <h2 className="font-display font-bold text-5xl md:text-7xl text-portfolio-brown uppercase tracking-tighter">
                    LIFE IN<br />HACKATHONS
                </h2>
            </div>

            <div className="w-full max-w-7xl mx-auto bg-portfolio-cream border-2 border-portfolio-brown p-8 md:p-16 shadow-[12px_12px_0px_#401F18] rounded-xl relative z-10 flex flex-col items-center">

                {/* Decorative Elements */}
                <div className="absolute top-4 right-8 opacity-50 transform rotate-12 hidden md:block z-0">
                    <span className="font-script text-3xl text-portfolio-brown">sleepless nights!</span>
                </div>
                <div className="absolute top-0 right-10 w-8 h-4 bg-portfolio-lime/50 -rotate-12 border border-portfolio-brown/30 z-20"></div>
                <div className="absolute bottom-0 left-10 w-12 h-5 bg-portfolio-pink/60 rotate-6 border border-portfolio-brown/30 z-20"></div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-10 relative z-10 mt-8">
                    {[...hackathonImages, hackathonImages[0], hackathonImages[1], hackathonImages[2]].map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: (idx % 9) * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 50, transition: { duration: 0.2 } }}
                            className="relative group bg-white p-3 pb-8 md:p-4 md:pb-12 border-[1.5px] border-portfolio-brown shadow-[4px_4px_0px_rgba(64,31,24,0.15)] flex-shrink-0 transition-transform cursor-pointer"
                            style={{
                                transform: `rotate(${rotations[idx % rotations.length]}deg) translateY(${offsets[idx % offsets.length]}px)`,
                                zIndex: idx
                            }}
                        >
                            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 overflow-hidden border border-portfolio-brown/10 shadow-inner">
                                <img
                                    src={`/hackathons/${img}`}
                                    alt={`Hackathon Memory ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Scrapbook doodle */}
            <div className="absolute bottom-8 left-16 opacity-30 transform -rotate-12 hidden lg:block">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#401F18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
                </svg>
            </div>
        </section>
    );
}
