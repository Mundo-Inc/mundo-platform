import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export default function MainContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"main">) {
  return (
    <main
      className={cn(
        "col-span-12 flex flex-col items-start overflow-x-hidden bg-accent/70 md:col-span-8 lg:col-span-9 xl:col-span-10",
        className,
      )}
      {...props}
    />
  );
}
