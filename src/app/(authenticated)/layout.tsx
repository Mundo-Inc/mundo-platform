"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

import Spinner from "@components/spinner";
import { AuthContext } from "@contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);

  return (
    <AnimatePresence>
      {user === undefined ? (
        <motion.main
          key="loading"
          initial={{
            backdropFilter: "blur(3px)",
          }}
          exit={{
            opacity: 0,
            scale: 1.2,
            filter: "blur(5px)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-theme fixed inset-0 z-50 flex h-full w-full items-center justify-center"
        >
          <Spinner />
        </motion.main>
      ) : user === null ? (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-y-16 px-4">
          Login form
        </main>
      ) : (
        children
      )}
    </AnimatePresence>
  );
}
