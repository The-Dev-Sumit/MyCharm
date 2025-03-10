import React, { useRef, useEffect } from "react";

const CursorParticles = ({ textElements, screenWidth }) => {
  const containerRef = useRef(null);
  const circlesRef = useRef([]);
  const coords = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);
  const lastUpdate = useRef(0); // For debouncing
  const debounceTimeout = 16; // ~60 FPS, adjust for smoothness


  useEffect(() => {
    // Create circle elements
    const numCircles = screenWidth > 1024 ? 40 : screenWidth > 640 ? 25 : 15; 
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
      const circle = document.createElement("div");
      circle.className = "cursor-circle";
      circle.style.position = "absolute";
      circle.style.width = "24px";
      circle.style.height = "24px";
      circle.style.borderRadius = "50%";
      circle.style.background = "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 50%, rgba(139,0,0,1) 100%)";
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

    // Debounced mousemove handler
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastUpdate.current >= debounceTimeout) {
        coords.current.x = e.clientX;
        coords.current.y = e.clientY;
        lastUpdate.current = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCircles = () => {
  let x = coords.current.x;
  let y = coords.current.y;

  // Check collision only for the lead circle
  const leadCircle = circlesRef.current[0];
  const circleRect = leadCircle.getBoundingClientRect();
  let isOverlapping = textElements.current?.some((element) => {
    if (!element) return false;
    const elementRect = element.getBoundingClientRect();
    return !(
      circleRect.right < elementRect.left ||
      circleRect.left > elementRect.right ||
      circleRect.bottom < elementRect.top ||
      circleRect.top > elementRect.bottom
    );
  }) || false;

  circlesRef.current.forEach((circle, index) => {
    if (isOverlapping) {
      circle.style.width = "100px";
      circle.style.height = "100px";
      circle.style.background = "#FFAB5B";
      circle.style.left = `${x - 46}px`;
      circle.style.top = `${y - 46}px`;
      circle.style.zIndex = "30";
      circle.style.opacity = "100%";
    } else {
      circle.style.width = "24px";
      circle.style.height = "24px";
      circle.style.background = "radial-gradient(circle, rgba(255,165,0,1) 0%, rgba(255,69,0,1) 50%, rgba(139,0,0,1) 100%)";
      circle.style.boxShadow = "0px 0px 8px rgba(255, 165, 0, 0.8)";
      circle.style.left = `${x - 12}px`;
      circle.style.top = `${y - 12}px`;
      circle.style.zIndex = "50";
      circle.style.scale = (circlesRef.current.length - index) / circlesRef.current.length;
      circle.style.transform = `scale(${circle.style.scale})`;

      circle.x = x;
      circle.y = y;

      const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
      
    }

  });

      animationFrameId.current = requestAnimationFrame(animateCircles);
      
    };
    
    animateCircles();

    // Cleanup
    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      circlesRef.current.forEach((circle) => circle.remove());
      circlesRef.current = [];
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [textElements, screenWidth]);

  useEffect(() => {
    document.body.style.cursor = "none";

    const hideCursor = () => {
      document.body.style.cursor = "none";
    };
    window.addEventListener("mousemove", hideCursor);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", hideCursor);
    };
  }, []);

  useEffect(() => {
  const handleClick = (e) => {
    // Prevent infinite recursion
    e.stopImmediatePropagation();

    const target = document.elementFromPoint(e.clientX, e.clientY);
    
    if (target && target !== containerRef.current && target !== e.target) {
      const clickEvent = new MouseEvent("click", {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true,
      });

      target.dispatchEvent(clickEvent);
    }
  };

  window.addEventListener("click", handleClick);
  
  return () => window.removeEventListener("click", handleClick);
}, []);



  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-transparent z-50"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default CursorParticles;