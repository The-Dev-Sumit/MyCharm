import BlurText from "../components/BlurText";
import { useEffect, useState } from "react";
import Background from "../components/Background";


const HeadBody = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setIsScrolling(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="w-full h-[30vh] mt-7 flex items-center justify-center text-white">
      
      <div
        className="backdrop-blur-sm bg-black/30 w-full py-2 px-4 flex flex-col items-center justify-center rounded-lg gap-2"
        style={{
          transform: `translateY(${scrollPosition * 0.1}px)`,
          opacity: Math.max(0, 1 - scrollPosition * 0.002),
          transition: "all 0.3s ease-out",
        }}>
        <BlurText
          text="Welcome to my digital presence"
          animateBy="words"
          direction="top"
          delay={130}
          className="text-[4.5vw] md:text-[3.5vw] lg:text-[2.8vw] tracking-wide drop-shadow-md bungee-spice-regular"
          onAnimationComplete={handleComplete}
        />
        <p className="text-center iansui capitalize md:w-[70vw] lg:w-[70vw] w-[85vw] tracking-wide border-none md:text-[.9rem] lg:text-[1rem] text-[.68rem]">
          Here, creativity meets functionality. I am excited to share my work
          with you. I am a passionate developer who thrives on challenges and
          enjoys pushing boundaries. Excellence is not just a goal for me😁 it
          is my driving force.
        </p>
      </div>
    </div>
  );
};

export default HeadBody;
