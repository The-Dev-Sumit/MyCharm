import React from "react";
interface ButtonProps {
    href: string;
    text: string;
    className?: string;
    target?: string;
    rel?: string;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
