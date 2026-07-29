"use client";

import { useEffect, useState } from "react";
import { subscribeTasks } from "@/lib/store";
import { STATUS_LABELS, STATUS_ORDER, Task } from "@/lib/types";
import TaskCard from "./TaskCard";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    return subscribeTasks(setTasks);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {STATUS_ORDER.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);
        return (
          <div key={status} className="rounded-2xl bg-gray-100 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold text-gray-700">{STATUS_LABELS[status]}</h3>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs text-gray-500">
                {columnTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {columnTasks.length === 0 && (
                <p className="px-1 text-xs text-gray-400">Belum ada tugas.</p>
              )}
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
