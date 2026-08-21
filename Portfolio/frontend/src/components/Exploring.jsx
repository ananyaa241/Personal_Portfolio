import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const exploringImages = [
    '/exploring-new1.png',
    '/exploring-new2.png',
    '/exploring-0.png',
    '/exploring-1.png',
    '/exploring-2.png',
    '/exploring-3.png',
    '/exploring-4.png',
];

export default function Exploring() {
    const topics = [
        "AI Engineering",
        "Full-Stack Product Development",
        "Computer Vision",
        "Backend Architecture",
        "Machine Learning",
        "API Designing",
        "Scalable Real-World Applications",
        "Competitive Programming",
        "Creative Digital Experiences"
    ];

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.4, once: false });

    // animationPhase: 'hidden' | 'dropping' | 'idle' | 'hovered'
    const [animationPhase, setAnimationPhase] = useState('hidden');

    useEffect(() => {
        if (isInView) {
            setAnimationPhase('dropping');
            // Transition to idle after dropping sequence completes. 
            // 7 cards * 0.5s delay + 0.8s drop wait = ~4.3s total
            const timer = setTimeout(() => {
                setAnimationPhase(prev => (prev === 'dropping' ? 'idle' : prev));
            }, 4300);
            return () => clearTimeout(timer);
        } else {
            setAnimationPhase('hidden');
        }
    }, [isInView]);

    const handleMouseEnter = () => {
        if (animationPhase === 'idle' || animationPhase === 'dropping') {
            setAnimationPhase('hovered');
        }
    };

    const handleMouseLeave = () => {
        if (animationPhase === 'hovered') {
            setAnimationPhase('idle');
        }
    };

    return (
        <section
            ref={containerRef}
            className="py-16 md:py-24 bg-[#fcfcef] border-[1.5px] border-[#401F18] p-8 md:p-12 relative overflow-hidden shadow-[8px_8px_0px_#401F18]"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-12 md:gap-8 max-w-7xl mx-auto">
                <div className="md:w-3/5 w-full">
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-[#401F18] uppercase tracking-tighter mb-8 -mt-4 text-center md:text-left z-10 relative">
                        CURRENTLY<br />EXPLORING
                    </h2>

                    <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start relative z-10">
                        {topics.map((topic, i) => {
                            const rotation = (i % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 1);
                            const bgColor = i % 2 === 0 ? "bg-portfolio-pink" : "bg-portfolio-lime";
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1, rotate: 0 }}
                                    initial={{ rotate: rotation }}
                                    className={`${bgColor} border border-[#401F18] px-4 py-2 rounded-full cursor-pointer shadow-sm shadow-[#401F18]/20`}
                                    style={{ transform: `rotate(${rotation}deg)` }}
                                >
                                    <span className="font-sans font-semibold text-[#401F18] text-sm md:text-base">
                                        {topic}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div
                    className="md:w-2/5 w-full flex justify-center items-center mt-12 md:mt-0 h-[300px] md:h-[350px] relative z-20"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative w-48 h-64 md:w-56 md:h-72 cursor-pointer">
                        {exploringImages.map((src, i) => {
                            const isTopCard = i === 0;
                            const reversedIndex = exploringImages.length - 1 - i;

                            const baseRotation = [-4, 3, -2, 5, -3, 4, -1][i % 7];
                            const baseX = [0, 6, -4, 8, -6, 4, -2][i % 7];
                            const baseY = [0, 4, 8, 12, 16, 20, 24][i % 7];

                            const hoveredRotation = (i - 3) * 10;
                            const hoveredX = (i - 3) * 30;
                            const hoveredY = isTopCard ? -15 : i * 4;

                            const cardVariants = {
                                hidden: {
                                    y: -300 - (reversedIndex * 20), // Fall from above
                                    x: 0,
                                    opacity: 0,
                                    scale: 1.3,
                                    rotate: 0,
                                    boxShadow: "0px 0px 0px rgba(64, 31, 24, 0)"
                                },
                                dropping: {
                                    y: baseY,
                                    x: baseX,
                                    opacity: 1,
                                    scale: 1,
                                    rotate: baseRotation,
                                    boxShadow: "0px 4px 10px rgba(64, 31, 24, 0.1)",
                                    transition: {
                                        delay: reversedIndex * 0.5, // Bottom card falls first
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                    }
                                },
                                idle: {
                                    opacity: 1,
                                    y: baseY,
                                    x: baseX,
                                    rotate: baseRotation,
                                    scale: 1,
                                    boxShadow: "0px 4px 10px rgba(64, 31, 24, 0.1)",
                                    transition: { duration: 0.5 }
                                },
                                hovered: {
                                    opacity: 1,
                                    y: hoveredY,
                                    x: hoveredX,
                                    rotate: hoveredRotation,
                                    scale: isTopCard ? 1.05 : 1,
                                    boxShadow: isTopCard ? "0px 15px 25px rgba(64, 31, 24, 0.15)" : "0px 8px 15px rgba(64, 31, 24, 0.1)",
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }
                                }
                            };

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 bg-white border border-[#401F18] p-2 rounded-sm shadow-md"
                                    style={{
                                        zIndex: reversedIndex,
                                        transformOrigin: "bottom center"
                                    }}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={animationPhase}
                                >
                                    <div className="w-full h-full relative overflow-hidden bg-[#faf8f5] rounded-sm">
                                        <img
                                            src={src}
                                            alt={`Exploring card ${i}`}
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
