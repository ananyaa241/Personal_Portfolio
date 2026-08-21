import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../api/data';

export default function SkillsTicker() {
    const items = [...portfolioData.skills, ...portfolioData.skills, ...portfolioData.skills];

    return (
        <div className="py-12 bg-slate-900 border-y border-slate-800/60 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,1)_0%,rgba(2,6,23,0)_20%,rgba(2,6,23,0)_80%,rgba(2,6,23,1)_100%)] z-10 pointer-events-none"></div>
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                    className="flex space-x-12 px-6"
                >
                    {items.map((skill, idx) => (
                        <div key={idx} className="flex items-center space-x-12">
                            <span className="text-3xl md:text-5xl font-jakarta font-bold text-slate-700 hover:text-cyan-400 transition-colors cursor-default tracking-tight">
                                {skill}
                            </span>
                            <span className="text-3xl text-indigo-500/50">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
