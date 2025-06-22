import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      isLoading = false,
      disabled: propDisabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "px-4 py-2 rounded-md text-sm font-medium shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const primaryClasses = "bg-blue-600 text-white hover:bg-blue-700";
    const secondaryClasses = "bg-gray-300 text-gray-800 hover:bg-gray-400";

    const variantClasses =
      variant === "primary" ? primaryClasses : secondaryClasses;

    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    return (
      <button
        ref={ref}
        {...props}
        className={combinedClasses}
        disabled={isLoading || propDisabled}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
