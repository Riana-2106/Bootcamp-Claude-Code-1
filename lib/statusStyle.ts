import type { Status } from "./types";

export const STATUS_STYLE: Record<Status, { badge: string; card: string; dot: string }> = {
  belum_mulai: {
    badge: "bg-red-100 text-red-700",
    card: "border-red-200 bg-red-50",
    dot: "bg-red-500",
  },
  dikerjakan: {
    badge: "bg-amber-100 text-amber-800",
    card: "border-amber-200 bg-amber-50",
    dot: "bg-amber-500",
  },
  selesai: {
    badge: "bg-green-100 text-green-700",
    card: "border-green-200 bg-green-50",
    dot: "bg-green-500",
  },
};
