'use client'
import { useState } from 'react'
import { HoveredLink, Menu, MenuItem } from './ui/navbar-menu';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter()

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-screen mx-auto z-50", className)}
    >
      {/* categories home shop about us gallery blogs contact */}
      <Menu setActive={setActive}>
          <HoveredLink href='/'>Home</HoveredLink>
        <Link href='/categories'>
        <MenuItem setActive={setActive} active={active} item="Categories">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Shop By Car</HoveredLink>
            <HoveredLink href="/interface-design">Exterior</HoveredLink>
            <HoveredLink href="/seo">Interior</HoveredLink>
            <HoveredLink href="/branding">Car Lighting</HoveredLink>
            <HoveredLink href="/branding">Car Utility</HoveredLink>
            <HoveredLink href="/branding">Car Electronics</HoveredLink>
          </div>
        </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Shop">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Wish list</HoveredLink>
            <HoveredLink href="/interface-design">Compare</HoveredLink>
            <HoveredLink href="/my-account">My Account</HoveredLink>
          </div>
        </MenuItem>
        <div className="flex space-x-4">
          <HoveredLink href='/gallery'>Gallery</HoveredLink>
          <HoveredLink href='/'>Blogs</HoveredLink>
          <HoveredLink href='/'>Contacts</HoveredLink>
        </div>
      </Menu>
    </div>
  );
}

export default Navbar
