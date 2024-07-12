"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";

import MenuItem from "@components/SideBar/menuItem";
import Sidebar from "@components/SideBar/sidebar";
import { AuthContext } from "@contexts/AuthContext";
import DashboardIcon from "@icons/dashboardIcon";
import ListIcon from "@icons/listIcon";
import UserIcon from "@icons/userIcon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    user?.role === "admin" && (
      <div className="grid min-h-dvh grid-cols-12">
        <Sidebar>
          <MenuItem
            pathname={pathname}
            title="Dashboard"
            href="/admin"
            icon={<DashboardIcon className="size-5" />}
          />
          <MenuItem
            pathname={pathname}
            title="Users"
            href="/admin/users"
            icon={<UserIcon className="size-5" />}
          />
          <MenuItem
            pathname={pathname}
            title="Missions"
            href="/admin/missions"
            icon={<ListIcon className="size-5" />}
          />
        </Sidebar>
        {children}
      </div>
    )
  );
}
