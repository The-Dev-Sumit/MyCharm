import React, { useState, useRef, useEffect } from "react";
import { Html, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Shuriken = () => {
  const bladeRef = useRef();
    const nameRef = useRef();
    const cutEffectRef = useRef();
    const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Load your custom 3D blade model
  const { scene } = useGLTF("/Shuriken.glb", true);

  const startAnimation = () => {

     if (!bladeRef.current || !nameRef.current || !cutEffectRef.current) return;
        
      window.scrollTo(0, 0);

    // Blade animation triggered by scroll
     const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#blade-container", // Target the blade container
        start: "top center", // Animation starts when the container reaches the center
        end: "bottom center", // Animation ends when the container exits the viewport
        scrub: 0.5, // Sync animation with scroll
      },
     });
        

      // Move blade 40% from right to left
      tl.fromTo(
      bladeRef.current.position,
      { x: 25 }, // Initial position: off-screen right
      { x: -40, ease: "power4.out" } // Move to the left
    ).fromTo(
      bladeRef.current.rotation,
      { z: 0 },
      { z: 8 * Math.PI, ease: "none" }, // 8 full rotations
      "<"
       );
       
       // PNG (Cut Effect) animation
     ScrollTrigger.create({
    trigger: "#blade-container",
    start: "top-=10 center", // Trigger when blade crosses center
    onEnter: () => {
        cutEffectRef.current.style.opacity = "1"; // set to full opacity
    },
    onLeaveBack: () => {
        cutEffectRef.current.style.opacity = "0"; // Hide on scroll up
    },
  });

    // Name reveal animation
    gsap.to(nameRef.current, {
      scrollTrigger: {
        trigger: "#blade-container", // Target the blade container
        start: "top center", // Name reveals when the container is in the center
        end: "top+=100", // Smooth reveal over 300px scroll
        scrub: true,
      },
      opacity: 1, // Gradually make the name visible
    });

     // Refresh ScrollTrigger after animations
    ScrollTrigger.refresh();
  }
  
    useEffect(() => {
    if (scene) {
      setIsModelLoaded(true); // Mark model as loaded
    }
    }, [scene]);
  
   useEffect(() => {
    if (isModelLoaded) {
      // Add a slight delay to ensure consistent initialization
      const timeout = setTimeout(() => {
        startAnimation();
      }, 100); // Adjust delay if needed

      return () => clearTimeout(timeout);
    }
  }, [isModelLoaded]);

  return (
      <>
      {/* Custom Blade Model */}
      <primitive
        ref={bladeRef}
        object={scene}
        position={[20, 0, 0]} // Start position: off-screen on the right
        scale={[1.3, 1.3, 1.3]} // Adjust size of the blade
        rotation={[1.3, 0.3, 0]} // Initial rotation
          />
          

          {/* PNG (Cut Effect) */}
      <Html position={[0, 0, 0]} transform>
  {/* Container for PNG and Name */}
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)", // Center the container
      width: "400px",
      height: "200px",
      zIndex: 10, // Ensure stacking context is consistent
      overflow: "hidden", // Clip the reveal
    }}
  >
    {/* PNG (Cut Effect) */}
      <div   
      ref={cutEffectRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundImage: "url('/cut-effect.png')", // Replace with your PNG path
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity: 0, // Initially hidden
      }}
    />

    {/* Name Above PNG */}
        <div
      ref={nameRef}
        style={{
        fontFamily: "'DM Serif Text', serif",
        letterSpacing: "0.1em",
        position: "absolute",
        top: "68px", // Adjust to place above PNG
        width: "100%",
        fontSize: "1.4rem",
        color: "#ff6b6b",
        textAlign: "center",
        opacity: 0, // Initially hidden
        fontWeight: "bold",
        zIndex: 10, // Higher z-index
      }}
    >
      Sumit Sonar
    </div>
  </div>
</Html>
    </>
  );
};

export default Shuriken;
