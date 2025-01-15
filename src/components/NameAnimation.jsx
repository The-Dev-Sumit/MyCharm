import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const NameAnimation = () => {
  const [scrollDirection, setScrollDirection] = useState("up"); 
  const [hasAnimated, setHasAnimated] = useState(false); 

  useEffect(() => {
    let lastScroll = window.scrollY;

    // Scroll listener
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        // Scrolling down
        setScrollDirection("down");
      } else {
        // Scrolling up
        setScrollDirection("up");
      }

      lastScroll = currentScroll;
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const brushStroke = gsap.timeline();
    const nameStroke = gsap.timeline();

    if (scrollDirection === "up" && !hasAnimated) {
      // Animate forward on scroll up
      setHasAnimated(true);

      // Brush Stroke Animation
      brushStroke.fromTo(
        ".brush-path",
        { strokeDashoffset: 1000 }, // Start fully hidden
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" } // Fully visible
      );

      // Name Stroke Animation
      nameStroke
        .fromTo(
          ".name-path",
          { strokeDashoffset: 500 }, // Start fully hidden
          { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" } // Fully visible
        )
        .to(".name-path", { fill: "#2E073F", duration: 1, ease: "power2.inOut" }); // Fill the name

    } else if (scrollDirection === "down" && hasAnimated) {
      // Animate reverse on scroll down
      setHasAnimated(false);

      // Reverse Brush Stroke
      brushStroke.to(".brush-path", {
        strokeDashoffset: 1000, // Fully hidden
        duration: 2,
        ease: "power2.inOut",
      });

      // Reverse Name Stroke
      nameStroke
        .to(".name-path", { fill: "none", duration: 1, ease: "power2.inOut" }) // Remove fill
        .to(".name-path", {
          strokeDashoffset: 500, // Fully hidden
          duration: 2,
          ease: "power2.inOut",
        });
    }
  }, [scrollDirection, hasAnimated]);

  return (
    <div className="flex justify-center items-center h-[230px] bg-transparent">
      <svg
        width="16rem"
        height="230"
        viewBox="-462 400 1600 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brush Stroke Path */}
        <path
          className="brush-path"
          d="M50 150 Q250 20, 500 150 T950 150"
          stroke="url(#gradient)"
          strokeWidth="350"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          transform="rotate(-10, 500, 150)"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#f9d423" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>

        {/* Name Stroke Path */}
        <text
          className="name-path"
          x="30%"
          y="70%"
          textAnchor="middle"
          fontSize="128"
          fontWeight="semibold"        
          fontFamily="Lemon, sans-serif"
          fill="none"
          strokeWidth="2"
          strokeDasharray="500" // Total length of the name path
          strokeDashoffset="500" // Start fully hidden
        >
          Sumit Sonar
        </text>
      </svg>
    </div>
  );
};

export default NameAnimation;
