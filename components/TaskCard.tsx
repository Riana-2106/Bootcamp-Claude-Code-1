"use client";

import { Task, TaskStatus, STATUS_LABELS, STATUS_ORDER } from "@/lib/types";
import { deleteTask, updateTaskStatus } from "@/lib/store";

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

function waShareUrl(task: Task): string {
  const lines = [
    `*${task.title}*`,
    task.description ? task.description : null,
    task.assignee ? `PIC: ${task.assignee}` : null,
    task.due_date ? `Deadline: ${formatDate(task.due_date)}` : null,
    `Status: ${STATUS_LABELS[task.status]}`,
  ].filter(Boolean);
  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function TaskCard({ task }: { task: Task }) {
  const currentIndex = STATUS_ORDER.indexOf(task.status);

  function move(direction: 1 | -1) {
    const next = STATUS_ORDER[currentIndex + direction] as TaskStatus | undefined;
    if (next) updateTaskStatus(task.id, next);
  }

  return (
    <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-800">{task.title}</p>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-xs text-gray-300 hover:text-red-500"
          title="Hapus tugas"
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p className="mt-1 text-xs text-gray-500">{task.description}</p>
      )}

      <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-500">
        {task.assignee && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5">👤 {task.assignee}</span>
        )}
        {task.due_date && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5">📅 {formatDate(task.due_date)}</span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => move(-1)}
            disabled={currentIndex === 0}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30"
          >
            ← Mundur
          </button>
          <button
            onClick={() => move(1)}
            disabled={currentIndex === STATUS_ORDER.length - 1}
            className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-30"
          >
            Maju →
          </button>
        </div>
        <a
          href={waShareUrl(task)}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-wa-green/10 px-2 py-1 text-xs font-medium text-wa-dark hover:bg-wa-green/20"
        >
          Share ke WA
        </a>
      </div>
    </div>
  );
}
