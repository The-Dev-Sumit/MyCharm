import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/images/Logo.png";
import gsap from "gsap";
import ContactPopUp from "../components/ContactPopUp";
import ButtonWrapper from "../components/ButtonWrapper";
import SparkleButton from "../components/SparkleButton";

interface AboutMeProps {
  isMobile: boolean;
}
const AboutMe: React.FC<AboutMeProps> = ({ isMobile }) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      // Split text into spans
      const text = nameRef.current.textContent || "";
      nameRef.current.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span style="margin: 0 0.3em;">&nbsp;</span>`
            : `<span style="display: inline-block;">${char}</span>`
        )
        .join("");

      // Animate each letter
      gsap.from(nameRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <section className="h-[110vh] md:h-[93vh] flex items-center md:py-[.5rem] py-[.9rem] px-4">
      {showContact && <ContactPopUp onClose={() => setShowContact(false)} />}

      <div className="w-full mx-auto flex flex-col bg-black/70 md:flex-row items-center z-40 gap-4">
        {/* Left Side - Image and Name */}
        <div className="flex flex-col gap-3 items-center md:w-[40vw]">
          <div className="w-[8rem] h-[8rem] md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-500">
            <img
              src={Logo}
              alt="My Image"
              className="w-full h-full object-cover"
            />
          </div>
          <h2
            ref={nameRef}
            className="text-white text-3xl md:text-4xl cookie font-bold mt-4 tracking-widest">
            Sumit Sonar
          </h2>
          {isMobile ? (
            <SparkleButton
              onClick={() => setShowContact(true)}
              text={"Contact Me"}
            />
          ) : (
            <ButtonWrapper
              onClick={() => setShowContact(true)}
              text={"Contact Me"}
            />
          )}
        </div>
        <br />
        {/* Right Side - Description */}
        <div className="text-center md:mb-4 w-[80vw] md:w-[48vw] lg:w-[45vw]">
          <h3 className="text-gray-200 text-[1.4rem] xl:text-[2rem] xl:py-4 md:text-[2rem] bebas-neue-regular tracking-widest ">
            <span className="text-indigo-400">About</span> Me
          </h3>
          <p className="text-gray-300 text-[.8rem] md:text-[.9rem] xl:text-[1rem] leading-relaxed karla-light">
            Hi, I'm Sumit Sonar! a passionate learner. So far, I have built two
            websites, a basic snake game, and a beginner-friendly offline code
            editor desktop app. I aspire to create games in the future.
          </p>
          <br />
          <p className="text-gray-300 text-[.8rem] xl:text-[1rem]  md:text-[.9rem] leading-relaxed karla-light">
            I am a problem-solver who can find innovative solutions to complex
            problems. I am reliable and committed, I never go back on my words
            and promises.
          </p>
          <br />
          <p className="text-gray-300 text-[.8rem] xl:text-[1rem]  md:text-[.9rem] leading-relaxed karla-light">
            I am a fast learner who quickly adapts to new concepts and
            challenges. I am dedicated and consistent, staying focused on my
            work until it is completed with excellence.
          </p>
          <br />
          <p className="text-gray-300 text-[.8rem] xl:text-[1rem]  md:text-[.9rem] leading-relaxed karla-light">
            I prioritize gaining in-depth knowledge in all areas of learning,
            enabling me to approach tasks and challenges with expertise and
            confidence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
