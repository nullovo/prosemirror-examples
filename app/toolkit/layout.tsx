import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen">{children}</div>;
};

export default Layout;
