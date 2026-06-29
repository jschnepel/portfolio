"use client";

import Link from "next/link";

export function BlogItem({
  title,
  date,
  href,
}: {
  title: string;
  date: string;
  href?: string;
}) {
  const inner = (
    <div
      className="group flex justify-between items-baseline cursor-pointer transition-all duration-300 py-5"
      style={{
        borderBottom: "0.5px solid rgba(255,255,255,0.05)",
      }}
    >
      <span className="font-[family-name:var(--font-chakra-petch)] text-[15px] text-[#777] transition-colors duration-300 group-hover:text-white">
        {title}
      </span>
      <div className="flex items-center gap-3 shrink-0 ml-6">
        <span className="font-[family-name:var(--font-share-tech-mono)] text-[11px] text-[#3A3D44]">
          {date}
        </span>
        <span className="text-[#3A3D44] text-xs transition-all duration-300 group-hover:text-white group-hover:translate-x-1 inline-block">
          &rarr;
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }

  return inner;
}
