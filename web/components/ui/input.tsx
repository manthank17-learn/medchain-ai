import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-[38px] w-full rounded-[var(--radius-md)] border border-input bg-[var(--color-surface)] px-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none transition-[border-color,box-shadow] duration-150 ease-in-out focus-visible:border-[var(--color-primary)] focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.15)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
