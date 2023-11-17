import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen">{children}</div>;
};

export default DashboardLayout;
