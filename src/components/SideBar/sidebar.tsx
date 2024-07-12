"use client";

import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

import CloseIcon from "@icons/closeIcon";
import MenuIcon from "@icons/menuIcon";
import { Button } from "../ui/button";
import { AuthContext } from "@/contexts/AuthContext";

export default function Sidebar(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const { signOut } = useContext(AuthContext);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      setIsOpen(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const onResize = useCallback(() => {
    // 768px (md) is the breakpoint for the sidebar
    if (window.innerWidth < 768) {
      if (isOpen) {
        setIsOpen(false);
      } else {
      }
    } else {
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isOpen) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }
  }, [isOpen]);

  return (
    <aside
      className="fixed left-0 top-0 z-50 flex h-screen w-full flex-grow-0 flex-col bg-accent pl-10 transition-all ease-out md:sticky md:col-span-4 md:pl-0 lg:col-span-3 xl:col-span-2"
      style={{
        left: isOpen ? 0 : "-100%",
      }}
    >
      <Image
        priority
        src="/images/icons/Icon-128x128.png"
        alt="Mundo"
        width={128}
        height={128}
        className="mx-auto max-w-32 py-6"
      />
      <nav className="flex-grow p-4">
        <ul className="flex flex-col gap-y-2">{props.children}</ul>
      </nav>
      <footer className="p-2">
        <Button
          variant="outline"
          onClick={signOut}
          className="w-full border-yellow-200 text-yellow-200 hover:border-yellow-400 hover:text-yellow-400"
        >
          Log Out
        </Button>
      </footer>

      <button
        onClick={toggle}
        className={clsx(
          "fixed bottom-0 left-0 top-0 flex size-10 h-full w-10 flex-col items-center justify-center border-r bg-accent text-white transition-all md:hidden",
          isOpen ? "border-r-white" : "border-r-white/50",
        )}
      >
        {isOpen ? (
          <CloseIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" active={isOpen} />
        )}
      </button>
    </aside>
  );
}
