import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCode,
  faServer,
  faTools,
  faLightbulb,
  faCubes,
  faCompassDrafting,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import * as echarts from "echarts";
import CursorParticles from "../components/CursorParticles";
import Logo from "../assets/images/Logo.png";

const swiperStyles = `
.skill-swiper {
padding: 20px 10px 40px !important;
}
.skill-swiper .swiper-pagination-bullet {
width: 10px;
height: 10px;
background: #6366f1;
opacity: 0.5;
}
.skill-swiper .swiper-pagination-bullet-active {
opacity: 1;
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = swiperStyles;
document.head.appendChild(styleSheet);


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

const AboutMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 
  const cardRef = useRef(null);
    const textRefs = useRef([]);
  const { textElements, registerTextElement, unregisterTextElement } =
    useTextElements();

  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(load);
  }, []); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const chartDom = document.getElementById("skillsChart");
    if (!chartDom) return; 

    const skillsChart = echarts.init(chartDom);
    const option = {
      animation: false,
      radar: {
        indicator: [
          { name: "Frontend", max: 100 },
          { name: "Backend", max: 100 },
          { name: "UI/UX", max: 100 },
          { name: "Management", max: 100 },
        ],
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [95, 60, 90, 75],
              name: "Skills",
              areaStyle: { color: "rgba(99, 102, 241, 0.2)" },
              lineStyle: { color: "rgb(99, 102, 241)" },
            },
          ],
        },
      ],
    };
    skillsChart.setOption(option);

    // Cleanup to avoid memory leaks
    return () => {
      skillsChart.dispose();
    };
  }, [isLoading]); 

  useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 639px)");
      setIsMobile(mediaQuery.matches);
  
      const handleResize = () => setIsMobile(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleResize);
  
      return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);
  
  const registerText = (element) => registerTextElement(element);
  const unregisterText = (element) => unregisterTextElement(element);
  
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
        textElement.style.zIndex = "99"; 
        textElement.style.fontWeight = "bold";
      } else {
        textElement.style.color = ""; // Reset to original color
        textElement.style.zIndex = ""; // Revert to default z-index
        textElement.style.fontWeight = "";
      }
    };

  return (
    <>
      {isMobile ? (
        isLoading ? (
          <div className="animate-pulse">
            {/* Navbar Skeleton */}
            <div className="h-16 w-full bg-gray-300"></div>

            {/* Profile Section Skeleton */}
            <div className="w-full mx-auto px-4 pt-20">
              <section className="py-20">
                <div className="flex flex-col items-center gap-12">
                  {/* Profile Image Skeleton */}
                  <div className="w-64 h-64 rounded-full bg-gray-300 shadow-lg"></div>

                  {/* Name Skeleton */}
                  <div className="h-6 w-48 bg-gray-300 rounded"></div>

                  {/* "Who Am I?" Heading Skeleton */}
                  <div className="h-8 w-40 bg-gray-300 rounded mt-8"></div>

                  {/* Description Skeleton */}
                  <div className="flex flex-col gap-4 w-3/4">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/6 bg-gray-300 rounded"></div>
                  </div>

                  {/* Dark Mode Button Skeleton */}
                  <div className="h-10 w-40 bg-gray-300 rounded mt-4"></div>
                </div>
              </section>

              {/* Skills Section Skeleton */}
              <section className="py-20">
                <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-12"></div>

                <div className="w-full max-h-screen">
                  {/* Radar Chart Skeleton */}
                  <div className="w-[91%] h-[220px] bg-gray-300 mx-auto"></div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div>
            <div
              className={`${
                darkMode ? "bg-gray-900" : "bg-gray-50"
              } transition-colors duration-300`}>
              <div
                className={`h-[6rem] w-full flex justify-center items-center`}>
                <div
                  className={`fixed top-0 left-0 right-0 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-md z-50 py-7 transition-colors duration-300`}>
                  <h2
                    className={`about1 text-2xl font-Roboto font-bold ml-[10rem] ${
                      darkMode ? "text-white" : "text-black"
                    }`}>
                    About Me
                  </h2>
                  <div className="max-w-full mx-auto px-4 flex justify-center">
                    <div className="flex justify-between items-center h-16">
                      <div className="flex space-x-8">
                        {["intro", "skills", "education", "strengths"].map(
                          (section) => (
                            <button
                              key={section}
                              onClick={() => scrollToSection(section)}
                              className={`cursor-pointer whitespace-nowrap px-3 py-2 text-sm font-medium capitalize ${
                                activeSection === section
                                  ? `text-indigo-600 border-b-2 border-indigo-600 ${
                                      darkMode ? "text-indigo-400" : ""
                                    }`
                                  : `${
                                      darkMode
                                        ? "text-gray-300 hover:text-gray-100"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`
                              }`}>
                              {section}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto px-4 pt-20">
                <section id="intro" className="py-20">
                  <div className="flex flex-col items-center justify-between gap-12">
                    <div className="w-full intro3 pr-12">
                      <img
                        src=""
                        alt="Profile"
                        className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
                      />
                      <h1
                        className={`text-4xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        } mt-8 text-center transition-colors duration-300`}>
                        Sumit Sonar
                      </h1>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-5 mt-[-2rem]">
                      <h3
                        className={`text-4xl font-bold ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}>
                        Who Am I?
                      </h3>
                      <div className="prose prose-lg">
                        <p
                          className={`leading-relaxed transition-colors duration-300 text-center ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                          I am Sumit Sonar, Currently I am studying BCA in
                          Manipal University Jaipur.
                          <br />
                          <br />
                          I am passionate about learning new things and I am
                          always eager to take on new challenges. I am a quick
                          learner and I am always looking for ways to improve my
                          skills.
                          <br />
                          <br />I have been working in a Government
                          Administration office in my village for the past two
                          years. However, I don't want to continue this job
                          because I want to work in a field where I can
                          constantly learn something new.
                        </p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`mt-4 px-4 py-2 rounded-full transition-colors duration-300  ${
                          darkMode
                            ? "bg-gray-700 text-yellow-300"
                            : "bg-gray-200 text-gray-700"
                        }`}>
                        <FontAwesomeIcon
                          icon={darkMode ? faSun : faMoon}
                          className="mr-2"
                        />
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                    </div>
                  </div>
                </section>
                {/* Skills Section */}
                <section
                  id="skills"
                  className={`py-18 transition-colors duration-300 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}>
                  <h2
                    className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    {" "}
                    Technical Skills
                  </h2>
                  <div className="w-full max-h-screen">
                    {/* Radar Chart */}
                    <div
                      id="skillsChart"
                      style={{ width: "91%", height: "220px" }}></div>

                    {/* Skills Swiper */}
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      spaceBetween={20}
                      breakpoints={{
                        320: { slidesPerView: 1 }, // 1 Slide on Mobile
                        640: { slidesPerView: 2 }, // 2 Slides on Tablets
                        1024: { slidesPerView: 3 }, // 3 Slides on Desktop
                      }}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                      className="skill-swiper">
                      {[
                        {
                          category: "Frontend Development",
                          icon: faCode,
                          color: "from-blue-400 to-blue-600",
                          skills: [
                            { name: "HTML5", level: 95 },
                            { name: "CSS3", level: 72 },
                            { name: "JavaScript", level: 67 },
                            { name: "React", level: 68 },
                            { name: "GSAP", level: 55 },
                          ],
                        },
                        {
                          category: "Backend Development",
                          icon: faServer,
                          color: "from-green-400 to-green-600",
                          skills: [
                            { name: "Java", level: 32 },
                            { name: "Python", level: 61 },
                            { name: "C#", level: 82 },
                            { name: "Node.js", level: 66 },
                          ],
                        },
                        {
                          category: "Other Skills",
                          icon: faLightbulb,
                          color: "from-yellow-400 to-yellow-600",
                          skills: [
                            { name: "Ms Word", level: 80 },
                            { name: "Trouble Shooting", level: 65 },
                            { name: "TDD", level: 88 },
                            { name: "Performance Optimization", level: 52 },
                          ],
                        },
                      ].map((category, index) => (
                        <SwiperSlide key={index} className="p-2">
                          <div
                            className={`h-full p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                              darkMode ? "bg-gray-700" : "bg-white"
                            } shadow-lg`}>
                            {/* Icon */}
                            <div
                              className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                              <FontAwesomeIcon
                                icon={category.icon}
                                className="text-2xl text-white"
                              />
                            </div>

                            {/* Category Title */}
                            <h3
                              className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}>
                              {category.category}
                            </h3>

                            {/* Skills List */}
                            <div className="space-y-4">
                              {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="relative">
                                  <div className="flex justify-between mb-1">
                                    <span
                                      className={`text-sm font-medium ${
                                        darkMode
                                          ? "text-gray-300"
                                          : "text-gray-700"
                                      }`}>
                                      {skill.name}
                                    </span>
                                    <span
                                      className={`text-sm font-medium ${
                                        darkMode
                                          ? "text-gray-300"
                                          : "text-gray-700"
                                      }`}>
                                      {skill.level}%
                                    </span>
                                  </div>
                                  <div
                                    className={`w-full h-3 rounded-full ${
                                      darkMode ? "bg-gray-600" : "bg-gray-100"
                                    } overflow-hidden`}>
                                    <div
                                      className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-500 ease-out`}
                                      style={{
                                        width: `${skill.level}%`,
                                      }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </section>
                {/* Education Section */}
                <section id="education" className="py-20 ">
                  <h2
                    className={`text-3xl font-bold mb-12 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    Educational Background
                  </h2>
                  <div className="space-y-12">
                    {[
                      {
                        institution: "Manipal University Jaipur",
                        degree: "BCA (Bachelor of Computer Applications)",
                        years: "2023 - Present",
                      },
                    ].map((edu, index) => (
                      <div
                        key={index}
                        className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        }`}>
                        <div className="flex items-start">
                          <div className="flex-grow">
                            <h3
                              className={`text-xl font-semibold transition-colors duration-300 ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}>
                              {edu.institution}
                            </h3>
                            <p
                              className={`font-medium mt-1 transition-colors duration-300 ${
                                darkMode ? "text-indigo-400" : "text-indigo-600"
                              }`}>
                              {edu.degree}
                            </p>
                            <p
                              className={`mt-1 transition-colors duration-300 ${
                                darkMode ? "text-gray-400" : "text-gray-500"
                              }`}>
                              {edu.years}
                            </p>
                            <p
                              className={`mt-4 transition-colors duration-300 ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}>
                              {edu.achievements}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                {/* Strengths Section */}
                <section
                  id="strengths"
                  className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <h2
                    className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    My Strengths
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                    {[
                      {
                        title: "Problem Solving",
                        description:
                          "I am a problem-solver who can find innovative solutions to complex problems. I am reliable and committed, I never go back on my words and promises.",
                        icon: faLightbulb,
                        color: "from-purple-400 to-purple-600",
                      },
                      {
                        title: "Fast Learner",
                        description:
                          "I am a fast learner who quickly adapts to new concepts and challenges. I am dedicated and consistent, staying focused on my work until it is completed with excellence.",
                        icon: faCompassDrafting,
                        color: "from-blue-400 to-blue-600",
                      },
                      {
                        title: "Design",
                        description:
                          "I am a skilled designer with experience in creating high-quality logos. I have designed logos both for clients and for my own projects, delivering visually appealing and impactful designs.",
                        icon: faCubes,
                        color: "from-green-400 to-green-600",
                      },
                      {
                        title: "Technical Innovation",
                        description:
                          "I prioritize gaining in-depth knowledge in all areas of learning, enabling me to approach tasks and challenges with expertise and confidence.",
                        icon: faRocket,
                        color: "from-red-400 to-red-600",
                      },
                      {
                        title: "Code Quality",
                        description:
                          "Advocate for clean code practices and test-driven development. Implemented code review processes that reduced production bugs by 60%.",
                        icon: faCode,
                        color: "from-indigo-400 to-indigo-600",
                      },
                    ].map((strength, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          darkMode ? "bg-gray-700" : "bg-gray-50"
                        } hover:shadow-xl`}>
                        {/* Icon Box */}
                        <div
                          className={`w-14 h-14 mb-6 rounded-full bg-gradient-to-r ${strength.color} flex items-center justify-center`}>
                          <FontAwesomeIcon
                            icon={strength.icon}
                            className="text-2xl text-white"
                          />
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          {strength.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`transition-colors duration-300 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          } leading-relaxed`}>
                          {strength.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )
      ) : isLoading ? (
        <div className="animate-pulse">
          {/* Navbar Skeleton */}
          <div className="h-16 w-full bg-gray-300"></div>

          {/* Page Container */}
          <div className="max-w-7xl mx-auto px-4 pt-20">
            <section className="py-20">
              <div className="flex items-center justify-between">
                {/* Left Section - Text Content */}
                <div className="w-1/2 flex flex-col justify-center items-center gap-5">
                  {/* Who Am I? Heading Skeleton */}
                  <div className="h-8 w-40 bg-gray-300 rounded"></div>

                  {/* Description Skeleton */}
                  <div className="flex flex-col gap-4 w-3/4">
                    <div className="h-4 w-full bg-gray-300 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
                    <div className="h-4 w-3/6 bg-gray-300 rounded"></div>
                  </div>

                  {/* Dark Mode Toggle Button Skeleton */}
                  <div className="h-10 w-40 bg-gray-300 rounded mt-4"></div>
                </div>

                {/* Right Section - Profile Image */}
                <div className="w-1/2 pr-12">
                  <div className="w-64 h-64 rounded-full bg-gray-300 mx-auto shadow-lg"></div>

                  {/* Name Skeleton */}
                  <div className="h-6 w-48 bg-gray-300 rounded mx-auto mt-8"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div
          className={` ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          } transition-colors duration-300`}>
          <div className={`h-[6rem] w-full flex justify-center items-center`}>
            <CursorParticles
              textElements={textElements}
              screenWidth={window.innerWidth}
            />
            <div
              className={`fixed top-0 left-0 right-0 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-md z-30 py-7 transition-colors duration-300`}>
              <h2
                className={`about1 text-2xl font-Roboto font-bold ml-[43rem] ${
                  darkMode ? "text-white" : "text-black"
                }`}>
                About Me
              </h2>
              <div className="max-w-7xl mx-auto px-4 flex justify-center">
                <div className="flex justify-between items-center h-16">
                  <div className="flex space-x-8">
                    {["intro", "skills", "education", "strengths"].map(
                      (section) => (
                        <button
                          key={section}
                          onClick={() => scrollToSection(section)}
                          className={`cursor-pointer whitespace-nowrap px-3 py-2 text-sm font-medium capitalize ${
                            activeSection === section
                              ? `text-indigo-300 border-b-2 border-indigo-600 ${
                                  darkMode ? "text-indigo-400" : ""
                                }`
                              : `${
                                  darkMode
                                    ? "text-gray-300 hover:text-gray-100"
                                    : "text-gray-500 hover:text-gray-700"
                                }`
                          }`}>
                          {section}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 pt-20">
            <section id="intro" className="py-20">
              <div className="flex items-center intro2 justify-between">
                <div className="w-1/2 flex flex-col intro4 justify-center items-center gap-5 mt-[-2rem]">
                  <h3
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
                    className={`text-4xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    Who Am I?
                  </h3>
                  <div className="prose prose-lg">
                    <p
                      className={`leading-relaxed transition-colors duration-300 text-center ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      I am Sumit Sonar, Currently I am studying BCA in Manipal
                      University Jaipur.
                      <br />
                      <br />
                      I am passionate about learning new things and I am always
                      eager to take on new challenges. I am a quick learner and
                      I am always looking for ways to improve my skills.
                      <br />
                      <br />I have been working in a Government Administration
                      office in my village for the past two years. However, I
                      don't want to continue this job because I want to work in
                      a field where I can constantly learn something new.
                    </p>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`mt-4 px-4 py-2 rounded-full transition-colors duration-300  ${
                      darkMode
                        ? "bg-gray-700 text-yellow-300"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                    <FontAwesomeIcon
                      icon={darkMode ? faSun : faMoon}
                      className="mr-2"
                    />
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                </div>
                <div className="w-1/2 intro3 pr-12">
                  <img
                    src={Logo}
                    alt="Profile"
                    className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
                  />
                  <h1
                    className={`text-4xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mt-8 text-center transition-colors duration-300`}>
                    Sumit Sonar
                  </h1>
                </div>
              </div>
            </section>
            {/* Skills Section */}
            <section
              id="skills"
              className={`py-20 intro5 transition-colors duration-300 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}>
              <h2
                className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                Technical Skills
              </h2>
              <div className="max-w-6xl skills1 mx-auto">
                <div
                  id="skillsChart"
                  style={{ width: "100%", height: "400px" }}></div>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  className="skill-swiper">
                  {[
                    {
                      category: "Frontend Development",
                      icon: faCode,
                      color: "from-blue-400 to-blue-600",
                      skills: [
                        { name: "HTML5", level: 95 },
                        { name: "CSS3", level: 72 },
                        { name: "JavaScript", level: 67 },
                        { name: "React", level: 68 },
                        { name: "GSAP", level: 55 },
                      ],
                    },
                    {
                      category: "Backend Development",
                      icon: faServer,
                      color: "from-green-400 to-green-600",
                      skills: [
                        { name: "Java", level: 32 },
                        { name: "Python", level: 61 },
                        { name: "C#", level: 82 },
                        { name: "Node.js", level: 66 },
                      ],
                    },
                    {
                      category: "Other Skills",
                      icon: faLightbulb,
                      color: "from-yellow-400 to-yellow-600",
                      skills: [
                        { name: "Ms Word", level: 80 },
                        { name: "Trouble Shooting", level: 65 },
                        { name: "TDD", level: 88 },
                        { name: "Performance Optimization", level: 52 },
                      ],
                    },
                  ].map((category, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={`h-full p-8 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          darkMode ? "bg-gray-700" : "bg-white"
                        } shadow-lg`}>
                        <div
                          className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                          <FontAwesomeIcon
                            icon={category.icon}
                            className="text-2xl text-white"
                          />
                        </div>
                        <h3
                          className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          {category.category}
                        </h3>
                        <div className="space-y-6">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="relative">
                              <div className="flex justify-between mb-2">
                                <span
                                  className={`text-sm font-medium transition-colors duration-300 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}>
                                  {skill.name}
                                </span>
                                <span
                                  className={`text-sm font-medium transition-colors duration-300 ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}>
                                  {skill.level}%
                                </span>
                              </div>
                              <div
                                className={`w-full h-3 rounded-full ${
                                  darkMode ? "bg-gray-600" : "bg-gray-100"
                                } overflow-hidden`}>
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-500 ease-out`}
                                  style={{
                                    width: `${skill.level}%`,
                                    boxShadow: `0 0 10px rgba(${
                                      darkMode ? "255,255,255,0.2" : "0,0,0,0.1"
                                    })`,
                                  }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
            {/* Education Section */}
            <section
              id="education"
              className="py-20 flex flex-col justify-center items-center">
              <h2
                className={`text-3xl font-bold mb-12 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                Educational Background
              </h2>
              <div className="space-y-12">
                {[
                  {
                    institution: "Manipal University Jaipur",
                    degree: "BCA (Bachelor of Computer Applications)",
                    years: "2023 - Present",
                  },
                ].map((edu, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}>
                    <div className="flex items-start">
                      <div className="flex-grow">
                        <h3
                          className={`text-xl font-semibold transition-colors duration-300 ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                          {edu.institution}
                        </h3>
                        <p
                          className={`font-medium mt-1 transition-colors duration-300 ${
                            darkMode ? "text-indigo-400" : "text-indigo-600"
                          }`}>
                          {edu.degree}
                        </p>
                        <p
                          className={`mt-1 transition-colors duration-300 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                          {edu.years}
                        </p>
                        <p
                          className={`mt-4 transition-colors duration-300 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                          {edu.achievements}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Strengths Section */}
            <section
              id="strengths"
              className={`py-20 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2
                className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                My Strengths
              </h2>
              <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    title: "Problem Solving",
                    description:
                      "I am a problem-solver who can find innovative solutions to complex problems.I am reliable and committed, I never go back on my words and promises.",
                    icon: faLightbulb,
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    title: "Fast Learner",
                    description:
                      "I am a fast learner who quickly adapts to new concepts and challenges. I am dedicated and consistent, staying focused on my work until it is completed with excellence.",
                    icon: faCompassDrafting,
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    title: "Design",
                    description:
                      "I am a skilled designer with experience in creating high-quality logos. I have designed logos both for clients and for my own projects, delivering visually appealing and impactful designs.",
                    icon: faCubes,
                    color: "from-green-400 to-green-600",
                  },
                  {
                    title: "Technical Innovation",
                    description:
                      "I prioritize gaining in-depth knowledge in all areas of learning, enabling me to approach tasks and challenges with expertise and confidence.",
                    icon: faRocket,
                    color: "from-red-400 to-red-600",
                  },
                  {
                    title: "Code Quality",
                    description:
                      "Advocate for clean code practices and test-driven development. Implemented code review processes that reduced production bugs by 60%.",
                    icon: faCode,
                    color: "from-indigo-400 to-indigo-600",
                  },
                ].map((strength, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } hover:shadow-xl`}>
                    <div
                      className={`w-14 h-14 mb-6 rounded-full bg-gradient-to-r ${strength.color} flex items-center justify-center`}>
                      <FontAwesomeIcon
                        icon={strength.icon}
                        className="text-2xl text-white"
                      />
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}>
                      {strength.title}
                    </h3>
                    <p
                      className={`transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } leading-relaxed`}>
                      {strength.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutMe;
