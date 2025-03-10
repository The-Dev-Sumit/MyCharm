import React, { useState, useEffect, useRef } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Screenshot from "../assets/images/Screenshot.png";
import CodeSnap from "../assets/images/codesnap.png";

const myFourthProject = ({ registerText, unregisterText }) => {
  const cardRef = useRef(null);
  const textRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
    
  
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
  
const handleImageClick = () => {
    setIsOpen(true); // Open modal on click
    setZoomLevel(1); // Reset zoom level
  };

  const handleClose = () => {
    setIsOpen(false); // Close modal
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3)); // Max zoom level 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1)); // Min zoom level 1x
  };
    
    return (
    <>
        {isMobile ? (
          <div className="flex w-full h-[70vh] flex-col justify-center items-center mt-[-20vh] gap-3 bg-transparent text-white">
            <p className="flex justify-end w-full text-sm -mr-6">Date: 13-02-2025</p>
            <h2 className="text-lg font-bold tracking-wider">
              My First Desktop App: CodeSnap
            </h2>
              <div className="flex justify-center flex-col items-center w-[75vw] h-[34vh] object-cover rounded-lg overflow-hidden">
                    <div className="flex flex-row items-center gap-2 text-white font-semibold tracking-wide py-5">
                            <img src={CodeSnap} alt="CodeSnap Logo" className="w-8 h-8 rounded-md" /> 
                            <a href="/gfdashjdyebsghaewe34g4y5reewrr"
                                    target="_blank"
                                    onClick={() => sessionStorage.setItem("downloadAccess", "true")}
                                    className="text-md tracking-wide">
                                CodeSnap-app-Installer
                        </a>    
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={Screenshot}
                  alt="app Screenshot"
                  className="w-[85vw] h-[23vh] object-cover rounded-lg overflow-hidden z-30" 
                  onClick={handleImageClick}
                  />
                
          {isOpen && (
        <div className="absolute top-[148rem] left-1 right-0 bottom-0  z-30">
          <div className="relative p-1 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-[.5rem] z-40 text-white px-3 py-1 text-lg"
              onClick={handleClose}
            >
              ✕
            </button>

            {/* Zoomable Image */}
            <Zoom>
              <img
                src={Screenshot}
                alt="App Screenshot"
                className="transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  cursor: zoomLevel > 1 ? "grab" : "default",
                }}
                />
                </Zoom>
          </div>
        </div>
      )}
                </div>
            </div>
            
        <p className="text-[#F6F0F0] capitalize select-none text-center w-[75vw] leading-loose">This is my first ever Desktop App, using Javascript and the name is CodeSnap. A simple and easy to use code editor were you can write 4 languages like - c, c++, js, python. And this is an offline code editor.</p>
        </div>
        ):(
            <div  className="flex myWork w-full h-[100vh] flex-col justify-center items-center py-6 gap-10 bg-transparent">
            <div className="flex justify-between myw w-full px-10 items-center  text-[#F6F0F0] select-none ">
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
            className="text-xl myWork1 font-bold ml-[34vw] transform-gpu transition-transform duration-300 ease-out preserve-3d hover:shadow-xl ">
                My First Desktop App: CodeSnap
                            </h2>
          <p ref={(el) => (textRefs.current[1] = el)}
            onMouseMove={(e) => {
              handleMouseMove(e);
              handleMouseLeave(e);
              handleTextHover(true, e.currentTarget);
            }}
            onMouseLeave={(e) => handleTextHover(false, e.currentTarget)}
            className="mr-14 myWork2">Date: 13-02-2025</p>
            </div>
                <div className="flex myWork4  justify-center items-center w-[50vw] h-[20vh] object-cover rounded-lg overflow-hidden">              
                  <div className="flex flex-row workEmg text-white gap-2">
                        <img src={CodeSnap} alt="CodeSnap Logo" className="w-10 h-10 workEmg1 rounded-md" /> 
                          <a href="/gfdashjdyebsghaewe34g4y5reewrr"
                                    target="_blank"
                                    onClick={() => sessionStorage.setItem("downloadAccess", "true")}
                                    className="text-lg workEmg2 tracking-wide">
                                CodeSnap-app-Installer
                        </a>    
                </div>
              </div>
              <div className="flex  justify-center items-center">
                <img
                  src={Screenshot}
                  alt="app Screenshot"
                  className="w-[35vw] h-[35vh] myWork5 object-cover rounded-lg overflow-hidden z-30" 
                  onClick={handleImageClick}
                  />
                
          {isOpen && (
        <div className="absolute Screen top-[140rem] left-32 right-0 bottom-0  z-30">
          <div className="relative screen11 p-1 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute screen1 top-2 right-[10.5rem] z-40 text-white px-3 py-1 text-lg"
              onClick={handleClose}
            >
              ✕
            </button>

            {/* Zoomable Image */}
            <Zoom>
              <img
                src={Screenshot}
                alt="App Screenshot"
                className="transition-transform duration-300"
                style={{
                  transform: `scale(${zoomLevel})`,
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  cursor: zoomLevel > 1 ? "grab" : "default",
                }}
                  />
               <div className="gap-6 absolute zoomIn top-2 left-[57rem]">
              <button
                className="bg-gray-600 zoomIn1 text-white px-3 py-2 rounded-lg hover:bg-gray-800"
                onClick={handleZoomIn}
              >
                🔍 Zoom In
              </button>
              <button
                className="bg-gray-600 zoomIn2 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                onClick={handleZoomOut}
              >
                🔎 Zoom Out
              </button>
            </div>
                </Zoom>
              
          </div>
        </div>
      )}
                </div>
        <p ref={(el) => (textRefs.current[2] = el)}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleMouseLeave(e);
              handleTextHover(true, e.currentTarget);
            }}
            onMouseLeave={(e) => handleTextHover(false, e.currentTarget)}
          className="text-[#F6F0F0] capitalize myWork6 select-none text-center mt-5 w-[35vw] leading-loose tracking-wider">This is my first ever Desktop App, using Javascript and the name is CodeSnap. A simple and easy to use code editor were you can write 4 languages like - c, c++, js, python. And this is an offline code editor.</p>
        </div>
        )}
        </>
    )
  }

export default myFourthProject