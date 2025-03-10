import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const ThirdProject = "https://www.youtube.com/embed/E6YPc_Jb1qs?si=U3FVhXju0UAexXRg";

const MyThirdProject = ({ registerText, unregisterText }) => {
  const cardRef = useRef(null);
  const textRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)");
        setIsMobile(mediaQuery.matches);
    
        const handleResize = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleResize);
    
        return () => mediaQuery.removeEventListener("change", handleResize);
      }, []);

  const handleMouseMove = (e) => {
  const card = cardRef.current;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // Mouse X relative to card
  const centerX = rect.width / 2;

  // Calculate rotation based only on horizontal (left/right) mouse position
  const rotateY = (centerX - x) / centerX * 20; // Max 20deg tilt left/right

  // Apply the transform (only Y-axis rotation)
  card.style.transform = `rotateY(${rotateY}deg)`;
};

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

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
      textElement.style.color = "#690B22"; 
      textElement.style.zIndex = "50"; 
      textElement.style.fontWeight = "bold";
    } else {
      textElement.style.color = "#F6F0F0"; // Reset to original color
      textElement.style.zIndex = ""; // Revert to default z-index
      textElement.style.fontWeight = "";
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="flex w-full h-[70vh] flex-col justify-center items-center mt-[-30vh] gap-3 bg-transparent text-white">
          <p className="flex justify-end w-full text-sm -mr-6">
          Date: 03-02-2024
        </p>
        <h2 className="text-lg font-bold tracking-wider">
          My Third Project: Snake Game
        </h2>
      <div className="flex  justify-center items-center w-[75vw] h-[28vh] object-cover rounded-lg overflow-hidden z-40">
        <ReactPlayer
          url={ThirdProject}
          controls
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                origin: window.location.origin,
                disablekb: 0,
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3,
                cookie: 0,
              },
            },
          }}
        />
      </div>
      <p className="text-[#F6F0F0] capitalize select-none text-center w-[75vw] leading-loose">
        This is my third project and first game using java language for the first time, this is a basic Snake Game, i wanted to try something new.
      </p>
      </div>
      ) : (
        <div className="flex third w-full myWork h-[100vh] flex-col justify-center items-center py-6 gap-7">
      <div className="flex justify-between myw w-full px-10 items-center text-[#F6F0F0]">
        <h2
          ref={(el) => {
            cardRef.current = el;
            textRefs.current[0] = el;
          }}
        onMouseMove={(e) => {
            handleMouseMove(e);
          handleTextHover(true, e.currentTarget);
          }}
          onMouseLeave={(e) => {
            handleTextHover(false, e.currentTarget);
            handleMouseLeave(e);
          }}
          className="text-2xl myWork11 font-bold ml-[33.5vw] transform-gpu transition-transform duration-300 ease-out preserve-3d hover:shadow-xl z-50"
        >
          My Third Project: Snake Game
        </h2>
        <p ref={(el) => (textRefs.current[1] = el)}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleMouseLeave(e);
            handleTextHover(true, e.currentTarget);
          }}
          onMouseLeave={(e) => handleTextHover(false, e.currentTarget)} className="mr-14 myWork22">
          Date: 03-02-2024
        </p>
      </div>
      <div className="flex justify-center myWork33 items-center w-[35vw] h-[35vh] object-cover rounded-lg overflow-hidden">
        <ReactPlayer
          url={ThirdProject}
          controls
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                origin: window.location.origin,
                disablekb: 0,
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3,
                cookie: 0,
              },
            },
          }}
        />
      </div>
      <p ref={(el) => (textRefs.current[2] = el)}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleMouseLeave(e);
            handleTextHover(true, e.currentTarget);
          }}
          onMouseLeave={(e) => handleTextHover(false, e.currentTarget)} className="text-[#F6F0F0] capitalize myWork44 text-center mt-5 w-[35vw] leading-relaxed z-50">
        This is my third project and first game using java language for the first time, this is a basic Snake Game, i wanted to try something new.
      </p>
      </div>
    )}
      </>
  );
};

export default MyThirdProject;