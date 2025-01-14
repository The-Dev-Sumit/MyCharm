import React, { useEffect } from "react";
import { gsap } from "gsap";

const ShapeAnimation = () => {
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    // Animate shape attributes manually
    timeline
      .to(".shape", {
        attr: { d: "M100,100 Q300,50 300,300 Q50,350 100,100 Z" }, // Morph to target shape
        duration: 1,
        ease: "power2.inOut",
      })
      .to(".shape", {
        attr: { d: "M200,50 Q350,150 200,250 Q50,150 200,50 Z" }, // Morph back to the original shape
        duration: 1,
        ease: "power2.inOut",
      });
  }, []);

  return (
    <div className="flex justify-center items-center bg-transparent">
      <svg
        width="500"
        height="100"
        viewBox="-410 40 1800 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shape (Initial Shape) */}
        <path
          className="shape"
          d="M200,50 Q350,150 200,250 Q50,150 200,50 Z"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="url(#gradient)"
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#f9d423" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ShapeAnimation;
