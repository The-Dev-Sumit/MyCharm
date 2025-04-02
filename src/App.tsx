import React, { useState, useEffect, useRef } from "react";
import Board from "./mobileComponents/Board";
import HeadBody from "./mobileComponents/HeadBody";
import AboutMe from "./mobileComponents/AboutMe";
import FourthProject from "./assets/images/Screenshot.png";
import MySkills from "./mobileComponents/MySkills";
import CursorParticles from "./components/CursorParticles"
import ErrorBoundary from "./components/ErrorBoundary";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MySkillsForMobile from "./mobileComponents/MySkillsForMobile";
import MyWorks from "./mobileComponents/MyWorks";


gsap.registerPlugin(ScrollTrigger);


const FirstProject = "https://www.youtube.com/watch?v=epoW9eXuYbk";
const SecondProject =
  "https://www.youtube.com/embed/iwlj7uSlyOk?si=KvwoPD98MOSxS77m";
const ThirdProject =
  "https://www.youtube.com/embed/E6YPc_Jb1qs?si=U3FVhXju0UAexXRg";


  interface ProjectLinks {
    [key: string]: string;
  }

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [projectLinks, setProjectLinks] = useState<ProjectLinks | null>(null);

  const aboutMeRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const mySkillsRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);


  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/67ed76908561e97a50f7853a",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$8lN9jglX2MyremXQgBZ1AuSxtjqHrxfbmSJcfa4eLCdNfhgEdXSt.",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setProjectLinks(data.record.CodeSnapAppLinks);
      } catch (error) {
        console.error("Failed to fetch links:", error);
        setProjectLinks({
          download:
            "https://github.com/The-Dev-Sumit/CodeSnapApp/releases/download/MyApp/CodeSnap-1-v-win-x64.7z",
        });
      } 
    };

    fetchLinks();
  }, []);

  const projects = [
    {
      type: "video" as const,
      content: FirstProject,
      title: "My First Frontend Website",
      description:
        "This is my first frontend website, it is build in html and css and little bit of javascript. This is my first ever project to learn things, from here my journey started.",
      link: undefined,
      linkText: undefined,
      date: "Date: 12-10-2023",
    },
    {
      type: "video" as const,
      content: SecondProject,
      title: "My Second Fullstack Website",
      description:
        "This is my second fullstack website, using html, css and javascript with database and backend, this project i made before our exams, a basic test portal type project, which my friends used. I know it is childish but I fun with whatever i do.",
      link: undefined,
      linkText: undefined,
      date: "Date: 28-01-2024",
    },
    {
      type: "video" as const,
      content: ThirdProject,
      title: " My Third Project: Snake Game",
      description:
        " This is my third project and first game using java language for the first time, this is a basic Snake Game, i wanted to try something new.",
      link: undefined,
      linkText: undefined,
      date: "Date: 03-02-2024",
    },
    {
      type: "image" as const,
      content: FourthProject,
      title: "My First Desktop App: CodeSnap",
      description:
        "This is my first ever Desktop App, using Javascript and the name is CodeSnap. A simple and easy to use code editor were you can write 4 languages like - c, c++, js, python. And this is an offline code editor.",
      link: projectLinks?.download,
      linkText: "Download for Windows",
      date: "Date: 13-02-2025",
    },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(load);
  }, []);

  useEffect(() => {
    if (isLoading || hasError || isTyping) return; 

    const components = [
      aboutMeRef.current,
      worksRef.current,
      boardRef.current,
      mySkillsRef.current,
    ].filter(Boolean); // Remove null refs

    components.forEach((component) => {
      gsap.fromTo(
        component,
        { opacity: 0, y: 50 }, // Invisible state
        {
          opacity: 1,
          y: 0, // Visible state
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: component,
            start: "top 80%", // Start animation when top of component is 80% in viewport
            end: "bottom 20%", // End when bottom is 20% out of viewport
            toggleActions: "play none none reverse", // Play on enter, reverse on leave
            // markers: true, // Uncomment for debugging
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, hasError, isTyping]);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="flex-col gap-4 w-full h-screen flex items-center justify-center bg-blue-950/80">
          <svg viewBox="0 0 240 240" height="240" width="240" className="pl">
            <circle
              strokeLinecap="round"
              strokeDashoffset="-330"
              strokeDasharray="0 660"
              strokeWidth="20"
              stroke="#000"
              fill="none"
              r="105"
              cy="120"
              cx="120"
              className="pl__ring pl__ring--a"></circle>
            <circle
              strokeLinecap="round"
              strokeDashoffset="-110"
              strokeDasharray="0 220"
              strokeWidth="20"
              stroke="#000"
              fill="none"
              r="35"
              cy="120"
              cx="120"
              className="pl__ring pl__ring--b"></circle>
            <circle
              strokeLinecap="round"
              strokeDasharray="0 440"
              strokeWidth="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="85"
              className="pl__ring pl__ring--c"></circle>
            <circle
              strokeLinecap="round"
              strokeDasharray="0 440"
              strokeWidth="20"
              stroke="#000"
              fill="none"
              r="70"
              cy="120"
              cx="155"
              className="pl__ring pl__ring--d"></circle>
          </svg>
        </div>
      ) : (
        <ErrorBoundary onError={setHasError}>
          <div className="w-full z-40 min-h-screen bg-black relative overflow-hidden">
            {!isMobile && !hasError && (
              <CursorParticles
                screenWidth={window.innerWidth}
                hasError={hasError}
              />
            )}
            <div>
              <HeadBody />
            </div>
            <div ref={aboutMeRef}>
              <AboutMe isMobile={isMobile} />
            </div>
            <div ref={worksRef}>
              <MyWorks items={projects} />
            </div>
            {isMobile ? (
              <>
                <Board setIsTyping={setIsTyping} />
                <MySkillsForMobile />
              </>
            ) : (
              <>
                <div ref={boardRef}>
                  <Board setIsTyping={setIsTyping} />
                </div>
                <div ref={mySkillsRef}>
                  <MySkills />
                </div>
              </>
            )}
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};

export default App;
