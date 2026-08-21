import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../api/data';

export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-[#020617] relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-slate-100 mb-12 tracking-tight">Experience.</h2>
                        </motion.div>

                        <div className="space-y-12">
                            {portfolioData.experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="relative pl-8 md:pl-10"
                                >
                                    {/* Glass Timeline line hidden on mobile, visible on desktop */}
                                    <div className="hidden md:block absolute left-[3px] top-3 bottom-[-32px] w-px bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
                                    <div className="hidden md:block absolute left-[-1px] top-2.5 w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]"></div>

                                    <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between">
                                        <h3 className="text-2xl font-jakarta font-bold text-slate-100">{exp.role}</h3>
                                        <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mt-2 md:mt-0">{exp.date}</span>
                                    </div>
                                    <p className="text-cyan-400 font-medium mb-6 uppercase tracking-wider text-sm flex items-center space-x-2">
                                        <span>{exp.company}</span>
                                    </p>

                                    <ul className="space-y-4">
                                        {exp.highlights.map((highlight, i) => (
                                            <li key={i} className="text-slate-400 font-medium flex items-start text-sm leading-relaxed">
                                                <span className="text-indigo-400 mr-3 mt-0.5 opacity-80">▹</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-jakarta font-bold text-slate-100 mb-8 mt-4 lg:mt-0 tracking-tight">Recognitions.</h2>
                        </motion.div>

                        <div className="space-y-6">
                            {portfolioData.recognition.map((rec, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-card p-6 group cursor-default"
                                >
                                    <h4 className="font-jakarta font-bold text-lg text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">{rec.title}</h4>
                                    <p className="text-slate-400 text-sm font-medium">{rec.subtitle}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
