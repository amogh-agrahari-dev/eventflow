export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Label({ className, ...props }) {
  return (
    <label
      className={cn("text-sm font-semibold leading-none text-foreground tracking-tight", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-input bg-background/90 px-3.5 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200 ease-out shadow-sm hover:border-border/80 focus:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

export function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 rounded-md border-input text-accent focus-visible:ring-2 focus-visible:ring-accent",
        "cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95",
        className,
      )}
      {...props}
    />
  );
}

export function Button({ className, variant = "default", children, ...props }) {
  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-xl hover:shadow-primary/20",
    hero:
      "bg-gradient-to-r from-accent via-cyan-500 to-indigo-600 text-slate-950 font-bold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:brightness-110 border border-accent/30",
    outline:
      "border border-input bg-background/80 text-foreground hover:bg-muted hover:border-accent/40 shadow-xs hover:shadow-md",
    secondary:
      "bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-sm hover:shadow-md",
    ghost:
      "bg-transparent text-foreground hover:bg-muted/80 hover:text-accent",
  };

  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold",
        "transition-all duration-300 ease-out transform-gpu hover:scale-[1.03] active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50 disabled:transform-none cursor-pointer",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
