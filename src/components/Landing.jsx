import React, { useEffect, useRef, useState } from "react";
import RippleEffect from "./RippleEffect";
import WaterEffect from "../utils/useRippleEffect";

const Landing = ({ registerText, unregisterText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const textRefs = useRef({}); // Store refs for each text element's letter spans as an object

  const rippleRef = useRef(null);

  WaterEffect(rippleRef);

  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(load);
  }, []);

  // Register letter spans with registerText
  useEffect(() => {
    Object.values(textRefs.current).forEach((spans) => {
      spans.forEach((span) => {
        if (span) registerText(span);
      });
    });

    return () => {
      Object.values(textRefs.current).forEach((spans) => {
        spans.forEach((span) => {
          if (span) unregisterText(span);
        });
      });
    };
  }, [registerText, unregisterText]);

  // Function to split text into letter spans with inline display and hover events
  const splitTextToSpans = (text, refKey) => {
    if (!textRefs.current[refKey]) textRefs.current[refKey] = []; // Initialize array for this refKey
    return text.split("").map((char, index) => (
      <span
        key={`${refKey}-${index}`} // Use refKey for unique keys
        ref={(el) => (textRefs.current[refKey][index] = el)} // Use callback ref to store in textRefs.current[refKey]
        style={{
          display: "inline", // Maintain natural text flow
          transition: "color 0.4s ease-out, opacity 0.4s ease-out", // Smooth transition
        }}
        onMouseEnter={(e) => handleTextHover(true, e.target)}
        onMouseLeave={(e) => handleTextHover(false, e.target)}
      >
        {char}
      </span>
    ));
  };

  // Function to handle text color and opacity change on hover (local to Landing)
  const handleTextHover = (isHovering, textElement) => {
    if (isHovering) {
      textElement.style.color = "#690B22"; // Green for Landing on hover
      textElement.style.opacity = "1"; // Full opacity on hover
      textElement.style.shadow = "0 0 10px #690B22"; // Add shadow on hover
    } else {
      textElement.style.color = "#FEF9D9"; // Reset to original color
      textElement.style.opacity = "0.4"; // Reset to 40% opacity
      textElement.style.shadow = "";
    }
  };

  return (
    <div>
      <div className="mt-10 land overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse w-full h-[400px] bg-gray-400"></div>
        ) : (
          <RippleEffect />
        )}
      </div>
      {isLoading ? (
        <>
          <h1 className="h-14 absolute left-[20%] top-[24%] w-[55%] bg-gray-500 animate-pulse mb-4 rounded-md"></h1>
          <h1 className="h-6 absolute left-[23%] top-[35%] w-[49%] bg-gray-500 animate-pulse mb-2 rounded-md"></h1>
          <h1 className="h-6 absolute left-[23%] top-[39%] w-[49%] bg-gray-500 animate-pulse mb-2 rounded-md"></h1>
          <h1 className="h-6 absolute left-[44%] top-[43%] w-[5%] bg-gray-500 animate-pulse mb-2 rounded-md"></h1>
        </>
      ) : (
        <>
          <div
            ref={rippleRef}
            className="absolute gap-2 flex flex-col left-[18vw] top-[11rem] border-none md:px-6 px-8 text-[#FEF9D9] text-opacity-40 select-none"
          >
            <h1 className="text-[3.5vw] lanHigh font-bold uppercase">
              {splitTextToSpans("Welcome to my digital space", "title")}
            </h1>
            <p className="text-center capitalize w-[50vw] border-none ml-[2.5vw]">
                "Here, creativity meets functionality. I am excited to share my work with you. I am a passionate developer who thrives on challenges and enjoys pushing boundaries. Excellence is not just a goal for me😁 it is my driving force."
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;