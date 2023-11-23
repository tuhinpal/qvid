import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  onClick,
  className,
  isLoading,
  Icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
  Icon?: any;
}) {
  return (
    <button
      className={twMerge(
        "bg-black py-3 px-4 text-lg text-white w-full rounded-xl font-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <ArrowPathIcon className="animate-spin w-6 h-6" />
      ) : Icon ? (
        <Icon className="w-6 h-6" />
      ) : null}

      {children}
    </button>
  );
}
