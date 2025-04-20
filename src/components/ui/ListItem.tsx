import React, { ReactNode, useEffect, useState } from "react";
import { TRANSITION } from "@/constants";

interface ListItemProps {
  icon?: ReactNode;
  label: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
  collapsed?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  label,
  onClick,
  isActive = false,
  className = "",
  collapsed = false,
}) => {
  const [labelVisible, setLabelVisible] = useState(!collapsed);

  useEffect(() => {
    if (collapsed) {
      setLabelVisible(false);
    } else {
      const timer = setTimeout(() => {
        setLabelVisible(true);
      }, TRANSITION.SIDEBAR_EXPAND_DELAY);
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg mb-1 cursor-pointer ${
        isActive
          ? "bg-blue-600 dark:bg-blue-600"
          : "hover:bg-gray-700 dark:hover:bg-opacity-70"
      } ${className} focus:outline-none`}
      title={collapsed ? (typeof label === "string" ? label : "") : ""}
    >
      {icon && (
        <div
          className="flex justify-center items-center min-w-[24px] min-h-[24px] transition-all duration-200"
          style={{ marginRight: collapsed ? 0 : "0.75rem" }}
        >
          {icon}
        </div>
      )}
      {!collapsed && (
        <div
          className={`whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-200 ${
            labelVisible ? "opacity-100" : "opacity-0"
          } flex-1`}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default ListItem;
