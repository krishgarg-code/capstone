"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X, Music, Cpu, Laugh, Trophy, Users, Tent, Theater } from "lucide-react";
import { cn } from "@/lib/utils";

// ===== Types and Interfaces =====
export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
  icon: React.ReactNode;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

// ===== Custom Hooks =====
const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

// ===== Components =====
const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full mt-10">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
          )}
        />
        <div
          className={cn(
            "flex flex-row justify-start gap-4",
            "w-full",
          )}
        >
          {items.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={`card-${index}`}
                className="rounded-3xl"
              >
                {React.cloneElement(item, {
                  onCardClose: () => {
                    return handleCardClose(index);
                  },
                })}
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4 pr-4">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center disabled:opacity-50 hover:bg-black/80 dark:hover:bg-white/80 transition-colors duration-200"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-6 w-6 text-white dark:text-black" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center disabled:opacity-50 hover:bg-black/80 dark:hover:bg-white/80 transition-colors duration-200"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-6 w-6 text-white dark:text-black" />
        </button>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => { },
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => {
    return setIsExpanded(true);
  };
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      return window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen overflow-hidden z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-elegant-gray-dark h-full z-[60] p-4 md:p-10 rounded-3xl relative md:mt-10"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto rounded-full flex items-center justify-center bg-black dark:bg-white"
                onClick={handleCollapse}
              >
                <X className="h-6 w-6 text-white dark:text-black" />
              </button>
              <motion.p
                layoutId={layout ? `category-${testimonial.name}` : undefined}
                className="px-0 md:px-20 text-gray-600 dark:text-gray-300 text-lg font-thin"
              >
                {testimonial.designation}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${testimonial.name}` : undefined}
                className="px-0 md:px-20 text-2xl md:text-4xl font-normal italic text-gray-800 dark:text-white mt-4"
              >
                {testimonial.name}
              </motion.p>
              <div className="py-8 text-gray-700 dark:text-gray-300 px-0 md:px-20 text-3xl italic font-thin leading-snug tracking-wide">
                <Quote className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {testimonial.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        className=""
        whileHover={{
          rotateX: 2,
          rotateY: 2,
          rotate: 3,
          scale: 1.02,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        <div
          className={`${index % 2 === 0 ? "rotate-0" : "-rotate-0"} rounded-3xl bg-white/5 backdrop-blur-md h-[500px] md:h-[550px] w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-luxury-lg border border-white/10 hover:border-[#00963c] transition-colors duration-300`}
        >
          <div className="flex flex-col items-center justify-center p-8 h-full">
            <div className="bg-white/10 rounded-xl w-16 h-16 mb-6 flex items-center justify-center">
              {testimonial.icon}
            </div>
            <h3 className="text-2xl font-bold text-center text-white mb-2">
              {testimonial.name}
            </h3>
            <p className="text-lg text-center text-white/60 mb-6">
              {testimonial.designation}
            </p>
            <p className="text-white/80 text-center italic text-lg">
              "{testimonial.description}"
            </p>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export default function RetroTestimonial() {
  const testimonials: iTestimonial[] = [
    {
      name: "Music",
      designation: "",
      description: "Enjoy electrifying concerts and live performances that bring unforgettable energy and rhythm to your experience.",
      profileImage: "",
      icon: <Music className="w-8 h-8 text-white" />,
    },
    {
      name: "Tech",
      designation: "",
      description: "Explore innovative tech events and conferences where future-ready ideas and cutting-edge solutions take center stage.",
      profileImage: "",
      icon: <Cpu className="w-8 h-8 text-white" />,
    },
    {
      name: "Comedy",
      designation: "",
      description: "Laugh out loud with stand-up shows that deliver sharp humor, great vibes, and memorable entertainment.",
      profileImage: "",
      icon: <Laugh className="w-8 h-8 text-white" />,
    },
    {
      name: "Sports",
      designation: "",
      description: "Feel the adrenaline of live sports events packed with passion, competition, and unbeatable excitement.",
      profileImage: "",
      icon: <Trophy className="w-8 h-8 text-white" />,
    },
    {
      name: "Meetup",
      designation: "",
      description: "Connect with inspiring people, share ideas, and build meaningful networks that spark new opportunities.",
      profileImage: "",
      icon: <Users className="w-8 h-8 text-white" />,
    },
    {
      name: "Festival",
      designation: "",
      description: "Celebrate culture, art, and creativity through vibrant festivals full of color, music, and unforgettable moments.",
      profileImage: "",
      icon: <Tent className="w-8 h-8 text-white" />,
    },
    {
      name: "Theatre / Arts",
      designation: "",
      description: "Experience stunning performances and artistic showcases that inspire creativity and leave lasting impressions.",
      profileImage: "",
      icon: <Theater className="w-8 h-8 text-white" />,
    },
  ];

  const items = testimonials.map((testimonial, index) => (
    <TestimonialCard
      key={`testimonial-${index}`}
      testimonial={testimonial}
      index={index}
      layout={false}
      onCardClose={() => { }}
    />
  ));

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured Categories
        </h1>
      </div>
      <Carousel items={items} />
    </div>
  );
}