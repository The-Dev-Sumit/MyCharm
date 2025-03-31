import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Board from "./mobileComponents/Board";
import HeadBody from "./mobileComponents/HeadBody";
import AboutMe from "./mobileComponents/AboutMe";
import Works from "./mobileComponents/Works";
import FourthProject from "./assets/images/Screenshot.png";
import MySkills from "./mobileComponents/MySkills";
import CursorParticles from "./components/CursorParticles";
import ErrorBoundary from "./components/ErrorBoundary";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const FirstProject = "https://www.youtube.com/watch?v=epoW9eXuYbk";
const SecondProject = "https://www.youtube.com/embed/iwlj7uSlyOk?si=KvwoPD98MOSxS77m";
const ThirdProject = "https://www.youtube.com/embed/E6YPc_Jb1qs?si=U3FVhXju0UAexXRg";
const App = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const aboutMeRef = useRef(null);
    const worksRef = useRef(null);
    const boardRef = useRef(null);
    const mySkillsRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const projects = [
        {
            type: "video",
            content: FirstProject,
            title: "My First Frontend Website",
            description: "This is my first frontend website, it is build in html and css and little bit of javascript. This is my first ever project to learn things, from here my journey started.",
            link: undefined,
            linkText: undefined,
            date: "Date: 12-10-2023",
        },
        {
            type: "video",
            content: SecondProject,
            title: "My Second Fullstack Website",
            description: "This is my second fullstack website, using html, css and javascript with database and backend, this project i made before our exams, a basic test portal type project, which my friends used. I know it is childish but I fun with whatever i do.",
            link: undefined,
            linkText: undefined,
            date: "Date: 28-01-2024",
        },
        {
            type: "video",
            content: ThirdProject,
            title: " My Third Project: Snake Game",
            description: " This is my third project and first game using java language for the first time, this is a basic Snake Game, i wanted to try something new.",
            link: undefined,
            linkText: undefined,
            date: "Date: 03-02-2024",
        },
        {
            type: "image",
            content: FourthProject,
            title: "My First Desktop App: CodeSnap",
            description: "This is my first ever Desktop App, using Javascript and the name is CodeSnap. A simple and easy to use code editor were you can write 4 languages like - c, c++, js, python. And this is an offline code editor.",
            link: "https://github.com/The-Dev-Sumit/CodeSnapApp/releases/download/MyApp/CodeSnap-1-v-win-x64.7z",
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
        if (isLoading || hasError || isTyping)
            return;
        const components = [
            aboutMeRef.current,
            worksRef.current,
            boardRef.current,
            mySkillsRef.current,
        ].filter(Boolean); // Remove null refs
        components.forEach((component) => {
            gsap.fromTo(component, { opacity: 0, y: 50 }, // Invisible state
            {
                opacity: 1,
                y: 0, // Visible state
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: component,
                    start: "top 60%", // Start animation when top of component is 80% in viewport
                    end: "bottom 50%", // End when bottom is 20% out of viewport
                    toggleActions: "play none none reverse", // Play on enter, reverse on leave
                    // markers: true, // Uncomment for debugging
                },
            });
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
    return (_jsx(_Fragment, { children: isLoading ? (_jsx("div", { className: "flex-col gap-4 w-full h-screen flex items-center justify-center bg-blue-950/80", children: _jsxs("svg", { viewBox: "0 0 240 240", height: "240", width: "240", className: "pl", children: [_jsx("circle", { strokeLinecap: "round", strokeDashoffset: "-330", strokeDasharray: "0 660", strokeWidth: "20", stroke: "#000", fill: "none", r: "105", cy: "120", cx: "120", className: "pl__ring pl__ring--a" }), _jsx("circle", { strokeLinecap: "round", strokeDashoffset: "-110", strokeDasharray: "0 220", strokeWidth: "20", stroke: "#000", fill: "none", r: "35", cy: "120", cx: "120", className: "pl__ring pl__ring--b" }), _jsx("circle", { strokeLinecap: "round", strokeDasharray: "0 440", strokeWidth: "20", stroke: "#000", fill: "none", r: "70", cy: "120", cx: "85", className: "pl__ring pl__ring--c" }), _jsx("circle", { strokeLinecap: "round", strokeDasharray: "0 440", strokeWidth: "20", stroke: "#000", fill: "none", r: "70", cy: "120", cx: "155", className: "pl__ring pl__ring--d" })] }) })) : (_jsx(ErrorBoundary, { onError: setHasError, children: _jsxs("div", { className: "w-full min-h-screen bg-black relative overflow-hidden", children: [!isMobile && !hasError && (_jsx(CursorParticles, { screenWidth: window.innerWidth, hasError: hasError })), _jsx("div", { children: _jsx(HeadBody, {}) }), _jsx("div", { ref: aboutMeRef, children: _jsx(AboutMe, { isMobile: isMobile }) }), _jsx("div", { ref: worksRef, children: _jsx(Works, { items: projects }) }), _jsx("div", { ref: boardRef, children: _jsx(Board, { setIsTyping: setIsTyping }) }), _jsx("div", { ref: mySkillsRef, children: _jsx(MySkills, {}) })] }) })) }));
};
export default App;
