import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, id, as = "h2", align = "left", className = "" }: Props) {
  const Tag = as;
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className={as === "h1" ? "text-h1" : "text-h2"}>
        {title}
      </Tag>
      {intro && <div className="text-lead text-ink-soft">{intro}</div>}
    </div>
  );
}
