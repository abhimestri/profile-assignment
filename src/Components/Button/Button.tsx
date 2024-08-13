import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  onClick?: (data: any) => void;
  className?: string;
  disabled?: boolean;
  type?: any;
}

type PropsWithChildren = React.PropsWithChildren<ButtonProps>;

const Button: React.FC<PropsWithChildren> = ({
  variant,
  onClick,
  children,
  className,
  disabled = false,
  type,
}) => {
  switch (variant) {
    case "secondary":
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`transition delay-100 duration-300 ease-in-out bg-white border-[1px] !border-darkgrey !rounded-[6px] px-4 py-2 hover:scale-[1.02] ${className} ${
            disabled ? "opacity-[0.4] cursor-not-allowed" : "opacity-1"
          }`}
        >
          {children}
        </button>
      );
    case "primary":
    default:
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={`transition delay-100 duration-300 ease-in-out text-white py-2 px-4 bg-darkgrey border-solid border-[1px] border-white rounded-[8px] hover:scale-[1.02] hover:bg-white hover:text-darkgrey hover:border-darkgrey ${className} ${
            disabled
              ? "opacity-[0.4] hover:!bg-darkgrey hover:!scale-[1] hover:!text-white cursor-not-allowed"
              : "opacity-1"
          }`}
        >
          {children}
        </button>
      );
  }
};

export default Button;
