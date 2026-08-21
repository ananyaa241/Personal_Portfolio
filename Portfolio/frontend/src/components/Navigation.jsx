import React from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
    const navLinks = [
        { name: 'WORK', href: '#work' },
        { name: 'ABOUT', href: '#about' },
        { name: 'WINS', href: '#wins' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
        >
            <div className="flex items-center gap-8 px-6 py-2 bg-portfolio-cream border-[1.5px] border-portfolio-brown rounded-full shadow-sm">
                <a href="#" className="font-display font-bold text-portfolio-brown text-lg tracking-widest hover:text-portfolio-lime transition-colors">
                    SAI ANANYA
                </a>

                <div className="hidden md:flex items-center gap-6 border-l-[1.5px] border-portfolio-brown/30 pl-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-display font-semibold text-portfolio-brown tracking-widest hover:text-portfolio-pink transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-portfolio-brown transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
