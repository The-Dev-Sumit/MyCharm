import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { skills } from "../data/skillsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
// Register GSAP plugins (safe initialization)
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}
const MySkills = () => {
    const sectionRef = useRef(null);
    const skillsRef = useRef(null);
    useEffect(() => {
        // GSAP context for cleanup
        const ctx = gsap.context(() => {
            // Section animation
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
            // Skills animation
            gsap.from(".skill-item", {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef); // Scope for selectors
        return () => ctx.revert(); // Cleanup
    }, []);
    // Group skills by category with TypeScript type
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});
    return (_jsx("section", { ref: sectionRef, className: "py-8 md:py-16 px-4 md:px-8 text-white", id: "skills", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs(motion.h2, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-3xl md:text-5xl poppins-medium-italic font-bold mb-8 text-center", children: ["My ", _jsx("span", { className: "text-indigo-400", children: "Skills" })] }), _jsx("div", { ref: skillsRef, className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: Object.entries(skillsByCategory).map(([category, categorySkills]) => (_jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.5 }, className: " rounded-xl p-6  border border-gray-700", children: [_jsxs("h3", { className: "text-2xl font-semibold mb-4 capitalize eagle-lake-regular tracking-wide text-white", children: [category, " ", _jsx("span", { className: "text-indigo-400", children: "Skills" })] }), _jsx("div", { className: "space-y-4", children: categorySkills.map((skill) => (_jsxs("div", { className: "skill-item", children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "font-medium tracking-widest italic", children: skill.name }), _jsxs("span", { className: "text-gray-400", children: [skill.level, "/10"] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-2.5", children: _jsx(motion.div, { initial: { width: 0 }, whileInView: { width: `${skill.level * 10}%` }, viewport: { once: true }, transition: { duration: 1, delay: 0.3 }, className: "h-2.5 rounded-full bg-indigo-500" }) })] }, skill.name))) })] }, category))) })] }) }));
};
export default MySkills;
