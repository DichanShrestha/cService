"use client";
import Link from "next/link";
import { useState } from "react";

const Sidebar = ({ className }: { className?: string }) => {
  const sideNode = [
    {
      logo: "dashboard",
      text: "Dashboard",
      link: "/my-account/dashboard",
    },
    {
      logo: "orders",
      text: "Orders",
      link: "/my-account/orders",
    },
    {
      logo: "inventory_2",
      text: "Products",
      link: "/my-account/products",
    },
    {
      logo: "location_on",
      text: "Address",
      link: "/my-account/address",
    },
    {
      logo: "details",
      text: "Account Details",
      link: "/my-account/acc-details",
    },
    {
      logo: "logout",
      text: "Logout",
      link: "/",
    },
  ];

  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className={className}>
      <div
        className={`bg-white rounded-full fixed h-[39px] w-[39px] left-3 top-[84px] cursor-pointer ${
          isHidden ? "animate-bounce" : ""
        }`}
        onClick={() => setIsHidden(!isHidden)}
      ></div>

      {!isHidden && (
        <div className="block absolute top-32 left-8">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          />
          <aside className="bg-gray-100 dark:bg-slate-800 h-[296px] p-2 max-w-[170px] flex flex-col gap-2 rounded-lg fixed">
            {sideNode.map((item) => (
              <SidebarNode key={item.link} logo={item.logo} text={item.text} link={item.link} />
            ))}
          </aside>
        </div>
      )}
      <hr className="fixed top-[137px] left-[220px] h-full -mt-20 border-l border-gray-400" />
    </div>
  );
};

const SidebarNode = ({
  logo,
  text,
  link,
}: {
  logo: string;
  text: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="w-auto h-10 flex gap-1 dark:text-white rounded-lg bg-slate-700 items-center">
        <div>
          <span className="mt-1 ml-1 material-symbols-outlined">{logo}</span>
        </div>
        <div>{text}</div>
      </div>
    </Link>
  );
};

export default Sidebar;
