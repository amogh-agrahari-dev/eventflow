export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Label({ className, ...props }) {
  return (
    <label
      className={cn("text-sm font-medium leading-none text-foreground", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
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
        "size-4 rounded border-input text-accent focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}

export function Button({ className, variant = "default", children, ...props }) {
  const variants = {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    hero:
      "bg-gradient-brand text-primary-foreground shadow-elevated hover:brightness-110",
    outline:
      "border border-input bg-background text-foreground hover:bg-muted",
    secondary:
      "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
  };

  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-lg px-6 text-sm font-semibold",
        "transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
