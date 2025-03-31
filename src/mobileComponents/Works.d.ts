import React from "react";
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
declare const Works: React.FC<WorksProps>;
export default Works;
