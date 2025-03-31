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
declare const BlurText: React.FC<BlurTextProps>;
export default BlurText;
