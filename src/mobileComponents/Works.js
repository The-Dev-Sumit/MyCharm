import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ButtonWrapper from "../components/ButtonWrapper";
import SparkleButton from "../components/SparkleButton";
const Works = ({ items }) => {
    const [isMobile, setIsMobile] = useState(false);
    const scrollRef = useRef(null);
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
                let closest = children[0];
                let minDistance = Math.abs(closest.offsetLeft - scrollLeft);
                children.forEach((child) => {
                    const childElement = child;
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
    return (_jsx("div", { className: "w-full select-none md:py-[0.5rem] py-[0.8rem] px-4", children: _jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [_jsxs("h2", { className: "text-white text-2xl lg:text-3xl xl:text-4xl md:text-3xl md:py-2 lg:py-3 xl:py-4 tracking-wider text-center yatra-one-regular", children: ["My ", _jsx("span", { className: "text-indigo-400", children: "Works" })] }), _jsx("div", { ref: scrollRef, className: `${isMobile
                        ? "flex overflow-x-auto transition-all duration-200 snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden"
                        : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"} px-4 py-2`, children: items.map((item, index) => (_jsxs("div", { className: `flex-none w-[90vw] md:w-full border-2 border-gray-500/60 p-2 md:hover:scale-105 h-[60vh] md:h-[65vh] cursor-pointer transition-all duration-300 rounded-lg overflow-hidden gap-1 relative flex flex-col snap-center`, children: [item.date && (_jsx("p", { className: "text-white/90 text-sm w-full tracking-wide mb-2 flex justify-end font-aref pr-2", children: item.date })), _jsxs("div", { className: "w-full h-[25vh] md:h-[28vh] rounded-lg", children: [item.type === "video" && (_jsx(ReactPlayer, { url: item.content, width: "100%", height: "100%", controls: true, playing: false, light: true, config: {
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
                                        } })), item.type === "image" && (_jsx("img", { src: item.content, alt: item.title || "Project image", className: "w-full h-full object-cover" })), item.type === "text" && (_jsx("div", { className: "w-full h-full flex items-center justify-center text-center", children: _jsx("p", { className: "text-white text-center", children: item.content }) }))] }), _jsxs("div", { className: "flex-1 w-full bg-black/50 backdrop-blur-sm tracking-wide flex flex-col justify-center items-center p-3", children: [item.title && (_jsx("h3", { className: "text-white lemon text-[96%] text-center tracking-wide mb-1", children: item.title })), item.description && (_jsx("p", { className: "text-white/80 w-[98%] text-sm mb-2 text-center karla-light", children: item.description })), item.link &&
                                        (isMobile ? (_jsx(SparkleButton, { href: item.link, text: item.linkText || "View Project" })) : (_jsx(ButtonWrapper, { href: item.link, text: item.linkText || "View Project" })))] })] }, index))) })] }) }));
};
export default Works;
