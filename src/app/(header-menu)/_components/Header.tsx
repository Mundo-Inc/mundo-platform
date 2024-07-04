"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import env from "@env";
import MenuIcon from "@icons/MenuIcon";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) {
      setIsOpen(false);
    } else if (window.innerWidth >= 1024 && !isOpen) {
      setIsOpen(true);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const onResize = useCallback(() => {
    // 1024px (lg) is the breakpoint for the sidebar
    if (window.innerWidth < 1024) {
      if (isOpen) {
        setIsOpen(false);
      }
    } else {
      document.body.style.overflowY = "auto";
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
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <header className="wrapper sticky top-0 z-50 flex h-20 items-center justify-center lg:justify-between">
      <HeaderLogo />

      <nav
        className={clsx(
          "fixed bottom-0 top-0 w-full justify-end bg-black/95 transition-all duration-500 lg:relative lg:left-0 lg:flex lg:bg-transparent",
          isOpen ? "left-0" : "-left-full",
        )}
      >
        <div
          className={clsx(
            "absolute top-0 w-full transition-none lg:hidden",
            isOpen ? "left-0" : "left-full",
          )}
        >
          <div className="wrapper flex h-20 items-center justify-start">
            <button onClick={handleClick}>
              <MenuIcon active={isOpen} className="size-7" />
            </button>
          </div>
        </div>

        <ul className="flex h-full flex-col items-center gap-10 pb-10 pt-20 text-2xl font-medium text-white lg:flex-row lg:pb-0 lg:pt-0 lg:text-base lg:font-normal">
          <HeaderItem href="#ForBusiness">For Business</HeaderItem>
          <HeaderItem href="/careers">Careers</HeaderItem>
          <HeaderItem href="/blog">Blog</HeaderItem>
          <HeaderItem href="/contact">Contact Us</HeaderItem>
          <HeaderItem href="/about">About</HeaderItem>

          <li className="mt-auto">
            <a
              href={env.NEXT_PUBLIC_APPSTORE_LINK}
              className="block rounded-2xl bg-white px-4 py-3 text-sm font-black text-black"
            >
              Download App
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function HeaderItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="opacity-40 transition-opacity hover:opacity-100"
      >
        {children}
      </Link>
    </li>
  );
}
