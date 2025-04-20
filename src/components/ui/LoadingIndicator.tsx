import React from "react";

interface LoadingIndicatorProps {
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  className = "",
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <div
        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

export default LoadingIndicator;
