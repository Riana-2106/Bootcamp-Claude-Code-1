import { isSupabaseConfigured, supabase } from "./supabaseClient";
import { NewTask, Task, TaskStatus } from "./types";

const DEMO_KEY = "office-task-board-demo-tasks";
const demoListeners = new Set<(tasks: Task[]) => void>();

function readDemoTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DEMO_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function writeDemoTasks(tasks: Task[]) {
  window.localStorage.setItem(DEMO_KEY, JSON.stringify(tasks));
  demoListeners.forEach((listener) => listener(tasks));
}

function uuid(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function subscribeTasks(onChange: (tasks: Task[]) => void): () => void {
  if (isSupabaseConfigured && supabase) {
    const client = supabase;
    let cancelled = false;

    const refresh = () => {
      client
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true })
        .then(({ data }) => {
          if (!cancelled && data) onChange(data as Task[]);
        });
    };

    refresh();

    const channel = client
      .channel("tasks-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, refresh)
      .subscribe();

    return () => {
      cancelled = true;
      client.removeChannel(channel);
    };
  }

  onChange(readDemoTasks());
  demoListeners.add(onChange);

  const onStorage = (e: StorageEvent) => {
    if (e.key === DEMO_KEY) onChange(readDemoTasks());
  };
  window.addEventListener("storage", onStorage);

  return () => {
    demoListeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export async function addTask(input: NewTask): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("tasks").insert({ ...input, status: "todo" });
    return;
  }

  const tasks = readDemoTasks();
  tasks.push({
    id: uuid(),
    title: input.title,
    description: input.description,
    assignee: input.assignee,
    due_date: input.due_date,
    status: "todo",
    created_by: input.created_by,
    created_at: new Date().toISOString(),
  });
  writeDemoTasks(tasks);
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("tasks").update({ status }).eq("id", id);
    return;
  }

  const tasks = readDemoTasks().map((t) => (t.id === id ? { ...t, status } : t));
  writeDemoTasks(tasks);
}

export async function deleteTask(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from("tasks").delete().eq("id", id);
    return;
  }

  writeDemoTasks(readDemoTasks().filter((t) => t.id !== id));
}
