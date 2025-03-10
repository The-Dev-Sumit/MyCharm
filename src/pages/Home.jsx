import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Landing from '../components/Landing';
import MainBody from '../components/MainBody';
import Footer from '../components/Footer';
import LandingForMobile from '../components/LandingForMobile';
import FooterForMobile from '../components/FooterForMobile';
import MyFirstProject from '../ProjectsContainer/myFirstProject';
import MySecondProject from '../ProjectsContainer/mySecondProject';
import MyThirdProject from '../ProjectsContainer/myThirdProject';
import MyFourthProject from '../ProjectsContainer/myFourthProject';
import CursorParticles from '../components/CursorParticles';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import NavbarMobile from '../components/NavbarMobile';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


const projects = [
  MyFirstProject,
  MySecondProject,
  MyThirdProject,
  MyFourthProject
];

const useTextElements = () => {
  const textElements = useRef([]);

  const registerTextElement = (element) => {
    if (element && !textElements.current.includes(element)) {
      textElements.current.push(element);
    }
  };

  const unregisterTextElement = (element) => {
    textElements.current = textElements.current.filter((el) => el !== element);
  };

  const clearTextElements = () => {
    textElements.current = [];
  };

  return { textElements, registerTextElement, unregisterTextElement, clearTextElements };
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const projectsRef = useRef([]);
  const { textElements, registerTextElement, unregisterTextElement } = useTextElements();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(load);
  }, []);

  const registerText = (element) => registerTextElement(element);
  const unregisterText = (element) => unregisterTextElement(element);

  const getRandomDelay = () => `${Math.random() * 4}s`;

  return (
    <div className="w-full overflow-x-hidden relative">
      <div className="fixed w-full z-40 top-0">
        {isMobile ? (
          <NavbarMobile/>
        ) :(
          <Navbar registerText={registerText} unregisterText={unregisterText} />
        )}
        
      </div>
    
      {!isMobile && <CursorParticles textElements={textElements} screenWidth={window.innerWidth} />}

      <div className="w-full land mt-12">
        {isMobile ? (
          <LandingForMobile />
        ) : (
          <Landing registerText={registerText} unregisterText={unregisterText} />
        )}
      </div>

      <div className="w-full">
        <MainBody />
      </div>

      <div className="w-full scroll-skill myWMain min-h-screen flex flex-col items-center justify-center relative bg-black overflow-y-auto px-10 snap-y snap-mandatory">
        <div className="control-star inset-0 w-full h-full pointer-events-none absolute">
            {[...Array(220)].map((_, index) => (
              <div
                key={index}
                className="star absolute"
                style={{
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDelay: getRandomDelay(),
                }}
              ></div>
            ))}
          </div>
        {projects.map((Project, index) => (
          <motion.div
            key={index}
            ref={(el) => (projectsRef.current[index] = el)}
            className="w-full min-h-[80vh] myWorkIs flex items-center justify-center snap-center"
          >
            <Project registerText={registerText} unregisterText={unregisterText} />
          </motion.div>
        ))}
      </div>

      <div className="w-full">
        {isMobile ? (
          <FooterForMobile />
        ) : (
          <Footer registerText={registerText} unregisterText={unregisterText} />
        )}
      </div>
    </div>
  );
};

export default Home;