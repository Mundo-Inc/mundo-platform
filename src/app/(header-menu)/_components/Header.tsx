"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "@/contexts/AuthContext";
import MenuIcon from "@/icons/menuIcon";
import { cn } from "@/lib/utils";
import env from "@env";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  const { user } = useContext(AuthContext);
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
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps, react-hooks/exhaustive-deps

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
    <header className="container sticky top-0 z-50 flex h-20 items-center justify-center lg:justify-between">
      <HeaderLogo />

      <nav
        className={cn(
          "fixed bottom-0 top-0 w-full justify-end bg-black/95 transition-all duration-500 lg:relative lg:left-0 lg:flex lg:bg-transparent",
          isOpen ? "left-0" : "-left-full",
        )}
      >
        <div className="fixed left-0 top-0 w-full transition-none lg:hidden">
          <div className="container flex h-20 items-center justify-start">
            <button
              onClick={handleClick}
              aria-label="Menu Toggle"
              aria-controls="menu"
              aria-expanded={isOpen}
              aria-haspopup="menu"
              type="button"
            >
              <MenuIcon
                active={isOpen}
                className={cn(
                  "size-7",
                  isOpen ? "text-transparent" : "text-white",
                )}
                style={{
                  transform: isOpen
                    ? "rotate(135deg) scale(1)"
                    : "rotate(0deg) scale(1)",
                  transition: "all 0.4s ease-out",
                }}
              />
            </button>
          </div>
        </div>

        <ul
          className="flex h-full flex-col items-center justify-center gap-10 pb-10 pt-20 text-2xl font-medium text-white lg:flex-row lg:pb-0 lg:pt-0 lg:text-base lg:font-normal"
          id="menu"
        >
          <HeaderItem pathname={pathname} href="/#ForBusiness">
            For Business
          </HeaderItem>
          <HeaderItem pathname={pathname} href="/contact">
            Contact Us
          </HeaderItem>
          {user ? (
            <HeaderItem
              pathname={pathname}
              href={user.role === "admin" ? "/admin" : "/dashboard"}
            >
              Dashboard
            </HeaderItem>
          ) : (
            <HeaderItem pathname={pathname} href="/sign-in">
              Sign In
            </HeaderItem>
          )}

          <li className="">
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
  pathname,
}: {
  href: string;
  children: React.ReactNode;
  pathname: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "transition-opacity",
          pathname === href
            ? "text-accent-foreground opacity-100"
            : "opacity-40 hover:opacity-100",
        )}
      >
        {children}
      </Link>
    </li>
  );
}
