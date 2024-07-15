import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import ChevronRightIcon from "@/icons/chevronRightIcon";

interface MenuItemProps extends ComponentPropsWithoutRef<"li"> {
  pathname: string;
  title: string;
  icon: React.ReactNode;
  href: string;
}

export default function MenuItem({
  pathname,
  title,
  icon,
  href,
  ...props
}: MenuItemProps) {
  return (
    <li
      className={clsx(
        "flex w-full rounded-md transition-colors",
        pathname === href
          ? "bg-white/10 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white",
      )}
      {...props}
    >
      <Link
        href={href}
        className="flex w-full items-center justify-start gap-x-2 rounded-md px-4 py-3.5"
      >
        {icon}
        <p className="flex-grow">{title}</p>

        <ChevronRightIcon
          className={clsx(
            "size-4",
            pathname === href ? "text-white" : "text-transparent",
          )}
        />
      </Link>
    </li>
  );
}
