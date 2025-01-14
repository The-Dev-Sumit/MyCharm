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



import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './arrow.css'

gsap.registerPlugin(ScrollTrigger);

const ArrowAnimation = () => {
  const arrowRef = useRef(); // Reference for the arrow
  const clothRef = useRef(); // Reference for the cloth
  const nameRef = useRef(); // Reference for the name text

  const arrowModel = useGLTF("/arrow.glb"); // Load arrow model

  useEffect(() => {
    if (!arrowModel) return; // Ensure models are loaded

    // Ensure the 3D objects are assigned to refs
    arrowRef.current = arrowModel.scene;

    // Rotate the arrow to be horizontal (pointing left to right)
    arrowRef.current.rotation.set(-1, Math.PI, 0); // Flip on Y-axis


    // GSAP Animation Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#arrow-container", // Section to trigger animations
        start: "top center", // When top of the section reaches center
        end: "bottom center", // When bottom of the section reaches center
        scrub: 0.4, // Sync animations with scroll
        pin: "#arrow-container",
      },
    });

    // Arrow animation: Right to left
    tl.fromTo(
      arrowRef.current.position,
      { x: 25, y: 8 }, // Start off-screen to the right
      { x: -12.8, y: -0.5, ease: "power4.out" } // Stop at the left edge
    );

      // Reveal and animate the cloth
    tl.eventCallback("onComplete", () => {
      // Reveal the cloth
      gsap.to(clothRef.current, {
        scale: 1,
        duration: 1,
        ease: "power2.out", // Smooth animation
      });

      // Floating animation for the cloth
      gsap.to(clothRef.current, {
        y: "+=10", // Float the cloth up and down
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 2,
      });

      // Reveal the name on the cloth
      gsap.to(nameRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Reverse animation on scroll up
    ScrollTrigger.create({
      trigger: "#arrow-container",
      start: "center center",
      onLeaveBack: () => {
        // Hide the cloth
        gsap.to(clothRef.current, {
          scale: 0,
          duration: 0.5,
          ease: "power2.in",
        });

        // Hide the name
        gsap.to(nameRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" });

        // Reverse the arrow animation
        tl.reverse();
      },
    });

    // Cleanup animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, [arrowModel]);

  return (
    <div
      id="arrow-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "300px",
        overflow: "hidden", // Prevent objects from overflowing
      }}
    >
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
        }}
      >
        {/* Arrow */}
        {arrowModel && (
          <primitive
            ref={arrowRef}
            object={arrowModel.scene}
            position={[20, 0, 0]} // Start position: off-screen to the right
            scale={[2.1, 2.1, 2.1]}
          />
        )}
          </Canvas>

        <div
        ref={clothRef}
        style={{
          position: "absolute",
          top: "30%",
          left: "30%", 
          transform: "translate(-50%, -50%)", 
          width: "200px",
          height: "100px",
          backgroundColor: "#ff6b6b",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          animation: "waterWave 4s infinite ease-in-out",
        }}
      >
        {/* Name on Cloth */}
        <div
          ref={nameRef}
          style={{
            fontFamily: "'DM Serif Text', serif",
            fontSize: "1.4rem",
            color: "#fff",
            textAlign: "center",
            lineHeight: "100px",
            opacity: 0, 
          }}>
          Sumit Sonar
        </div>
      </div>
    </div>
  );
};

export default ArrowAnimation;


