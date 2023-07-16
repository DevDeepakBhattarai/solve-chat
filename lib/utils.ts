import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (hours < 24) {
    const formatter = new Intl.DateTimeFormat("en-us", {
      hour: "numeric",
      minute: "numeric",
    });
    return formatter.format(date);
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (days < 28) {
    return `${weeks}w ago`;
  } else if (days < 365) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
