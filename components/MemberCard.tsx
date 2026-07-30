"use client";

import { useEffect, useState } from "react";
import type { Member, Status } from "@/lib/types";
import { STATUS_LABEL, STATUS_OPTIONS } from "@/lib/types";
import { STATUS_STYLE } from "@/lib/statusStyle";
import { formatRelativeTime } from "@/lib/format";

export default function MemberCard({
  member,
  isMine,
  onSave,
}: {
  member: Member;
  isMine: boolean;
  onSave: (status: Status, task: string) => Promise<void>;
}) {
  const [status, setStatus] = useState<Status>(member.status);
  const [task, setTask] = useState(member.task);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [, forceTick] = useState(0);

  useEffect(() => {
    if (!isMine) {
      setStatus(member.status);
      setTask(member.task);
    }
  }, [member.status, member.task, isMine]);

  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const style = STATUS_STYLE[isMine ? status : member.status];

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(status, task);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`rounded-2xl border-2 p-4 shadow-sm ${style.card}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xl font-bold text-gray-900">
          {member.name}
          {isMine && <span className="ml-2 text-sm font-normal text-gray-500">(kamu)</span>}
        </span>
        {!isMine && (
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${style.badge}`}>
            {STATUS_LABEL[member.status]}
          </span>
        )}
      </div>

      {!isMine && (
        <>
          <p className="mt-2 text-lg text-gray-800">{member.task || "Belum ada tugas diisi"}</p>
          <p className="mt-1 text-sm text-gray-500">{formatRelativeTime(member.updatedAt)}</p>
        </>
      )}

      {isMine && (
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setStatus(opt)}
                className={`rounded-full px-3 py-2 text-sm font-semibold ring-2 ${
                  status === opt
                    ? `${STATUS_STYLE[opt].badge} ring-current`
                    : "bg-white text-gray-500 ring-gray-200"
                }`}
              >
                {STATUS_LABEL[opt]}
              </button>
            ))}
          </div>

          <input
            value={task}
            onChange={(e) => setTask(e.target.value.slice(0, 60))}
            placeholder="Tugas singkat kamu, contoh: Desain banner klien X"
            maxLength={60}
            className="w-full rounded-xl border-2 border-gray-200 px-3 py-3 text-lg text-gray-900 focus:border-gray-400 focus:outline-none"
          />

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-500">{formatRelativeTime(member.updatedAt)}</p>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-gray-900 px-5 py-3 text-base font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : justSaved ? "Tersimpan ✓" : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
