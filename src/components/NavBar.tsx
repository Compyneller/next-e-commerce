"use client";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "@/components/ui/toggle";
import Logout from "./Logout";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const Links = [
    {
      name: "Category",
      href: "/dashboard/category",
      active: pathname === "/dashboard/category",
    },
    {
      name: "Product",
      href: "/dashboard/product",
      active: pathname === "/dashboard/product",
    },
    {
      name: "Unit",
      href: "/dashboard/unit",
      active: pathname === "/dashboard/unit",
    },
    {
      name: "Billboard",
      href: "/dashboard/billboard",
      active: pathname === "/dashboard/billboard",
    },
  ];
  return (
    <nav className="flex border-b items-center justify-between p-5">
      <p>E-Commerce</p>
      <div className="flex items-center gap-3">
        {Links.map((items, index) => (
          <Link
            className={cn(
              "text-sm hover:text-black dark:hover:text-white",
              items.active
                ? "text-black dark:text-white font-semibold"
                : "text-muted-foreground"
            )}
            href={items.href}
            key={index}>
            {items.name}
          </Link>
        ))}
        <Logout />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
