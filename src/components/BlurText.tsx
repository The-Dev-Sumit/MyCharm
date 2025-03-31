import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>[];
  easing?: string;
  onAnimationComplete?: () => void;
}

const BlurText: React.FC<BlurTextProps> = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "power2.out",
  onAnimationComplete,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef<HTMLParagraphElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -50 }
      : { filter: "blur(10px)", opacity: 0, y: 50 };

  const defaultTo = [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      y: direction === "top" ? 5 : -5,
    },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

  useEffect(() => {
    const spans = spansRef.current;
    const from = animationFrom || defaultFrom;
    const toSteps = animationTo || defaultTo;

    // Set initial state for all spans
    gsap.set(spans, { ...from });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({
            onComplete: () => {
              if (onAnimationComplete) onAnimationComplete();
            },
          });

          // Animate all spans with stagger
          toSteps.forEach((step, stepIndex) => {
            tl.to(
              spans,
              {
                ...step,
                duration: 0.5,
                ease: easing,
                stagger: delay / 1000, // Stagger delay in seconds
              },
              stepIndex === 0 ? 0 : ">-0.25" // Overlap steps slightly
            );
          });

          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    threshold,
    rootMargin,
    delay,
    easing,
    animationFrom,
    animationTo,
    onAnimationComplete,
    direction,
  ]);

  return (
    <p
      ref={ref}
      className={`blur-text ${className} z-30  uppercase flex flex-wrap`}>
      {elements.map((element, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) spansRef.current[index] = el;
          }}
          className="inline-block will-change-transform will-change-filter will-change-opacity"
          style={{ whiteSpace: element === " " ? "pre" : "normal" }}>
          {element === " " ? "\u00A0" : element}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </p>
  );
};

export default BlurText;