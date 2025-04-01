import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface CursorParticlesProps {
  screenWidth?: number;
  hasError?: boolean;
}

interface Sparkle {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  opacity: number;
  rotate: number;
}

const CursorParticles: React.FC<CursorParticlesProps> = ({
  screenWidth = window.innerWidth,
  hasError = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const coords = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const lastUpdate = useRef(0);
  const debounceTimeout = 16;
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const isAnimating = useRef(false);

  useEffect(() => {
    if (hasError || !containerRef.current) {
      document.body.style.cursor = "auto";
      return;
    }

    const numCircles = screenWidth > 1024 ? 40 : screenWidth > 640 ? 25 : 15;
    const circles: HTMLDivElement[] = [];

    for (let i = 0; i < numCircles; i++) {
      const circle = document.createElement("div");
      circle.className = "cursor-circle";
      Object.assign(circle.style, {
        position: "absolute",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 50%, rgba(139,0,0,1) 100%)",
        boxShadow: "0px 0px 8px rgba(255, 165, 0, 0.8)",
        pointerEvents: "none",
        left: "0px",
        top: "0px",
        transition: "all 0.23s ease-out",
        border: "none",
        opacity: "60%",
      });

      containerRef.current.appendChild(circle);
      circles.push(circle);
    }

    circlesRef.current = circles;
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdate.current >= debounceTimeout) {
        coords.current = { x: e.clientX, y: e.clientY };
        lastUpdate.current = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (isAnimating.current) return;

      setClickPosition({ x: e.clientX, y: e.clientY });
      isAnimating.current = true;

      const newSparkles: Sparkle[] = Array(12)
        .fill(null)
        .map((_, i) => ({
          id: `${i}-${Date.now()}`,
          startX: 0,
          startY: 0,
          endX: Math.cos((i / 12) * Math.PI * 2) * (40 + Math.random() * 30),
          endY: Math.sin((i / 12) * Math.PI * 2) * (40 + Math.random() * 30),
          size: Math.random() * 6 + 4,
          opacity: 1,
          rotate: Math.random() * 360,
        }));

      setSparkles(newSparkles);
      setTimeout(() => {
        setSparkles([]);
        isAnimating.current = false;
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        Object.assign(circle.style, {
          width: "24px",
          height: "24px",
          left: `${x - 12}px`,
          top: `${y - 12}px`,
          zIndex: "50",
          transform: `scale(${
            (circlesRef.current.length - index) / circlesRef.current.length
          })`,
        });

        const nextCircle =
          circlesRef.current[index + 1] || circlesRef.current[0];
        if (nextCircle) {
          x += (parseFloat(nextCircle.style.left || "0") + 12 - x) * 0.3;
          y += (parseFloat(nextCircle.style.top || "0") + 12 - y) * 0.3;
        }
      });

      animationFrameId.current = requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      circlesRef.current.forEach((circle) => circle?.remove());
      circlesRef.current = [];
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [screenWidth, hasError]);

  if (hasError) return null;

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full bg-transparent z-50"
        style={{ pointerEvents: "none" }}
      />
      {sparkles.length > 0 && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${clickPosition.x}px`,
            top: `${clickPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}>
          {sparkles.map((sparkle) => (
            <motion.span
              key={sparkle.id}
              initial={{
                x: sparkle.startX,
                y: sparkle.startY,
                opacity: 0,
                scale: 0.5,
                rotate: 0,
              }}
              animate={{
                x: sparkle.endX,
                y: sparkle.endY,
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0],
                rotate: sparkle.rotate,
              }}
              transition={{
                duration: 0.8,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
              className="absolute block rounded-full bg-white"
              style={{
                background:
                  "radial-gradient(circle, #00FFFF 0%, #0088FF 50%, #0000FF 100%)",
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                filter: "blur(1px) brightness(1.5)",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CursorParticles;
