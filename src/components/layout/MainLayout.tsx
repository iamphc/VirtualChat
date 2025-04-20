import React, { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-screen w-full overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-200`}
    >
      {children}
    </div>
  );
};

export default MainLayout;
