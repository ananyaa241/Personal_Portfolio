import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../api/data';

export default function About() {
    const { about } = portfolioData;

    return (
        <section id="about" className="py-24 bg-slate-950 relative">
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-slate-100 mb-6 leading-tight tracking-tight">
                            {about.headline}
                        </h2>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
                            {about.description}
                        </p>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/60">
                            <div>
                                <div className="text-4xl font-jakarta font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 mb-2">{about.stats.cgpa}</div>
                                <div className="text-xs uppercase font-semibold tracking-widest text-slate-500">CGPA</div>
                            </div>
                            <div>
                                <div className="text-4xl font-jakarta font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">{about.stats.featuredBuilds}</div>
                                <div className="text-xs uppercase font-semibold tracking-widest text-slate-500">Builds</div>
                            </div>
                            <div>
                                <div className="text-4xl font-jakarta font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">{about.stats.hackathonRecognitions}</div>
                                <div className="text-xs uppercase font-semibold tracking-widest text-slate-500">Wins</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>

                            <h3 className="text-2xl font-jakarta font-bold text-slate-100 mb-8 flex items-center space-x-3">
                                <span className="w-8 h-px bg-cyan-500 block"></span>
                                <span>Academic Background</span>
                            </h3>
                            <div className="space-y-8 relative z-10">
                                {portfolioData.education.map((edu, idx) => (
                                    <div key={idx} className="relative pl-6 border-l border-slate-800/60">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                                        <h4 className="font-semibold text-slate-200 text-lg">{edu.institution}</h4>
                                        <p className="text-sm text-slate-400 my-1">{edu.degree}</p>
                                        <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-slate-800/40">
                                            <span className="font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">{edu.score}</span>
                                            <span className="font-medium text-slate-400 uppercase tracking-wider">{edu.location}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
