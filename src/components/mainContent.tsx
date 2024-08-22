import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export default function MainContent({
  className,
  withHeader,
  ...props
}: ComponentPropsWithoutRef<"main"> & {
  withHeader?: boolean;
}) {
  return (
    <main
      className={cn(
        "col-span-12 flex flex-col items-start overflow-x-hidden md:col-span-8 lg:col-span-9 xl:col-span-10",
        className,
        withHeader && "-mt-20 pt-20",
      )}
      {...props}
    />
  );
}
