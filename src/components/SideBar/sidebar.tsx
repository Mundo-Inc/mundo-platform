"use client";

import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import CloseIcon from "@icons/closeIcon";
import MenuIcon from "@icons/menuIcon";

export default function Sidebar(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

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

  return (
    <aside
      className="border-themeNavy bg-gradientGreen md:bg-gradientGreen/50 fixed inset-0 flex w-full flex-grow-0 flex-col border-r pl-10 transition-all ease-out md:relative md:col-span-4 md:pl-0 lg:col-span-3 xl:col-span-2"
      style={{
        left: isOpen ? 0 : "-100%",
      }}
    >
      <Image
        priority
        src="/ConsultaLogo.svg"
        alt="Consulta"
        width={308}
        height={76}
        className="mx-auto max-w-40 py-6"
      />
      <nav className="flex-grow p-4">
        <ul className="flex flex-col gap-y-4">{props.children}</ul>
      </nav>
      <hr className="border-t border-white/50" />
      <footer className="p-2">TEST</footer>

      <button
        onClick={toggle}
        className={clsx(
          "bg-gradientGreen fixed bottom-0 left-0 top-0 flex size-10 h-full w-10 flex-col items-center justify-center border-r text-white transition-all md:hidden",
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
