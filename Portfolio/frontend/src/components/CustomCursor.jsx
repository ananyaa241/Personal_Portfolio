import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.dataset.testid
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            width: 20,
            height: 20,
        },
        hover: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            width: 40,
            height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            mixBlendMode: 'difference'
        }
    };

    // Only show on desktop (no touch device)
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full bg-indigo-600 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            variants={variants}
            animate={isHovering ? 'hover' : 'default'}
            transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        />
    );
}
