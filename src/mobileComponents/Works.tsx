import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ButtonWrapper from "../components/ButtonWrapper";
import SparkleButton from "../components/SparkleButton";

interface WorkItem {
  type: "video" | "image" | "text";
  content: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  date?: string;
}

interface WorksProps {
  items: WorkItem[];
  className?: string;
}

const Works: React.FC<WorksProps> = ({ items }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const scrollContainer = scrollRef.current;

      const handleScroll = () => {
        const children = Array.from(scrollContainer.children);
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;

        let closest = children[0] as HTMLElement;
        let minDistance = Math.abs(closest.offsetLeft - scrollLeft);

        children.forEach((child) => {
          const childElement = child as HTMLElement;
          const distance = Math.abs(childElement.offsetLeft - scrollLeft);
          if (distance < minDistance) {
            minDistance = distance;
            closest = childElement;
          }
        });

        scrollContainer.scrollTo({
          left: closest.offsetLeft - (containerWidth - closest.offsetWidth) / 2,
          behavior: "smooth",
        });
      };

      scrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isMobile]);

  return (
    <div className="w-full select-none md:py-[0.5rem] py-[0.8rem] px-4">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl md:text-3xl md:py-2 lg:py-3 xl:py-4 tracking-wider text-center yatra-one-regular">
          My <span className="text-indigo-400">Works</span>
        </h2>

        {/* Mobile: Horizontal Scroll with Center Snap, Desktop: Grid */}
        <div
          ref={scrollRef}
          className={`${
            isMobile
              ? "flex overflow-x-auto transition-all duration-200 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden"
              : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          } px-4 py-2`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-none w-[90vw] md:w-full border-2 border-gray-500/60 p-2 md:hover:scale-105 h-[60vh] md:h-[65vh] cursor-pointer transition-all duration-300 rounded-lg overflow-hidden gap-1 relative flex flex-col snap-center`}>
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
                    light={true}
                    config={{
                      youtube: {
                        playerVars: {
                          origin: window.location.origin,
                          modestbranding: 1,
                          showinfo: 0,
                          rel: 0,
                          controls: 1,
                          iv_load_policy: 3,
                          fs: 1,
                        },
                      },
                    }}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
