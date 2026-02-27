import Link from "next/link";
import Image from "next/image";
import React from "react";

export const NavLogo = () => {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={60} height={50} priority className="" />
    </Link>
  );
};
