import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 border ${className}`}>
      {children}
    </div>
  );
};
