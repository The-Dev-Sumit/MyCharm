import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const Navbar = ({ registerText, unregisterText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true); 
  const textRefs = useRef([]);
  const navbarRef = useRef(null); // Reference for the navbar
  const lastScrollY = useRef(0); // Track last scroll position

  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(load);
  }, []);

  useEffect(() => {
    const textNodes = textRefs.current.filter((ref) => ref);
    textNodes.forEach((ref) => {
      if (ref) registerText(ref);
    });

    return () => {
      textNodes.forEach((ref) => {
        if (ref) unregisterText(ref);
      });
    };
  }, [registerText, unregisterText]);

  const handleTextHover = (isHovering, textElement) => {
    if (isHovering) {
      textElement.style.color = "#F8E7F6";
      textElement.style.zIndex = "40";
      textElement.style.fontWeight = "bold";
      textElement.style.shadow = "0px 0px 8px rgba(255, 165, 0, 0.8)";
    } else {
      textElement.style.color = "#F6F0F0"; // Reset to original color
      textElement.style.zIndex = ""; // Revert to default z-index
      textElement.style.fontWeight = "";
      textElement.style.shadow = "";
    }
  };

  // Handle scroll to animate navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        if (isVisible) {
          gsap.to(navbarRef.current, {
            y: "-100%", // Slide up out of view
            duration: 0.8, // Smooth animation
            ease: "power2.out",
          });
          setIsVisible(false);
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        if (!isVisible) {
          gsap.to(navbarRef.current, {
            y: "0%", // Slide back into view
            duration: 0.6, // Smooth animation
            ease: "power2.out",
          });
          setIsVisible(true);
        }
      }

      // Update last scroll position, but only if scrolled beyond a threshold (e.g., 10px) to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse bg-black p-4 w-full text-white">
          <div className="flex items-center w-full justify-center">
            <ul className="nav flex flex-row gap-[5vw]">
              {/* Skeleton for Navbar Items */}
              <li className="h-4 w-16 bg-gray-700 rounded"></li>
              <li className="h-4 w-20 bg-gray-700 rounded"></li>
              <li className="h-4 w-24 bg-gray-700 rounded"></li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          ref={navbarRef} // Add ref to the navbar for GSAP animation
          className="flex nave third1 bg-black flex-row p-4 w-full text-white overflow-x-hidden"
          style={{
            position: "relative", // Remove fixed positioning
            transform: "translateY(0%)", // Initial position for animation
            willChange: "transform", // Optimize for animations
          }}>
          <div className="flex items-center w-full justify-center">
            <ul className="nav flex flex-row gap-[5vw]">
              <li>
                <a
                  ref={textRefs.current}
                  onMouseMove={(e) => handleTextHover(true, e.currentTarget)}
                  onMouseLeave={(e) => handleTextHover(false, e.currentTarget)}
                  href="/">
                  Home
                </a>
              </li>
              <li>
                <a
                  ref={textRefs.current}
                  onMouseMove={(e) => handleTextHover(true, e.currentTarget)}
                  onMouseLeave={(e) => handleTextHover(false, e.currentTarget)}
                  href="/about-me"
                  target="_blank"
                  rel="noopener noreferrer">
                  About Me
                </a>
              </li>
              <li>
                <a
                  ref={textRefs.current}
                  onMouseMove={(e) => handleTextHover(true, e.currentTarget)}
                  onMouseLeave={(e) => handleTextHover(false, e.currentTarget)}
                  href="/contact-me"
                  target="_blank"
                  rel="noopener noreferrer">
                  Contact Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;