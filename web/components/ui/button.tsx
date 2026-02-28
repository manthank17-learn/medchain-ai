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
    "border border-transparent bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-background",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-[38px] px-4 text-[13px]",
  sm: "h-8 rounded-[var(--radius-sm)] px-3 text-[13px]",
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
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-0 focus-visible:border-[var(--color-primary)] focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.15)] disabled:pointer-events-none disabled:opacity-50",
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
