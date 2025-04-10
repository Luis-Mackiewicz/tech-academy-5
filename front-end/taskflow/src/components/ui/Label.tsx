// src/components/ui/Label.tsx
import { LabelHTMLAttributes, forwardRef, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className = "", ...props }, ref) => {
    const baseClasses = "block text-sm font-medium text-gray-700 mb-1";
    const combinedClasses = `${baseClasses} ${className}`;

    return (
      <label ref={ref} {...props} className={combinedClasses}>
        {children}
      </label>
    );
  }
);

Label.displayName = "Label";
