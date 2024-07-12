"use client";

import { useContext } from "react";

import MainContent from "@components/mainContent";
import { AuthContext } from "@contexts/AuthContext";

export default function Page() {
  const { user } = useContext(AuthContext);

  return (
    <MainContent className="flex items-center justify-center">
      Welcome {user?.name}
    </MainContent>
  );
}
