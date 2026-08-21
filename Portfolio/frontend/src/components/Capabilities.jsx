import React from 'react';
import { motion } from 'framer-motion';

export default function Capabilities() {
    const capabilities = [
        { num: "01", category: "BUILD", text: "Full-Stack Web Applications", shape: "rounded-tr-3xl" },
        { num: "02", category: "INTELLIGENT", text: "AI / ML Systems", shape: "rounded-tl-3xl" },
        { num: "03", category: "DESIGN", text: "Interactive Digital Experiences", shape: "rounded-bl-3xl rounded-tr-xl" },
        { num: "04", category: "SOLVE", text: "Automation & Real-World Problems", shape: "rounded-br-3xl text-right" }
    ];

    const tags = ["React.js", "Node.js", "Express.js", "MongoDB", "Python", "PyTorch", "FastAPI", "XGBoost", "Tailwind CSS"];

    return (
        <section className="bg-portfolio-lime w-full p-8 md:p-16 border-[1.5px] border-portfolio-brown shadow-[12px_12px_0px_#401F18] flex flex-col md:flex-row gap-12 text-portfolio-brown relative overflow-hidden">
            <div className="md:w-1/3 flex flex-col justify-between z-10">
                <h2 className="font-display font-bold text-6xl md:text-7xl uppercase leading-[0.85] tracking-tighter mix-blend-multiply flex flex-col gap-6">
                    <span>SKILLS &</span>
                    <span>EXPERTISE</span>
                </h2>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 z-10 relative">
                {capabilities.map((cap, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-portfolio-cream border-2 border-portfolio-brown p-6 flex flex-col justify-between min-h-[140px] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#FFC5E5] transition-all ${cap.shape}`}
                    >
                        <div className="flex justify-between items-start w-full">
                            <span className="font-display font-bold text-3xl text-portfolio-lime drop-shadow-[1px_1px_0px_#401F18]">{cap.num}</span>
                            <span className="font-display font-bold tracking-widest text-xs uppercase">{cap.category}</span>
                        </div>
                        <p className="font-sans font-medium text-lg mt-4 leading-tight">{cap.text}</p>
                    </motion.div>
                ))}
            </div>

            {/* Decorative large numbers in background */}
            <span className="absolute -bottom-10 -right-10 text-[20rem] font-display font-bold text-portfolio-brown/5 pointer-events-none select-none">!?</span>

            {/* Tech Tags Bottom Section */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t-[1.5px] border-portfolio-brown bg-portfolio-cream">
                <div className="flex w-max animate-marquee py-3">
                    {[...tags, ...tags, ...tags].map((tag, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 opacity-80 hover:opacity-100 transition-opacity">
                            <span className="font-display font-semibold tracking-widest uppercase text-sm whitespace-nowrap">{tag}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-portfolio-pink border border-portfolio-brown"></span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
