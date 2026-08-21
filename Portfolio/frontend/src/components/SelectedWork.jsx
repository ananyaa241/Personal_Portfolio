import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, X } from 'lucide-react';
import { portfolioData } from '../api/data';

export default function SelectedWork() {
    const [selectedProject, setSelectedProject] = useState(null);

    const colors = [
        'bg-themePink', 'bg-themeCream', 'bg-themeBrown text-themePink'
    ];
    const borderColors = [
        'border-themeBrown', 'border-themeBrown', 'border-themeOlive'
    ];

    return (
        <section id="work" className="py-24 relative bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-80 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-slate-100 mb-4 tracking-tight">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Work.</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-medium max-w-xl">Case studies of intelligent platforms and products I've engineered.</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.map((project, idx) => {
                        return (
                            <motion.div
                                key={project.id}
                                whileHover={{ y: -8, scale: 1.01 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                className={`glass-card p-8 cursor-pointer flex flex-col group relative overflow-hidden`}
                                data-testid={`project-card-${project.id}`}
                            >
                                {/* Card Glow hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-indigo-500/0 group-hover:from-cyan-500/10 group-hover:to-indigo-500/10 transition-colors duration-500 pointer-events-none"></div>

                                <div className={`text-xs font-semibold uppercase tracking-wider mb-6 text-cyan-400 flex items-center space-x-2`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block"></span>
                                    <span>{project.category}</span>
                                </div>

                                <h3 className={`text-2xl font-jakarta font-bold mb-3 text-slate-100`}>{project.title}</h3>
                                <p className={`text-sm text-slate-300 font-medium mb-8 flex-grow leading-relaxed`}>{project.impact}</p>

                                <div className={`flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-800/60`}>
                                    {project.techStack.slice(0, 3).map(tech => (
                                        <span key={tech} className={`text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-200 border border-cyan-900/30`}>
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50`}>
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
                    >
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>

                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-3xl glass-card p-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-700/80 overflow-hidden"
                            data-testid={`modal-${selectedProject.id}`}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full text-slate-300 z-10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className={`p-8 md:p-12 relative overflow-hidden bg-slate-900`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 z-0"></div>
                                <div className="relative z-10">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">{selectedProject.category}</div>
                                    <h3 className="text-3xl md:text-5xl font-jakarta font-bold text-slate-100 mb-6">{selectedProject.title}</h3>
                                    <div className="inline-flex px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold shadow-sm mb-2">
                                        Impact: {selectedProject.impact}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12 bg-slate-900/50">
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-10">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map(tech => (
                                            <span key={tech} className="text-sm font-medium bg-slate-800/60 border border-slate-700/80 px-3 py-1.5 rounded-md text-cyan-100">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-800/60">
                                    <a href={selectedProject.githubUrl} className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 rounded-lg transition-colors font-semibold group">
                                        <GitBranch size={18} className="group-hover:text-cyan-400 transition-colors" />
                                        <span>View Source</span>
                                    </a>
                                    <a href={selectedProject.demoUrl} className="flex items-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors font-semibold shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                        <ExternalLink size={18} />
                                        <span>Live Demo</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
