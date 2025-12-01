'use client';

import { motion, Variants } from 'framer-motion';
import { useTransition } from '@/context/TransitionContext';

export default function StairsLoader() {
    const { isTransitioning } = useTransition();

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
            <div className="h-full w-full flex">
                {[...Array(5)].map((_, i) => (
                    <Stair key={i} i={i} isTransitioning={isTransitioning} />
                ))}
            </div>
        </div>
    );
}

const Stair = ({ i, isTransitioning }: { i: number; isTransitioning: boolean }) => {
    return (
        <motion.div
            variants={stairAnimation}
            initial="initial"
            animate={isTransitioning ? "exit" : "enter"}
            custom={5 - i}
            className="relative h-full w-full bg-[#141516]"
        />
    );
};

const stairAnimation: Variants = {
    initial: {
        top: "0%"
    },
    enter: (i: number) => ({
        top: "-100%",
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1 * i
        }
    }),
    exit: (i: number) => ({
        top: "0%",
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1 * i
        }
    })
};
