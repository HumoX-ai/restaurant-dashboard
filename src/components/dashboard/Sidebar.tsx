"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Building2, Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };
  const isActive = (path: string) => {
    // Check if the current pathname starts with the given path
    return pathname.startsWith(path);
  };

  return (
    <div>
      <div className="lg:w-64 w-16 lg:flex flex-col h-full bg-card text-white fixed hidden">
        <nav
          className={`lg:flex flex-col lg:static absolute top-0 left-0 lg:w-full w-64 h-full  z-50 ftrfansition-transform transform lg:translate-x-0`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-center">Menu</h2>
              <ModeToggle />
            </div>

            <ul className="mt-6 space-y-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-2 rounded-lg flex items-center gap-3 ${
                    isActive("/dashboard/restaurants")
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => navigateTo("/dashboard/restaurants")}
                >
                  {item.icon} {item.name}
                </li>
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
                pathname === item.href ? "bg-blue-200 text-blue-600" : ""
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
];

export default Sidebar;
