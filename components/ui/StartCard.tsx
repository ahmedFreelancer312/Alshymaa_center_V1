import React from "react";
import { CardComponentProps } from "../../types";
import Link from "next/link";

const CardComponent = ({
  title,
  count,
  icon,
  iconClass,
  link,
  colorClass,
  children,
}: CardComponentProps) => {
  return (
    <div
      className={`bg-background p-4 rounded-lg shadow-md border-l-4 ${colorClass}`}
    >
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-2xl font-bold text-text">{count}</span>
        {icon && <div className={`text-3xl ${iconClass}`}>{icon}</div>}
      </div>
      {children && <div className="mt-2">{children}</div>}
      {link && (
        <Link
          href={link}
          className={`mt-2 inline-block text-xs ${colorClass} hover:underline font-medium text-primary`}
        >
          View more
        </Link>
      )}
    </div>
  );
};

export default CardComponent;
