"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Building2, User2 } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <div>
      <div className="lg:w-64 w-16 lg:flex flex-col h-full bg-card text-white fixed hidden">
        <nav className="lg:flex flex-col lg:static absolute top-0 left-0 lg:w-full w-64 h-full z-50 transition-transform transform lg:translate-x-0">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-center">Menu</h2>
              <ModeToggle />
            </div>
            <ul className="mt-6 space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={`cursor-pointer p-2 rounded-lg flex items-center gap-3 ${
                    isActive(item.href)
                      ? "bg-blue-200 text-blue-600"
                      : "hover:bg-gray-300 hover:text-gray-800"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div>
        <div className="p-4 overflow-x-auto flex gap-4 items-center w-lvw lg:hidden">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`py-2 px-6 rounded-md bg-gray-100 ${
                isActive(item.href) ? "bg-blue-200 text-blue-600" : ""
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  {
    href: "/dashboard/restaurants",
    icon: <Building2 size={24} />,
    name: "Restoranlar",
  },
  {
    href: "/dashboard/users",
    icon: <User2 size={24} />,
    name: "Foydalanuvchilar",
  },
];

export default Sidebar;
