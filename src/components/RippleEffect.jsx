import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "jquery.ripples";
import UnderWater from '../assets/images/underwater-dark.png'

const RippleEffect = () => {
 const rippleRef = useRef(null);

  useEffect(() => {
    // Initialize ripple effect
    const initializeRipples = () => {
      $(rippleRef.current).ripples({
        resolution: 512, // High-resolution ripples
        dropRadius: 20, // Radius of ripple drops
        perturbance: 0.04, // Ripple smoothness
        interactive: true, // Respond to mouse interactions
      });
    };

    initializeRipples();

    // Cleanup on component unmount
    return () => {
      if ($(rippleRef.current).data("ripples")) {
        $(rippleRef.current).ripples("destroy");
      }
    };
  }, []);

    return <div ref={rippleRef} className="w-full h-[29rem]  bg-black   overflow-hidden">
        <img src={UnderWater} className="w-full h-[29rem] opacity-15 select-none" />
  </div>
};

export default RippleEffect;
