declare module "../components/CursorParticles" {
  import { FC } from "react";
  const Component: FC<{
    screenWidth: number;
    hasError: boolean;
  }>;
  export default Component;
}

declare module "../components/ButtonWrapper" {
  import { FC } from "react";
  const Component: FC<{
    href?: string;
    text?: string;
    onClick?: () => void;
  }>;
  export default Component;
}

declare module "../components/SparkleButton" {
  import { FC } from "react";
  const Component: FC<{
    text?: string;
    onClick?: () => void;
  }>;
  export default Component;
}
