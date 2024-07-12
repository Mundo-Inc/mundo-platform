import { cn } from "@lib/utils";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

export default function MainContent({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"main">) {
  return (
    <main
      className={cn(
        "col-span-12 flex flex-col items-start overflow-x-hidden bg-accent/70 px-4 py-2 pl-14 md:col-span-8 md:pl-4 lg:col-span-9 xl:col-span-10",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
}
