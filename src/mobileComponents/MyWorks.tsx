import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ButtonWrapper from "../components/ButtonWrapper";
import SparkleButton from "../components/SparkleButton";

interface MyWorkItem {
  type: "video" | "image" | "text";
  thumbnail?: string;
  content?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  date?: string;
}

interface MyWorksProps {
  items: MyWorkItem[];
  className?: string;
}

const MyWorks: React.FC<MyWorksProps> = ({ items }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if it's mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Smooth scrolling behavior for mobile
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.offsetWidth;
        const nearestIndex = Math.round(scrollLeft / itemWidth);

        container.scrollTo({
          left: nearestIndex * itemWidth,
          behavior: "smooth",
        });
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobile]);

  return (
    <div className="w-full select-none md:py-[0.5rem] py-[0.8rem] px-4">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-white text-[2rem] lg:text-3xl xl:text-[2.6rem] md:text-3xl md:py-2 lg:py-3 xl:py-4 tracking-wider text-center yatra-one-regular">
          My <span className="text-indigo-400">Works</span>
        </h2>

        <div
          ref={scrollContainerRef}
          className={`${
            isMobile
              ? "flex overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide [&::-webkit-scrollbar]:hidden"
              : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-2"
          } px-4 py-2 w-full`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${
                isMobile ? "flex-none snap-center" : "flex"
              }  w-[85vw] md:w-full border-2 border-gray-500/60 p-2 md:hover:scale-105 py-7 cursor-pointer transition-all duration-300 rounded-lg overflow-hidden flex-col`}>
              {item.date && (
                <p className="text-white/90 text-sm w-full tracking-wide mb-2 flex justify-end font-aref pr-2">
                  {item.date}
                </p>
              )}
              <div className="w-full h-[25vh] md:h-[28vh] rounded-lg">
                {item.type === "video" && (
                  <ReactPlayer
                    url={item.content}
                    width="100%"
                    height="100%"
                    controls
                    playing={false}
                    light={item.thumbnail}
                  />
                )}
                {item.type === "image" && (
                  <img
                    src={item.content}
                    alt={item.title || "Project image"}
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === "text" && (
                  <div className="w-full h-full flex items-center justify-center text-center">
                    <p className="text-white text-center">{item.content}</p>
                  </div>
                )}
              </div>

              <div className="flex-1 w-full bg-black/50 backdrop-blur-sm tracking-wide flex flex-col justify-center items-center p-3">
                {item.title && (
                  <h3 className="text-white lemon text-[96%] text-center tracking-wide mb-1">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-white/80 w-[98%] text-sm mb-2 text-center karla-light">
                    {item.description}
                  </p>
                )}
                <div className="p-2">
                  {item.link &&
                    (isMobile ? (
                      <SparkleButton
                        href={item.link}
                        text={item.linkText || "View Project"}
                      />
                    ) : (
                      <ButtonWrapper
                        href={item.link}
                        text={item.linkText || "View Project"}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyWorks;
