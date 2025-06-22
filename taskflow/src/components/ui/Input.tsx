import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "secondary";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseClasses =
      "w-full px-3 py-2 text-sm text-gray-800 border rounded-md shadow-sm focus:outline-none placeholder:text-gray-400";

    let borderClasses = "border-gray-300";
    let focusRingClasses = "focus:ring-2 focus:ring-teal-500";

    switch (variant) {
      case "secondary":
        borderClasses = "border-teal-200";
        focusRingClasses = "focus:ring-2 focus:ring-indigo-500";
        break;
      default:
        break;
    }

    const combinedClasses = `${baseClasses} ${borderClasses} ${focusRingClasses} ${
      className || ""
    }`;

    return <input ref={ref} {...props} className={combinedClasses} />;
  }
);

Input.displayName = "Input";
