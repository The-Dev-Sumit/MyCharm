import { useEffect } from "react";
import $ from "jquery";
import "jquery.ripples";

const useRippleEffect = (ref) => {
  useEffect(() => {
    if (!ref.current) return;

    // Initialize ripple effect
    const initializeRipples = () => {
      $(ref.current).ripples({
        resolution: 512, // High-resolution ripples
        dropRadius: 20, // Radius of ripple drops
        perturbance: 0.04, // Ripple smoothness
        interactive: true, // Respond to mouse interactions
      });
    };

    initializeRipples();

    // Cleanup on component unmount
    return () => {
      if ($(ref.current).data("ripples")) {
        $(ref.current).ripples("destroy");
      }
    };
  }, [ref]);
};

export default useRippleEffect;
