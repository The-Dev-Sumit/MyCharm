import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
const SpotlightButton = ({ href, text, onClick }) => {
    const btnRef = useRef(null);
    const spanRef = useRef(null);
    useEffect(() => {
        const btn = btnRef.current;
        if (!btn)
            return; // Early return if btn is null
        const handleMouseMove = (e) => {
            const { width } = e.target.getBoundingClientRect();
            const offset = e.offsetX;
            const left = `${(offset / width) * 100}%`;
            if (spanRef.current) {
                spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
            }
        };
        const handleMouseLeave = () => {
            if (spanRef.current) {
                spanRef.current.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
            }
        };
        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            if (btn) {
                btn.removeEventListener("mousemove", handleMouseMove);
                btn.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);
    return (_jsxs(motion.a, { href: href, onClick: onClick, whileTap: { scale: 0.985 }, ref: btnRef, className: "relative w-full text-center max-w-xs overflow-hidden rounded-lg bg-slate-950 px-4 py-2 text-[1rem] font-medium text-white", children: [_jsx("span", { className: "pointer-events-none relative z-10 mix-blend-difference", children: text }), _jsx("span", { ref: spanRef, className: "pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100" })] }));
};
const ButtonWrapper = ({ href, text, onClick }) => {
    return (_jsx("div", { className: "w-[13rem] maamli flex justify-center mt-2", children: _jsx(SpotlightButton, { href: href, text: text, onClick: onClick }) }));
};
export default ButtonWrapper;
