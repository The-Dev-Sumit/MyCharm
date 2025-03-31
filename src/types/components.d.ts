declare module "*.jsx" {
  import { ReactElement } from "react";
  const component: ReactElement;
  export default component;
}

declare module "../components/CursorParticles" {
  import { ReactElement } from "react";
  const component: ReactElement;
  export default component;
}
// Add similar declarations for other components
