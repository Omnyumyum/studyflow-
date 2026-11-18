import React from "react";

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  action?: React.ReactNode;
  rightElement?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  description,
  header,
  action,
  rightElement,
  className = "",
  children,
}: CardProps) {
  const topRight = action ?? rightElement;
  const subText = subtitle ?? description;

  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`.trim()}
    >
      {header ? (
        <div className="mb-4">{header}</div>
      ) : title || topRight || subText ? (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h2 className="text-base font-bold text-slate-900">{title}</h2>
            )}
            {subText && (
              <p className="mt-0.5 text-xs text-slate-500">{subText}</p>
            )}
          </div>
          {topRight && <div className="shrink-0">{topRight}</div>}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default Card;
