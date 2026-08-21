import React from 'react';
import { motion } from 'framer-motion';

export default function Journey() {
    const steps = [
        {
            year: "2024",
            title: (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span>CSE @ Anurag University</span>
                    <span className="font-display font-bold text-xs bg-portfolio-lime/30 px-2 py-0.5 rounded-sm shadow-[1px_1px_0px_#401F18] border border-portfolio-brown -rotate-1">CGPA 9.68</span>
                </div>
            ),
            label: "START"
        },
        { year: "2025", title: "UI/UX + Computer Vision + AI experimentation" },
        { year: "2026", title: "Full-Stack Development + AI Engineering + API Designing" },
        { year: "NOW", title: "Building intelligent digital products", label: "CURRENT" }
    ];

    return (
        <section id="about" className="py-16 w-full flex flex-col md:flex-row gap-12 items-start bg-portfolio-cream border-2 border-portfolio-brown p-8 md:p-12 shadow-[8px_8px_0px_#401F18] relative">
            <div className="md:w-1/3">
                <h2 className="font-display font-bold text-5xl md:text-6xl text-portfolio-brown leading-none uppercase tracking-tighter">
                    MY JOURNEY <br />
                    INTO TECH
                </h2>

                <div className="mt-8 ml-4 md:ml-8 flex flex-col items-center justify-center w-80 h-64 border-[1.5px] border-portfolio-pink bg-[#FFF8E8] shadow-[3px_3px_0px_rgba(23,19,19,0.1)] rounded-md rotate-2 relative overflow-hidden group">
                    <img
                        src="/journey-photo.jpg"
                        alt="Working on laptops"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="md:w-2/3 w-full flex flex-col gap-6 relative">
                <div className="absolute left-[14px] top-4 bottom-4 w-px bg-portfolio-brown border-l-2 border-dashed border-portfolio-brown hidden md:block"></div>
                {steps.map((step, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        key={index}
                        className="flex gap-6 items-start relative z-10"
                    >
                        <div className="w-8 h-8 rounded-full border-2 border-portfolio-brown bg-portfolio-pink flex-shrink-0 mt-1"></div>
                        <div className="bg-white border-[1.5px] border-portfolio-brown p-4 w-full md:w-3/4 shadow-sm hover:shadow-md transition-shadow relative group">
                            <span className="font-display text-portfolio-lime font-bold text-2xl drop-shadow-[1px_1px_0px_#401F18]">{step.year}</span>
                            <div className="font-sans text-portfolio-brown/80 mt-1 font-medium">{step.title}</div>
                            {step.label && (
                                <div className="absolute -top-3 -right-3 px-2 py-1 bg-portfolio-brown text-portfolio-cream text-[10px] font-display font-bold tracking-widest rounded-sm rotate-3">
                                    {step.label}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Decorative arrow/annotation */}
            <div className="absolute bottom-4 right-8 opacity-50 transform -rotate-12 hidden md:block">
                <span className="font-script text-2xl text-portfolio-brown">keep going</span>
            </div>
        </section>
    );
}
