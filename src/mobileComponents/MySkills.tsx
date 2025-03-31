import React, { useEffect, useRef } from "react";
import { skills, Skill } from "../data/skillsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Register GSAP plugins (safe initialization)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MySkills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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
  const skillsByCategory: Record<string, Skill[]> = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section
      ref={sectionRef}
      className="py-8 md:py-16 px-4 md:px-8 text-white"
      id="skills">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl poppins-medium-italic font-bold mb-8 text-center">
          My <span className="text-indigo-400">Skills</span>
        </motion.h2>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(
            ([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }} // Animation only once
                transition={{ duration: 0.5 }}
                className=" rounded-xl p-6  border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4 capitalize eagle-lake-regular tracking-wide text-white">
                  {category} <span className="text-indigo-400">Skills</span>
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium tracking-widest italic">
                          {skill.name}
                        </span>
                        <span className="text-gray-400">{skill.level}/10</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level * 10}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-2.5 rounded-full bg-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MySkills;