import React, { useState } from "react";

interface ButtonProps {
  href: string;
  text: string;
  className?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  href,
  text,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        w-[15rem] h-9
        text-[0.8rem]
        rounded-sm
        md:w-56 md:h-12
        overflow-hidden
        border border-current
        text-gray-900
        dark:text-white
        font-bold
        uppercase
        tracking-wide
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <span className="relative z-10 px-4">{text}</span>

      {/* Top triangle */}
      <div
        className={`
        absolute
        top-0 left-0
        w-full h-0
        border-b-[48px] md:border-b-[56px] border-l-[75px] md:border-l-[87px]
        border-b-blue-700 border-l-transparent
        transition-all duration-500 ease-in-out
        ${isHovered ? "-translate-x-[30%]" : "-translate-x-full"}
      `}
      />

      {/* Bottom triangle */}
      <div
        className={`
        absolute
        bottom-0 right-0
        w-full h-0
        border-t-[48px] md:border-t-[56px] border-r-[75px] md:border-r-[87px]
        border-t-blue-700 border-r-transparent
        transition-all duration-500 ease-in-out
        ${isHovered ? "translate-x-[30%]" : "translate-x-full"}
      `}
      />
    </a>
  );
};

export default Button;
