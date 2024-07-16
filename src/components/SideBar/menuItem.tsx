import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChevronRightIcon from "@/icons/chevronRightIcon";

interface MenuItemProps extends ComponentPropsWithoutRef<"li"> {
  pathname: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  subMenu?: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export default function MenuItem({
  pathname,
  title,
  icon,
  href,
  subMenu,
  ...props
}: MenuItemProps) {
  const isRootActive =
    pathname === href ||
    (subMenu && subMenu.some((item) => pathname.startsWith(item.href)));

  return (
    <li className="flex w-full flex-col gap-y-2 transition-colors" {...props}>
      <Link
        href={href}
        className={clsx(
          "flex w-full items-center justify-start gap-x-2 rounded-md px-4 py-3.5",
          isRootActive
            ? "bg-white/10 text-white"
            : "text-white/70 hover:bg-white/10 hover:text-white",
        )}
      >
        {icon}
        <p className="flex-grow">{title}</p>

        <ChevronRightIcon
          className={clsx(
            "size-4",
            isRootActive
              ? `text-white ${subMenu && "rotate-90"}`
              : "text-transparent",
          )}
        />
      </Link>

      <AnimatePresence>
        {subMenu && isRootActive && (
          <motion.ul
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="flex flex-col gap-y-2 pl-4 text-sm"
          >
            {subMenu.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={clsx(
                  "flex w-full items-center justify-start gap-x-2 rounded-md px-4 py-3.5",
                  pathname === item.href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.icon}
                <p className="flex-grow">{item.title}</p>

                <ChevronRightIcon
                  className={clsx(
                    "size-4",
                    pathname === item.href ? "text-white" : "text-transparent",
                  )}
                />
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
