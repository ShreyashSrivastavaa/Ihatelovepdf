import type { ReactNode } from "react";

/**
 * Operations layout â€” passthrough only.
 * NavMenu, Footer, and LocaleProvider are
 * already rendered in the parent (es)/layout.tsx.
 */
export default function OperationsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
