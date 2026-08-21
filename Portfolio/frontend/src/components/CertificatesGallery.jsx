import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function CertificatesGallery() {
    const [selectedCert, setSelectedCert] = useState(null);
    const images = [
        "/certificates/Programming In Java NPTEL Elite Certificate (2).jpg",
        "/certificates/Screenshot 2026-08-15 215927.png",
        "/certificates/Screenshot 2026-08-15 221801.png",
        "/certificates/WhatsApp Image 2026-08-15 at 15.48.13 (1).jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 15.48.13.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 15.49.56.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 15.49.57.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.47.33 (1).jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.47.33.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.47.34.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.54.17 (1).jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.54.17.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.54.18 (1).jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 21.54.18.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 22.13.41 (1).jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 22.13.41.jpeg",
        "/certificates/WhatsApp Image 2026-08-15 at 22.13.42.jpeg"
    ];

    return (
        <section className="py-16 relative w-full overflow-hidden bg-portfolio-pink mt-12">
            <div className="w-full max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
                <h2 className="font-display font-bold text-5xl md:text-7xl text-portfolio-brown uppercase tracking-tighter">
                    CERTIFICATES<br />& ACHIEVEMENTS
                </h2>
            </div>

            {/* Confined Box Scrapbook Canvas */}
            <div className="w-full max-w-7xl mx-auto border-2 border-portfolio-brown bg-portfolio-cream py-10 shadow-[12px_12px_0px_#401F18] rounded-xl relative z-10 flex overflow-hidden group">

                {/* Vintage tape corner accent left */}
                <div className="absolute top-0 left-10 w-8 h-4 bg-portfolio-lime/50 -rotate-12 border border-portfolio-brown/30 z-20"></div>
                {/* Vintage tape corner accent right */}
                <div className="absolute bottom-0 right-10 w-12 h-5 bg-portfolio-pink/60 rotate-6 border border-portfolio-brown/30 z-20"></div>

                {/* Marquee Wrapper */}
                <div className="flex items-center animate-marquee-slow gap-8 px-8 z-10 relative hover:[animation-play-state:paused] whitespace-nowrap">
                    {[...images, ...images].map((img, i) => (
                        <div key={i} className="flex-shrink-0 relative cursor-pointer" onClick={() => setSelectedCert(img)}>
                            {/* Certificate Frame - Scrapbook Photo style */}
                            <div className="p-2 border border-portfolio-brown shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-[4px_4px_0px_#C2D245] w-[260px] md:w-[320px] aspect-[4/3] flex flex-col bg-white overflow-hidden">
                                <div className="w-full h-full bg-portfolio-brown/5 overflow-hidden flex items-center justify-center">
                                    <img src={img} alt="Certificate" className="w-full h-full object-cover object-center" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-portfolio-black/80 backdrop-blur-sm cursor-pointer"
                            onClick={() => setSelectedCert(null)}
                        ></div>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative z-110 max-w-5xl w-full max-h-screen bg-portfolio-cream border-2 border-portfolio-brown shadow-[16px_16px_0px_#401F18] p-4 md:p-6 overflow-hidden flex flex-col items-center"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 p-2 bg-portfolio-pink hover:bg-portfolio-lime border border-portfolio-brown transition-colors z-20 group"
                            >
                                <X size={24} className="text-portfolio-brown group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Tape Accents */}
                            <div className="absolute top-0 right-1/2 w-16 h-6 bg-portfolio-lime/50 rotate-3 border border-portfolio-brown/30 z-20 -translate-y-2 translate-x-32"></div>

                            <img
                                src={selectedCert}
                                alt="Expanded Certificate"
                                className="w-full h-auto max-h-[80vh] object-contain border border-portfolio-brown bg-white p-2"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
