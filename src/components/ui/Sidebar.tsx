import React, { ReactNode, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SIZES, TRANSITION } from "@/constants";
import { Storage } from "@/utils/storage";

interface SidebarProps {
  title?: string;
  children: ReactNode | ((props: { collapsed: boolean }) => ReactNode);
  footer?: ReactNode | ((props: { collapsed: boolean }) => ReactNode);
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  title,
  children,
  footer,
  className = "",
}) => {
  // 使用Storage工具获取初始折叠状态
  const getInitialCollapsedState = (): boolean => {
    return Storage.getSidebarCollapsed(false);
  };

  const [collapsed, setCollapsed] = useState(getInitialCollapsedState);
  const [titleVisible, setTitleVisible] = useState(!collapsed);
  const { t } = useLanguage();

  // 折叠状态变化时保存到Storage
  useEffect(() => {
    Storage.setSidebarCollapsed(collapsed);

    if (collapsed) {
      setTitleVisible(false);
    } else {
      const timer = setTimeout(() => {
        setTitleVisible(true);
      }, TRANSITION.SIDEBAR_EXPAND_DELAY);
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  const renderChildren = () => {
    if (typeof children === "function") {
      return children({ collapsed });
    }

    if (collapsed) {
      return (
        <div className="flex flex-col items-center space-y-4 px-2 py-4">
          {children}
        </div>
      );
    }

    return children;
  };

  const renderFooter = () => {
    if (typeof footer === "function") {
      return footer({ collapsed });
    }
    return footer;
  };

  return (
    <div
      className={`bg-gray-800 dark:bg-opacity-70 dark:backdrop-blur-2xl text-white flex flex-col h-full relative z-10 transition-all duration-300 ${
        collapsed
          ? SIZES.SIDEBAR_COLLAPSED
          : className || SIZES.SIDEBAR_EXPANDED
      }`}
    >
      {title && (
        <div className="p-4 border-b border-gray-700 flex justify-between items-center h-16">
          <div
            className={`transition-opacity duration-200 overflow-hidden whitespace-nowrap ${
              titleVisible ? "opacity-100" : "opacity-0"
            } ${collapsed ? "w-0" : "flex-1"}`}
          >
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <button
            className={`text-gray-400 hover:text-white p-1 rounded-md focus:outline-none ${
              collapsed ? "" : "ml-2"
            }`}
            onClick={() => setCollapsed(!collapsed)}
            title={
              collapsed ? t("app.sidebar.expand") : t("app.sidebar.collapse")
            }
          >
            <i
              className={`${
                collapsed ? "ri-arrow-right-s-line" : "ri-arrow-left-s-line"
              } text-xl`}
            ></i>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">{renderChildren()}</div>

      {footer && (
        <div
          className={`${
            !collapsed ? "p-4" : "py-2"
          } border-t border-gray-700 dark:border-opacity-20`}
        >
          {renderFooter()}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
