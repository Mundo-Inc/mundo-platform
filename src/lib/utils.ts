import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRelativeTime(seconds: number) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const divisions = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 7, name: "day" },
    { amount: 4.34524, name: "week" },
    { amount: 12, name: "month" },
    { amount: Number.POSITIVE_INFINITY, name: "year" },
  ];

  let duration = seconds;

  for (let i = 0; i < divisions.length; i++) {
    const division = divisions[i];
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.name as any);
    }
    duration /= division.amount;
  }
}

export function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  return getRelativeTime(seconds);
}
