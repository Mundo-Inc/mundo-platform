import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import ChevronRightIcon from "@icons/chevronRightIcon";

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
        "flex w-full",
        pathname === href ? "text-white" : "hover:text-white/70",
      )}
      {...props}
    >
      <Link
        href={href}
        className="flex w-full items-center justify-start gap-x-2 rounded-md py-2 transition-colors"
      >
        {icon}
        <p className="flex-grow">{title}</p>

        <ChevronRightIcon className="size-4" />
      </Link>
    </li>
  );
}
