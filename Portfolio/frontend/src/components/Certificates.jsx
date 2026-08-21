import React from 'react';
import { motion } from 'framer-motion';

const certificateImages = [
    "Programming In Java NPTEL Elite Certificate (2).jpg",
    "Screenshot 2026-08-15 215927.png",
    "Screenshot 2026-08-15 221801.png",
    "WhatsApp Image 2026-08-15 at 15.48.13 (1).jpeg",
    "WhatsApp Image 2026-08-15 at 15.48.13.jpeg",
    "WhatsApp Image 2026-08-15 at 15.49.56.jpeg",
    "WhatsApp Image 2026-08-15 at 15.49.57.jpeg",
    "WhatsApp Image 2026-08-15 at 21.47.33 (1).jpeg",
    "WhatsApp Image 2026-08-15 at 21.47.33.jpeg",
    "WhatsApp Image 2026-08-15 at 21.47.34.jpeg",
    "WhatsApp Image 2026-08-15 at 21.54.17 (1).jpeg",
    "WhatsApp Image 2026-08-15 at 21.54.17.jpeg",
    "WhatsApp Image 2026-08-15 at 21.54.18 (1).jpeg",
    "WhatsApp Image 2026-08-15 at 21.54.18.jpeg",
    "WhatsApp Image 2026-08-15 at 22.13.41 (1).jpeg",
    "WhatsApp Image 2026-08-15 at 22.13.41.jpeg",
    "WhatsApp Image 2026-08-15 at 22.13.42.jpeg"
];

export default function Certificates() {
    const items = [...certificateImages, ...certificateImages, ...certificateImages];

    return (
        <section className="py-24 bg-[#020617] overflow-hidden relative border-y border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
                <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-widest uppercase mb-4">
                    WINS I'M PROUD OF
                </span>
                <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-slate-100 tracking-tight">
                    Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Certifications</span>
                </h2>
            </div>

            <div className="flex whitespace-nowrap overflow-hidden py-8">
                <motion.div
                    animate={{ x: ["0%", "-33.333%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 60
                    }}
                    className="flex space-x-12 px-6 items-center"
                >
                    {items.map((img, idx) => (
                        <div key={idx} className="flex-shrink-0 group">
                            {/* Neon Display Screen */}
                            <div className="relative p-2 rounded-2xl bg-slate-900 border border-slate-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:border-indigo-500/50 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500">

                                <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 relative z-10">
                                    <div className="relative overflow-hidden bg-white/5 rounded-lg flex items-center justify-center">
                                        <div className="absolute inset-0 bg-indigo-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen"></div>
                                        <img
                                            src={`/certificates/${img}`}
                                            alt={`Certificate`}
                                            className="h-56 sm:h-64 object-contain group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
