import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  let variantClasses = "";
  let sizeClasses = "";

  // 设置按钮样式变体
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500";
      break;
    case "secondary":
      variantClasses =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500";
      break;
    case "outline":
      variantClasses =
        "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500";
      break;
    case "danger":
      variantClasses =
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";
      break;
  }

  // 设置按钮大小
  switch (size) {
    case "sm":
      sizeClasses = "px-3 py-1 text-sm";
      break;
    case "md":
      sizeClasses = "px-4 py-2";
      break;
    case "lg":
      sizeClasses = "px-6 py-3 text-lg";
      break;
  }

  return (
    <button
      className={`rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
