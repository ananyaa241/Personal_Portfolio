import React from 'react';
import { motion } from 'framer-motion';

export default function Metrics() {
    const metrics = [
        { value: "9.68", label: "CGPA", color: "bg-portfolio-cream text-portfolio-brown" },
        { value: "98%", label: "Voice Detection Accuracy", color: "bg-portfolio-lime text-portfolio-brown" },
        { value: "30+", label: "FPS Edge AI", color: "bg-portfolio-brown text-portfolio-cream" },
        { value: "15+", label: "REST APIs", color: "bg-portfolio-pink border-2 border-portfolio-brown text-portfolio-brown" },
        { value: "20+", label: "React Components", color: "bg-portfolio-cream text-portfolio-brown" },
        { value: "70%", label: "Analysis Time Reduction", color: "bg-portfolio-lime text-portfolio-brown" }
    ];

    return (
        <section className="py-12 relative w-full">
            <h2 className="font-display font-bold text-5xl md:text-7xl text-portfolio-brown uppercase tracking-tighter mb-10 w-1/2 drop-shadow-[2px_2px_0px_white]">
                NUMBERS I'M<br />PROUD OF
            </h2>

            <div className="flex flex-wrap gap-4 overflow-visible pl-4 md:pl-0 mt-8">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                        className={`px-8 py-6 flex flex-col justify-center transform ${i % 2 === 0 ? '-rotate-1' : 'rotate-2'} ${metric.color} shadow-sm border border-portfolio-brown/20 flex-grow text-center min-w-[200px]`}
                    >
                        <span className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-none">{metric.value}</span>
                        <span className="font-sans font-semibold text-xs tracking-wider uppercase mt-4 opacity-80">{metric.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
