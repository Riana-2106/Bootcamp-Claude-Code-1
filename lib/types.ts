export type Status = "belum_mulai" | "dikerjakan" | "selesai";

export const STATUS_LABEL: Record<Status, string> = {
  belum_mulai: "Belum Mulai",
  dikerjakan: "Dikerjakan",
  selesai: "Selesai",
};

export const STATUS_OPTIONS: Status[] = ["belum_mulai", "dikerjakan", "selesai"];

export interface Member {
  name: string;
  status: Status;
  task: string;
  updatedAt: string;
}
