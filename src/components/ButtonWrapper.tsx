import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface ButtonWrapperProps {
  href?: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

const SpotlightButton: React.FC<ButtonWrapperProps> = ({
  href,
  text,
  onClick,
}) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { width } = target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current?.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current?.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className="relative w-full text-center max-w-xs overflow-hidden rounded-lg bg-slate-950 px-4 py-2 text-[1rem] font-medium text-white">
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
      />
    </motion.a>
  );
};

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  href,
  text,
  onClick,
}) => {
  return (
    <div className="w-[13rem] maamli flex justify-center mt-2">
      <SpotlightButton href={href} text={text} onClick={onClick} />
    </div>
  );
};

export default ButtonWrapper;
