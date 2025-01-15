# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<script>
      // Disable right-click
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      // Disable certain key combinations
      document.addEventListener("keydown", (e) => {
        // Prevent F12
        if (e.key === "F12") {
          e.preventDefault();
        }
        // Prevent Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.key === "I") {
          e.preventDefault();
        }
        // Prevent Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.key === "C") {
          e.preventDefault();
        }
        // Prevent Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.key === "J") {
          e.preventDefault();
        }
        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && e.key === "U") {
          e.preventDefault();
        }
      });
    </script>


    ScrollTrigger.getAll().forEach((st) => st.kill());

    import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const NameAnimation = () => {
  const brushRef = useRef(null); // Reference for the brush path
  const nameRef = useRef(null); // Reference for the name path
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef(null);  

useEffect(() => {
    // Create GSAP timeline
    const timeline = gsap.timeline({ paused: true });

    // Brush Animation
    timeline.fromTo(
      brushRef.current,
      { strokeDashoffset: 800 },
      { strokeDashoffset: 0, duration: 3, ease: "power2.inOut" }
    );

    timeline.fromTo(
      nameRef.current,
      { strokeDashoffset: 400 }, 
      { strokeDashoffset: 0, duration: 3, ease: "power2.inOut" }, 
      "-=2" 
    );

    timelineRef.current = timeline;

    // Initial animation on page load
    timeline.play().then(() => setIsAnimating(false));

    // Scroll behavior
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > scrollPosition) {
        // Scrolling down
        if (!isAnimating && timelineRef.current.progress() > 0) {
          setIsAnimating(true);
          timelineRef.current.reverse().then(() => setIsAnimating(false));
        }
      } else if (currentScroll < scrollPosition) {
        // Scrolling up
        if (!isAnimating && timelineRef.current.progress() < 1) {
          setIsAnimating(true);
          timelineRef.current.play().then(() => setIsAnimating(false));
        }
      }

      setScrollPosition(currentScroll);
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      timeline.kill();
    };
  }, [scrollPosition, isAnimating]);

  return (
    <div className="flex justify-center text-xl items-center absolute left-[16%] h-[150vh] bg-transparent">
      <svg
        width="80%"
        height="330"
        viewBox="-652 750 1900 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-hidden"
      >
        {/* Brush Stroke Path */}
        <path
          ref={brushRef}
          d="M50 150 Q250 20, 500 150 T950 150"
          stroke="url(#gradient)"
          strokeWidth="350"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          transform="rotate(-10, 500, 150)"
              />
              
          <path
          ref={nameRef}
          d="M300 150 L350 150 L400 150 L450 150 L500 150 L550 150 L600 150"
          stroke="black"
          strokeWidth="72"
          fill="none"
          strokeDasharray="400" // Adjust based on name length
          strokeDashoffset="400"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#f9d423" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>
          </svg>
    </div>
  );
};

export default NameAnimation;

