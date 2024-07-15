"use client";

import { useContext } from "react";

import DashboardMainContent from "@/components/dashboardMainContent";
import { AuthContext } from "@/contexts/AuthContext";

export default function Page() {
  const { user } = useContext(AuthContext);

  return (
    <DashboardMainContent className="flex items-center justify-center">
      Welcome {user?.name}
    </DashboardMainContent>
  );
}
