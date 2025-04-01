import { motion } from "framer-motion";
import { useState } from "react";

interface Sparkle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  opacity: number;
  rotate: number;
}

interface SparkleButtonProps {
  href?: string;
  text: string;
  onClick?: () => void;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({
  href,
  text,
  onClick,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleClick = () => {
    const newSparkles: Sparkle[] = Array(12)
      .fill(null)
      .map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;

        return {
          id: i,
          startX: Math.cos(angle) * 20,
          startY: Math.sin(angle) * 20,
          endX: Math.cos(angle) * distance,
          endY: Math.sin(angle) * distance,
          size: Math.random() * 6 + 4,
          opacity: 1,
          rotate: Math.random() * 360,
        };
      });

    setSparkles(newSparkles);
    onClick?.();

    setTimeout(() => {
      setSparkles([]);
    }, 800);
  };

  return (
    <div onClick={handleClick} className="relative inline-block mt-5">
      <motion.a
        href={href}
        whileTap={{ scale: 0.92 }}
        className="relative z-10 overflow-visible hover:bg-gray-950 bg-transparent text-white font-medium py-3 px-5 rounded-lg shadow-lg transition-all duration-300">
        <span className="relative z-20">{text}</span>
      </motion.a>

      <div className="absolute inset-0 pointer-events-none z-0">
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            initial={{
              x: sparkle.startX,
              y: sparkle.startY,
              opacity: 0,
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              x: sparkle.endX,
              y: sparkle.endY,
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0],
              rotate: sparkle.rotate,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="absolute block rounded-full bg-white"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              filter: "blur(1px)",
              left: "50%",
              top: "50%",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SparkleButton;
