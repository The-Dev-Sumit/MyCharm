import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
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
   const [currentIndex, setCurrentIndex] = useState(0);

  // Check if it's mobile on mount and resize
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     if (!isMobile) return;

     if (e.key === "ArrowLeft") {
       scrollToItem(currentIndex - 1);
     } else if (e.key === "ArrowRight") {
       scrollToItem(currentIndex + 1);
     }
   };

   window.addEventListener("keydown", handleKeyDown);
   return () => window.removeEventListener("keydown", handleKeyDown);
 }, [currentIndex, isMobile]);

 // Scroll to specific item
 const scrollToItem = useCallback(
   (index: number) => {
     if (!scrollRef.current) return;

     // Clamp index between 0 and items.length - 1
     const newIndex = Math.max(0, Math.min(index, items.length - 1));
     setCurrentIndex(newIndex);

     const container = scrollRef.current;
     const item = container.children[newIndex] as HTMLElement;
     if (!item) return;

     const containerWidth = container.clientWidth;
     const itemWidth = item.offsetWidth;
     const itemLeft = item.offsetLeft;
     const scrollPosition = itemLeft - (containerWidth - itemWidth) / 2;

     container.scrollTo({
       left: scrollPosition,
       behavior: "smooth",
     });
   },
   [items.length]
 );

 // Handle scroll events to update current index
 useEffect(() => {
   const container = scrollRef.current;
   if (!container || !isMobile) return;

   const handleScroll = () => {
     const containerWidth = container.clientWidth;
     const scrollPosition = container.scrollLeft + containerWidth / 2;

     for (let i = 0; i < container.children.length; i++) {
       const item = container.children[i] as HTMLElement;
       if (
         item.offsetLeft <= scrollPosition &&
         item.offsetLeft + item.offsetWidth > scrollPosition
       ) {
         setCurrentIndex(i);
         break;
       }
     }
   };

   container.addEventListener("scroll", handleScroll);
   return () => container.removeEventListener("scroll", handleScroll);
 }, [isMobile]);

  return (
    <div className="w-full select-none md:py-[0.5rem] py-[0.8rem] px-4">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl md:text-3xl md:py-2 lg:py-3 xl:py-4 tracking-wider text-center yatra-one-regular">
          My <span className="text-indigo-400">Works</span>
        </h2>

        {isMobile && items.length > 0 && (
          <>
            <button
              onClick={() => scrollToItem(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50  rounded-full p-2 text-white disabled:opacity-30">
              <FontAwesomeIcon
                icon={faCaretLeft}
                size={24}
                style={{ color: "#4923d1" }}
              />
            </button>
            <button
              onClick={() => scrollToItem(currentIndex + 1)}
              disabled={currentIndex === items.length - 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50  rounded-full p-2 text-white disabled:opacity-30">
              <FontAwesomeIcon
                icon={faCaretRight}
                style={{ color: "#4923d1" }}
              />
            </button>
          </>
        )}

        {/* Mobile: Normal Horizontal Scroll, Desktop: Grid */}
        <div
          ref={scrollRef}
          className={`${
            isMobile
              ? "flex overflow-x-auto px-4 transition-all duration-300 snap-x"
              : "grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-2"
          } `}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-none w-[85vw] md:w-full border-2 border-gray-500/60 p-2 md:hover:scale-105 h-[60vh] md:h-[65vh] cursor-pointer transition-all duration-300 rounded-lg overflow-hidden flex flex-col snap-align-start`}>
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
