'use client';

import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = '#000000' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const autoScrollSpeedRef = useRef<number>(0.15); // Reduced speed for smoother effect
  const animationFrameRef = useRef<number>(0);
  const positionsRef = useRef<number[]>([0, 0, 0, 0]); // Track positions for each row

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const handleMouseEnter = (): void => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = (): void => {
      isHoveringRef.current = false;
    };

    const animateRows = (): void => {
      const windowWidth = window.innerWidth;

      rowRefs.current.forEach((row, index) => {
        if (row) {
          // Calculate direction (alternating rows move in opposite directions)
          const direction = index % 2 === 0 ? 1 : -1;

          // Get the width of the row content (half of the duplicated content)
          // We assume the row has 2 sets of items, so the seamless loop point is at half width
          const rowWidth = row.scrollWidth / 2;

          if (isHoveringRef.current) {
            // Manual control when hovering
            const mouseNormalized = mouseXRef.current / windowWidth;
            const manualSpeed = (mouseNormalized - 0.5) * 2; // Range from -1 to 1
            positionsRef.current[index] += manualSpeed * direction * 2;
          } else {
            // Automatic scrolling when not hovering
            positionsRef.current[index] += autoScrollSpeedRef.current * direction;
          }

          // Infinite scroll reset logic
          if (direction === 1) { // Moving Right
            // If we've moved past 0 (start), reset to -rowWidth
            if (positionsRef.current[index] >= 0) {
              positionsRef.current[index] = -rowWidth;
            }
            // If we've moved too far left (shouldn't happen with direction 1 but for safety)
            if (positionsRef.current[index] <= -rowWidth * 2) {
              positionsRef.current[index] = -rowWidth;
            }
          } else { // Moving Left
            // If we've moved past -rowWidth, reset to 0
            if (positionsRef.current[index] <= -rowWidth) {
              positionsRef.current[index] = 0;
            }
            // If we've moved too far right (shouldn't happen with direction -1)
            if (positionsRef.current[index] > 0) {
              positionsRef.current[index] = 0;
            }
          }

          // Apply the transformation
          gsap.set(row, {
            x: positionsRef.current[index],
          });
        }
      });

      animationFrameRef.current = requestAnimationFrame(animateRows);
    };

    // Initialize positions
    // Rows moving right (0, 2) should start at -rowWidth to scroll towards 0
    // Rows moving left (1, 3) should start at 0 to scroll towards -rowWidth
    // We'll let the loop handle the exact positioning, but setting initial values helps
    // Wait for a frame to ensure refs are populated and layout is done
    const initTimeout = setTimeout(() => {
      rowRefs.current.forEach((row, index) => {
        if (row) {
          const rowWidth = row.scrollWidth / 2;
          if (index % 2 === 0) {
            positionsRef.current[index] = -rowWidth;
          } else {
            positionsRef.current[index] = 0;
          }
        }
      });
      animationFrameRef.current = requestAnimationFrame(animateRows);
    }, 100);

    // Add event listeners
    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('mouseenter', handleMouseEnter);
      gridElement.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      // Clean up
      clearTimeout(initTimeout);
      cancelAnimationFrame(animationFrameRef.current);
      if (gridElement) {
        gridElement.removeEventListener('mouseenter', handleMouseEnter);
        gridElement.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="gap-6 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-nowrap gap-6" // Changed to flex for seamless scrolling
              style={{ willChange: 'transform' }}
              ref={el => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
            >
              {/* Render items twice for seamless loop */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={`set-${setIndex}`} className="flex flex-nowrap gap-6">
                  {Array.from({ length: 7 }, (_, itemIndex) => {
                    const content = combinedItems[rowIndex * 7 + itemIndex];
                    return (
                      <div key={`${setIndex}-${itemIndex}`} className="relative w-[280px] aspect-square flex-shrink-0">
                        <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#0a0a0a] dark:bg-[#000000] flex items-center justify-center text-white text-[1.5rem] border border-gray-800 dark:border-gray-900 shadow-luxury-lg">
                          {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/')) ? (
                            <img
                              src={content}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="p-4 text-center z-[1] font-medium tracking-tight">{content}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;