import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="pt-32 pb-16 w-full flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="flex-1">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-display font-bold text-7xl md:text-9xl leading-[0.85] text-portfolio-brown uppercase tracking-tighter flex flex-col gap-4"
                >
                    <span>HI, I'M</span>
                    <span>SAI ANANYA.</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-8 max-w-sm"
                >
                    <div className="inline-block px-3 py-1 mb-4 border-[1.5px] border-portfolio-brown/50 rounded-full text-xs font-display font-medium tracking-widest text-portfolio-brown bg-portfolio-cream/50">
                        FULL-STACK DEVELOPER × AI/ML ENTHUSIAST
                    </div>
                    <p className="font-serif italic text-lg text-portfolio-brown/90 leading-snug">
                        Computer Science Engineering student building intelligent products, scalable web applications and creative digital experiences.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ delay: 0.2, duration: 1, type: "spring" }}
                className="relative flex-1 md:max-w-md w-full aspect-[3/4] bg-portfolio-cream border-2 border-portfolio-brown shadow-[8px_8px_0px_#401F18] p-4 flex flex-col"
            >
                {/* Placeholder for portrait -> can add an actual image later */}
                <div className="w-full flex-1 bg-portfolio-lime/20 border border-portfolio-brown/20 overflow-hidden relative group">
                    <motion.img
                        initial={{ filter: 'blur(20px)', opacity: 0 }}
                        animate={{ filter: 'blur(0px)', opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        src="/hero-portrait.jpg"
                        alt="Sai Ananya"
                        className="w-full h-full object-cover object-[center_82%]"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none mix-blend-overlay">
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-portfolio-brown font-display uppercase font-bold text-xs">
                    <span>VOL. 01</span>
                    <span>CREATIVE TECH</span>
                </div>

                {/* Scrapbook accent */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-portfolio-lime rounded-full border border-portfolio-brown flex items-center justify-center -rotate-12 shadow-sm z-10">
                    <span className="font-script text-portfolio-brown font-bold text-xl">hello!</span>
                </div>
            </motion.div>
        </section>
    );
}
