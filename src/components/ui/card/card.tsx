import React, { PropsWithChildren } from "react";

interface CardProps {
  title?: React.ReactNode;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}
const Card: React.FC<PropsWithChildren<CardProps>> = ({
  title,
  headerActions,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-islamic transition-shadow ${className}`}
    >
      {(title || headerActions) && (
        <div className="flex justify-between items-start mb-3">
          {title && <h3 className="font-medium text-gray-800">{title}</h3>}
          {headerActions && (
            <div className="flex items-center space-x-2">{headerActions}</div>
          )}
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
