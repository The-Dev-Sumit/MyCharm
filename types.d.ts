// types.d.ts
declare module "*.js" {
  import { ReactElement } from "react";
  const value: ReactElement;
  export default value;
}

declare module "src/components/CursorParticles" {
  import { FC } from "react";
  const CursorParticles: FC<{
    screenWidth?: number;
    hasError?: boolean;
  }>;
  export default CursorParticles;
}

declare module "src/components/ButtonWrapper" {
  import { FC } from "react";
  const ButtonWrapper: FC<{
    href: string;
    text: string;
    className?: string;
  }>;
  export default ButtonWrapper;
}

declare module "src/components/SparkleButton" {
  import { FC } from "react";
  const SparkleButton: FC<{
    href: string;
    text: string;
  }>;
  export default SparkleButton;
}
