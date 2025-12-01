'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ"];

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1);
        }, index == 0 ? 1000 : 150);
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

    const curve: Variants = {
        initial: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    }

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[99] flex items-center justify-center text-white cursor-none"
        >
            {dimension.width > 0 && (
                <>
                    <motion.p
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        className="flex text-5xl md:text-7xl font-bold items-center absolute z-10"
                    >
                        <span className="block w-3 h-3 bg-white rounded-full mr-3"></span>
                        {words[index]}
                    </motion.p>
                    <svg className="absolute top-0 w-full h-[calc(100%+600px)] pointer-events-none fill-[#141516]">
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    )
}

const slideUp: Variants = {
    initial: {
        y: 0
    },
    exit: {
        y: "-100vh",
        transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
}

const opacity: Variants = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: { duration: 1, delay: 0.2 }
    },
}
