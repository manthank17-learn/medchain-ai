import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "sm";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-foreground text-background hover:opacity-90 border border-transparent",
  outline:
    "border border-border bg-background text-foreground hover:bg-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant = "default", size = "default", ...rest } =
    props as ButtonProps;

  const v = variant as ButtonVariant;
  const s = size as ButtonSize;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:pointer-events-none disabled:opacity-50",
        variantClasses[v],
        sizeClasses[s],
        className,
      )}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});

Button.displayName = "Button";

export { Button };
