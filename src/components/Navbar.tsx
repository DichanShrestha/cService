"use client";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter()

  const checkExactPath = (path: string) => {
    return pathname === path ? "text-orange-400" : "";
  };

  const checkPathPrefix = (path: string) => {
    return pathname.startsWith(path) ? "text-orange-400" : "";
  };

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-screen mx-auto z-50",
        className
      )}
    >
      {/* categories home shop about us gallery blogs contact */}
      <Menu setActive={setActive}>
        <HoveredLink className={checkExactPath("/")} href="/">
          Home
        </HoveredLink>
        <div onClick={() => router.replace('/categories')}>
        <MenuItem 
        setActive={setActive} 
        active={active} 
        item="Categories"
        className={checkExactPath('/categories')}
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Shop By Car</HoveredLink>
            <HoveredLink href="/interface-design">Exterior</HoveredLink>
            <HoveredLink href="/seo">Interior</HoveredLink>
            <HoveredLink href="/branding">Car Lighting</HoveredLink>
            <HoveredLink href="/branding">Car Utility</HoveredLink>
            <HoveredLink href="/branding">Car Electronics</HoveredLink>
          </div>
        </MenuItem>
        </div>
        <MenuItem
          className={`${checkExactPath("/store")} ${checkPathPrefix(
            "/my-account"
          )}`}
          setActive={setActive}
          active={active}
          item="Store"
        >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Wish list</HoveredLink>
            <HoveredLink href="/interface-design">Compare</HoveredLink>
            <HoveredLink
              className={checkExactPath("/my-account")}
              href="/my-account"
            >
              My Account
            </HoveredLink>
          </div>
        </MenuItem>
        <div className="flex space-x-4">
          <HoveredLink href="/gallery">Gallery</HoveredLink>
          <HoveredLink href="/blogs">Blogs</HoveredLink>
          <HoveredLink href="/contact">Contacts</HoveredLink>
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
