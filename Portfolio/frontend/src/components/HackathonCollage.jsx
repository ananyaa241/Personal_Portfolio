import React from 'react';
import { motion } from 'framer-motion';

export default function HackathonCollage() {
    const pictures = [
        { src: "/hackathons/hackathon-new-1.jpg", rotate: "-rotate-6", imgClass: "object-cover scale-90" },
        { src: "/hackathons/WhatsApp Image 2026-08-15 at 15.44.25.jpeg", rotate: "rotate-3" },
        { src: "/hackathons/WhatsApp Image 2026-08-02 at 17.52.10.jpeg", rotate: "-rotate-2" },
        { src: "/hackathons/WhatsApp Image 2026-08-15 at 15.46.40.jpeg", rotate: "rotate-6" },
        { src: "/hackathons/WhatsApp Image 2026-08-02 at 17.52.09.jpeg", rotate: "-rotate-4" },
        { src: "/hackathons/WhatsApp Image 2026-08-02 at 17.52.25.jpeg", rotate: "rotate-2" },
        { src: "/hackathons/WhatsApp Image 2026-08-02 at 17.55.24.jpeg", rotate: "-rotate-3" },
        { src: "/hackathons/WhatsApp Image 2026-08-15 at 15.48.12.jpeg", rotate: "rotate-5" }
    ];

    return (
        <section className="py-16 w-full flex flex-col items-center relative overflow-hidden bg-portfolio-pink">

            {/* Boxed Scrapbook Container */}
            <div className="w-full max-w-7xl mx-auto bg-portfolio-cream border-2 border-portfolio-brown p-8 md:p-16 shadow-[12px_12px_0px_#401F18] rounded-xl flex flex-col md:flex-row gap-12 text-center md:text-left items-center justify-between relative z-10">

                <div className="md:w-1/3">
                    <h2 className="font-display font-bold text-5xl md:text-6xl text-portfolio-brown uppercase tracking-tighter mix-blend-multiply">
                        LIFE IN<br />HACKATHONS
                    </h2>
                    <p className="mt-4 font-sans font-medium text-lg text-portfolio-brown/80 max-w-sm mx-auto md:mx-0">
                        Building solutions in 24 hours, collaborating with teams, and turning ideas into reality.
                    </p>
                </div>

                <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end gap-3 md:gap-6 relative">
                    {pictures.map((pic, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ scale: 1.1, zIndex: 30, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.1 }}
                            className={`w-28 h-28 md:w-40 md:h-40 border-[6px] border-white shadow-[6px_6px_0px_rgba(64,31,24,0.15)] bg-white cursor-pointer transform ${pic.rotate} z-10 relative overflow-hidden flex-shrink-0 group`}
                        >
                            {/* Actual image - True Color */}
                            <div className="w-full h-full flex items-center justify-center overflow-hidden bg-portfolio-brown/5">
                                <img
                                    src={pic.src}
                                    alt="Hackathon Memory"
                                    className={`w-full h-full transition-transform duration-300 ${pic.imgClass || 'object-cover group-hover:scale-105'}`}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Tape accent */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-portfolio-lime/60 border border-portfolio-brown/20 rotate-3 z-20"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
