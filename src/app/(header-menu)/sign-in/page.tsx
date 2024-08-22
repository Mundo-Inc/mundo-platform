"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

import MainContent from "@/components/mainContent";
import Spinner from "@/components/spinner";
import { AuthContext } from "@/contexts/AuthContext";
import SignInView from "./SignInView";

export default function Page() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [user, router]);

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
        <SignInView />
      ) : (
        <MainContent
          className="flex min-h-svh items-center justify-center"
          withHeader
        >
          Welcome {user?.name}
        </MainContent>
      )}
    </AnimatePresence>
  );
}
