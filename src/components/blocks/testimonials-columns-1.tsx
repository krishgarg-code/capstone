"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Booking tickets has never been easier. The platform is fast, smooth, and incredibly convenient for attending live events.",
    image: "https://picsum.photos/200/200?grayscale&random=1",
    name: "Alex Johnson",
    role: "Concert Enthusiast"
  },
  {
    text: "This app completely transformed the way we plan and attend events. The experience was seamless from discovery to booking.",
    image: "https://picsum.photos/200/200?grayscale&random=2",
    name: "Sarah Williams",
    role: "Event Organizer"
  },
  {
    text: "Real-time ticket availability and smart filtering helped us find the right events instantly. Truly a game-changer.",
    image: "https://picsum.photos/200/200?grayscale&random=3",
    name: "Michael Chen",
    role: "Festival Planner"
  },
  {
    text: "Amazing user interface and reliable service. Managing and promoting events has never been this effortless.",
    image: "https://picsum.photos/200/200?grayscale&random=4",
    name: "Emily Rodriguez",
    role: "Show Coordinator"
  },
  {
    text: "We’ve seen incredible turnout and engagement since using the platform. The booking system is smooth and highly efficient.",
    image: "https://picsum.photos/200/200?grayscale&random=5",
    name: "David Thompson",
    role: "Sports Event Manager"
  }
];

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/10 bg-white/5 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 150, 60, 0.4), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <SpotlightCard key={i} className="max-w-md w-full backdrop-blur-md">
                  <div className="p-8">
                    <div className="text-white/80 text-base">{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                        <div className="leading-5 opacity-60 tracking-tight text-white/60">{role}</div>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export const TestimonialsColumns1 = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Client Testimonials
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
          Hear from those who have experienced our service firsthand
        </p>
      </div>
      <div className="flex justify-center items-center gap-6 flex-wrap md:flex-nowrap min-h-[800px]">
        <TestimonialsColumn testimonials={testimonials} className="h-[700px] overflow-hidden w-full md:w-auto md:max-w-md" duration={40} />
        <TestimonialsColumn testimonials={testimonials} className="h-[700px] overflow-hidden w-full md:w-auto md:max-w-md hidden md:block" duration={50} />
        <TestimonialsColumn testimonials={testimonials} className="h-[700px] overflow-hidden w-full md:w-auto md:max-w-md hidden lg:block" duration={35} />
      </div>
    </div>
  );
};

export default TestimonialsColumns1;