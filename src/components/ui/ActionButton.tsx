import React, { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  tooltip: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  tooltip,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`relative group ${className}`}>
      <button
        className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"
        onClick={onClick}
        disabled={disabled}
        title={tooltip}
      >
        {icon}
      </button>
      <span className="text-xs absolute opacity-0 group-hover:opacity-100 transition-opacity left-1/2 -translate-x-1/2 mt-1 bg-gray-700 text-white px-2 py-1 rounded whitespace-nowrap z-10">
        {tooltip}
      </span>
    </div>
  );
};

export default ActionButton;
