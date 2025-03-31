// src/data/skillsData.ts
export type Skill = {
  name: string;
  level: number; // 1-10
  category: "frontend" | "backend" | "tools" | "design";
  icon?: string; 
};

export const skills: Skill[] = [
  { name: "HTML", level: 8, category: "frontend" },
  { name: "CSS", level: 6, category: "frontend" },
  { name: "JavaScript", level: 8, category: "frontend" },
  { name: "TypeScript", level: 7, category: "frontend" },
  { name: "React", level: 8, category: "frontend" },
  { name: "Next.js", level: 6, category: "frontend" },
  { name: "Tailwind CSS", level: 8, category: "frontend" },
  { name: "GSAP", level: 6, category: "frontend" },
  { name: "Framer Motion", level: 7, category: "frontend" },
  { name: "Node.js", level: 6, category: "backend" },
  { name: "C#", level: 5, category: "backend" },
  { name: "Java", level: 4, category: "backend" },
  { name: "Git", level: 7, category: "tools" },
  { name: "Figma", level: 5, category: "design" },
];
