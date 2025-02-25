import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "text-gray-900",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]} ${color}`}
        style={{ borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default Loader;
