"use client";

import { useState } from "react";
import { useTransition } from "@/context/TransitionContext";

const images = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
];

const ExpandOnHover = () => {
  const [expandedImage, setExpandedImage] = useState(3);
  const { startTransition } = useTransition();

  const getImageWidth = (index: number) =>
    index === expandedImage ? "35rem" : "6rem";

  const handleCardClick = () => {
    startTransition('/events');
  };

  return (
    <div className="w-full bg-black">
      <div className="relative grid grid-cols-1 items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black">
            <div className="relative w-full max-w-full px-5">
              <div className="flex w-full items-center justify-center gap-1">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out group"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "35rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                    onClick={handleCardClick}
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={src}
                      alt={`Event ${idx + 1}`}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
