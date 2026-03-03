import React from "react";
import { NavLink } from "./NavLink";

export const NavLinks = () => {
  return (
    <ul className="flex gap-3 text-zinc-600 md:gap-9">
      <li>
        <NavLink href="/#features">Özellikler</NavLink>
      </li>
      <li>
        <NavLink href="/#testimonials">Yorumlar</NavLink>
      </li>
      <li>
        <NavLink href="/#pricing">Fiyatlandırma</NavLink>
      </li>
      {/* <li>
        <NavLink href="/#" external>
          Kariyer
        </NavLink>
      </li> */}
    </ul>
  );
};
