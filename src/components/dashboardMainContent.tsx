import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export default function DashboardMainContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"main">) {
  return (
    <main
      className={cn(
        "col-span-12 ml-10 flex flex-col items-start overflow-x-hidden bg-accent/70 md:col-span-8 md:ml-0 lg:col-span-9 xl:col-span-10",
        className,
      )}
      {...props}
    />
  );
}
