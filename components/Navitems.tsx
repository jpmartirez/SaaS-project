"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const Navitems = () => {
  const pathName = usePathname();

  return (
    <nav className="flex items-center gap-4 ">
      {NavItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(pathName === href && "text-primary font-semibold")}
        >
          <p>{label}</p>
        </Link>
      ))}
    </nav>
  );
};

export default Navitems;
