// Allow all JSX files
declare module "*.jsx" {
  import { ReactElement } from "react";
  const component: React.FC;
  export default component;
}

// Specific component declarations
declare module "../components/CursorParticles" {
  const component: React.FC;
  export default component;
}

declare module "../components/ButtonWrapper" {
  const component: React.FC<{
    onClick?: () => void;
    text?: string;
    href?: string;
  }>;
  export default component;
}

declare module "../components/SparkleButton" {
  const component: React.FC<{
    onClick?: () => void;
    text?: string;
  }>;
  export default component;
}