export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  assignee: string | null;
  due_date: string | null;
  status: TaskStatus;
  created_by: string | null;
  created_at: string;
}

export type NewTask = Pick<
  Task,
  "title" | "description" | "assignee" | "due_date" | "created_by"
>;

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "Belum Dikerjakan",
  in_progress: "Sedang Dikerjakan",
  done: "Selesai",
};

export const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "done"];
