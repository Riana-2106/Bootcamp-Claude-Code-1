"use client";

import { useState } from "react";
import { addTask } from "@/lib/store";

export default function NewTaskModal({
  currentUser,
  onClose,
}: {
  currentUser: string;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!title.trim()) return;
    setSaving(true);
    await addTask({
      title: title.trim(),
      description: description.trim() || null,
      assignee: assignee.trim() || null,
      due_date: dueDate || null,
      created_by: currentUser,
    });
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Tugas Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul tugas"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wa-green focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detail (opsional)"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wa-green focus:outline-none"
          />
          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Ditugaskan ke (opsional)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wa-green focus:outline-none"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wa-green focus:outline-none"
          />
        </div>

        <button
          onClick={submit}
          disabled={!title.trim() || saving}
          className="mt-4 w-full rounded-lg bg-wa-green py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Simpan Tugas"}
        </button>
      </div>
    </div>
  );
}
