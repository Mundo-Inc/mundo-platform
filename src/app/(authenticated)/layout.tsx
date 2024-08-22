"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";

import Spinner from "@/components/spinner";
import { AuthContext } from "@/contexts/AuthContext";
import SignInView from "../(header-menu)/sign-in/SignInView";
import Header from "../(header-menu)/_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <div className="flex flex-col">
          <Header />
          <SignInView />
        </div>
      ) : (
        children
      )}
    </AnimatePresence>
  );
}
