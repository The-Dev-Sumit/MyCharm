import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircleBurshedGame from "./CircleBurshedGame";

gsap.registerPlugin(ScrollTrigger);

const ArrowAnimation = () => {
  const divRef = useRef(); // Reference for the animated div

  useEffect(() => {
    if (!divRef.current) return;
    // Div animation: Independent horizontal animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#arrow-container",
        start: "top center", // Same scroll behavior as arrow
        end: "bottom+=230 center",
        scrub: .5, // Smooth scrolling animation
      },
    }).fromTo(
      divRef.current,
      { transform: "translateX(100%)" }, // Start off-screen to the right
      { transform: "translateX(0%)", ease: "power4.out" } 
    );

    // Cleanup animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "300px",
        overflow: "hidden",
      }}
    >
      <div
        id="arrow-container"
        style={{
            position: "absolute",
            width: "100%",
            top: '0px',
          zIndex: 2,
        }}
      >
        {/* Animated Div */}
        <div
          ref={divRef}
          style={{ position: "absolute",
            height: "300px",
            width: "100%",
              transform: "translateX(100%)", // Initial off-screen position
            zIndex: 1,
          }}>
                <CircleBurshedGame/>  
        </div>
      </div>
    </div>
  );
};

export default ArrowAnimation;
