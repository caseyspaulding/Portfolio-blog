import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: LayoutProps) {
  return <div className="">{children}</div>;
}
