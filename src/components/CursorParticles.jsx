import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const CursorParticles = ({ screenWidth, hasError }) => {
  const containerRef = useRef(null);
  const circlesRef = useRef([]);
  const coords = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const lastUpdate = useRef(0);
  const debounceTimeout = 16;
  const [sparkles, setSparkles] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const isAnimating = useRef(false);

  useEffect(() => {
    if (hasError) {
      document.body.style.cursor = "auto";
      return;
    }

    const numCircles = screenWidth > 1024 ? 40 : screenWidth > 640 ? 25 : 15;
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
      const circle = document.createElement("div");
      circle.className = "cursor-circle";
      circle.style.position = "absolute";
      circle.style.width = "24px";
      circle.style.height = "24px";
      circle.style.borderRadius = "50%";
      circle.style.background =
        "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 50%, rgba(139,0,0,1) 100%)";
      circle.style.boxShadow = "0px 0px 8px rgba(255, 165, 0, 0.8)";
      circle.style.pointerEvents = "none";
      circle.style.left = "0px";
      circle.style.top = "0px";
      circle.style.transition = "all 0.23s ease-out";
      circle.style.border = "none";
      circle.style.opacity = "60%";
      circle.x = 0;
      circle.y = 0;

      containerRef.current.appendChild(circle);
      circles.push(circle);
    }

    circlesRef.current = circles;
    document.body.style.cursor = "none";

    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastUpdate.current >= debounceTimeout) {
        coords.current.x = e.clientX;
        coords.current.y = e.clientY;
        lastUpdate.current = now;
      }
    };

    const handleClick = (e) => {
      if (isAnimating.current) return; // Prevent multiple clicks during animation

      setClickPosition({ x: e.clientX, y: e.clientY });
      isAnimating.current = true;

      // Create sparkles around click position
      const newSparkles = Array(12)
        .fill()
        .map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const distance = 40 + Math.random() * 30;

          return {
            id: `${i}-${Date.now()}`, // Unique ID with timestamp
            startX: 0,
            startY: 0,
            endX: Math.cos(angle) * distance,
            endY: Math.sin(angle) * distance,
            size: Math.random() * 6 + 4,
            opacity: 1,
            rotate: Math.random() * 360,
          };
        });

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
        circle.style.width = "24px";
        circle.style.height = "24px";
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.zIndex = "50";
        circle.style.transform = `scale(${
          (circlesRef.current.length - index) / circlesRef.current.length
        })`;

        circle.x = x;
        circle.y = y;

        const nextCircle =
          circlesRef.current[index + 1] || circlesRef.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      animationFrameId.current = requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      circlesRef.current.forEach((circle) => circle.remove());
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

      {/* Sparkles container */}
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