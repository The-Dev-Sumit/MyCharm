export type Skill = {
    name: string;
    level: number;
    category: "frontend" | "backend" | "tools" | "design";
    icon?: string;
};
export declare const skills: Skill[];
