import React from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
    const projects = [
        {
            id: "01",
            category: "DEEP LEARNING",
            title: <span className="text-white">DhavniSense</span>,
            subtitle: "Voice Authenticity Intelligence",
            description: "Detecting human vs AI-generated speech using a fine-tuned Wav2Vec2 pipeline.",
            highlights: ["~98% accuracy", "Wav2Vec2 fine-tuned", "5 languages", "17GB model", "Real-time API"],
            tags: [],
            visual: "bg-portfolio-brown text-portfolio-cream",
            width: "col-span-1 md:col-span-2",
            align: "text-center md:text-left",
            githubLink: "https://github.com/ananyaa241/DhvaniSense"
        },
        {
            id: "02",
            category: "AI × FINTECH",
            title: "Intelli-Credit",
            subtitle: "AI Credit Appraisal Engine",
            description: "Extracting financial intelligence from unstructured reports and identifying credit and regulatory risk.",
            highlights: ["70% less manual analysis", "~92% structuring accuracy", "XGBoost risk eval"],
            tags: [],
            visual: "bg-portfolio-cream text-portfolio-brown",
            width: "col-span-1",
            align: "text-left",
            githubLink: "https://github.com/ananyaa241/Intelli-Credit"
        },
        {
            id: "03",
            category: "AI × FULL STACK",
            title: "AI Resume Analyzer",
            subtitle: "Smarter Resume Analysis for Better Opportunities",
            description: "An intelligent resume platform for ATS scoring, job matching, grammar analysis, optimization and AI mock interviews.",
            tags: ["Groq API", "MongoDB", "JWT", "Chart.js"],
            visual: "bg-portfolio-lime text-portfolio-brown",
            width: "col-span-1",
            align: "text-left",
            projectLink: "https://resumeanalyzerq08.vercel.app/",
            githubLink: "https://github.com/ananyaa241/Resume_Analyzer"
        },
        {
            id: "04",
            category: "FULL STACK",
            title: "MediCare+",
            subtitle: "Hospital Management System",
            description: "A role-based healthcare platform with 3 portals, 15+ REST APIs and 10+ healthcare modules.",
            highlights: ["MongoDB", "Express.js", "React.js", "Node.js", "Role-Based Access Control", "JWT Authentication"],
            visual: "bg-white text-portfolio-black border-l-8 border-[#401F18]",
            width: "col-span-1 md:col-span-2",
            align: "text-left",
            projectLink: "https://atpgroupproject05.vercel.app/",
            githubLink: "https://github.com/ananyaa241/atp_group_project"
        },
        {
            id: "05",
            category: "COMPUTER VISION",
            title: "DINOv2 Off-Road",
            subtitle: "Vision-Based Off-Road Scene Segmentation",
            description: "Real-time semantic segmentation for autonomous navigation and Edge AI.",
            highlights: ["30+ FPS", "CPU inference", "18% improvement"],
            tags: [],
            visual: "bg-portfolio-lime text-portfolio-brown",
            width: "col-span-1",
            align: "text-left",
            githubLink: "https://github.com/ananyaa241/Offroad-Semantic-Segmentation-DINOv2"
        },
        {
            id: "06",
            category: "FINTECH × WEB",
            title: "Smart Expense Tracker",
            subtitle: "Interactive Financial Analytics Platform",
            description: "Turning everyday financial activity into actionable insights through real-time expense tracking, budgeting, savings goals, and personalized financial analytics.",
            highlights: ["6+ core modules", "15+ interactive UI components", "10+ financial analytics"],
            tags: [],
            visual: "bg-portfolio-cream text-portfolio-brown",
            width: "col-span-1",
            align: "text-left",
            projectLink: "https://ananyaa241.github.io/smart-expense-tracker/",
            githubLink: "https://github.com/ananyaa241/smart-expense-tracker"
        }
    ];

    return (
        <section id="work" className="py-16">
            <h2 className="font-display font-bold text-6xl md:text-8xl text-portfolio-brown leading-[0.85] uppercase tracking-tighter mb-12 text-center">
                THINGS<br />I'VE BUILT
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className={`${project.width} ${project.visual} border-[1.5px] border-portfolio-brown p-8 hover:-translate-y-2 hover:shadow-[12px_12px_0px_rgba(64,31,24,0.15)] transition-all duration-300 relative group overflow-hidden`}
                    >
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div className={project.align}>
                                <div className="flex items-center gap-4 mb-4 justify-between">
                                    <span className="font-display font-bold text-[10px] tracking-widest px-2 py-1 border border-current rounded-sm">
                                        {project.category}
                                    </span>
                                    <span className="font-display font-bold text-xl opacity-30">{project.id}</span>
                                </div>

                                <h3 className="font-display font-bold text-4xl mt-2 tracking-tight group-hover:scale-[1.02] transform transition-transform origin-left">
                                    {project.title}
                                </h3>
                                {project.subtitle && (
                                    <p className="font-serif italic text-lg mt-1 opacity-80">{project.subtitle}</p>
                                )}

                                <p className="mt-6 font-sans text-base leading-relaxed opacity-90 max-w-lg">
                                    {project.description}
                                </p>
                            </div>

                            <div className={`mt-8 ${project.align}`}>
                                {project.highlights && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.highlights.map((h, index) => (
                                            <span key={index} className="px-2 py-1 bg-portfolio-pink/20 border border-current text-xs font-bold font-sans">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {project.tags && project.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((t, index) => (
                                            <span key={index} className="text-xs font-medium font-sans border-b border-dashed border-current opacity-70">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-4">
                                    {project.projectLink && (
                                        <a
                                            href={project.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-display font-bold text-sm tracking-widest uppercase border-b-2 border-current pb-1 hover:opacity-70 transition-opacity whitespace-nowrap"
                                        >
                                            VIEW PROJECT
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-display font-bold text-sm tracking-widest uppercase border border-current px-3 py-1 hover:bg-current hover:text-portfolio-pink transition-colors whitespace-nowrap"
                                        >
                                            GITHUB
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Subtle decorative hover element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-0 group-hover:opacity-5 transition-opacity rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
