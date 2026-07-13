import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  loading = false,
  children,
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${className}`}
    >
      {loading ? "Saving..." : children}
    </button>
  );
}