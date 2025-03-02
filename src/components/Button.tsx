import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-5 py-2 rounded-full font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-md",
    secondary: "bg-gray-300 hover:bg-gray-400 text-black shadow-md",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-md",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
