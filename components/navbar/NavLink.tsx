import { ArrowRight01Sharp } from "asem-icons";
import Link from "next/link";
import React from "react";

export const NavLink = ({
  children,
  external,
  href = "#",
}: {
  children: string;
  external?: boolean;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      rel="nofollow"
      target={external ? "_blank" : undefined}
      className="group flex items-center gap-0.5 text-xs text-zinc-200 transition-colors hover:text-zinc-50 sm:text-sm"
    >
      <span>{children}</span>
      {external && (
        <ArrowRight01Sharp className="block transition-transform group-hover:rotate-45" />
      )}
    </Link>
  );
};
