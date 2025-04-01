import React from "react";
import { skills, Skill } from "../data/skillsData";
import { motion } from "framer-motion";

const MySkills: React.FC = () => {
  // Group skills by category
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
    <section className="py-8 md:py-16 px-4 md:px-8 text-white" id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl poppins-medium-italic font-bold mb-8 text-center">
          My <span className="text-indigo-400">Skills</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(
            ([category, categorySkills]) => (
              <div
                key={category}
                className="rounded-xl p-6 border border-gray-700">
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
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default MySkills;
