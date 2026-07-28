"use client";

import { useEffect, useState } from "react";
import NameGate, { getSavedName } from "@/components/NameGate";
import NewTaskModal from "@/components/NewTaskModal";
import TaskBoard from "@/components/TaskBoard";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setName(getSavedName());
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {!name && <NameGate onDone={setName} />}

      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Papan Tugas Kantor</h1>
          <p className="text-sm text-gray-500">
            Satu sumber kebenaran untuk tugas tim — nggak ketimbun chat lagi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {name && <span className="text-sm text-gray-500">Halo, {name} 👋</span>}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-wa-green px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            + Tugas Baru
          </button>
        </div>
      </header>

      {!isSupabaseConfigured && (
        <div className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
          Mode demo: data cuma tersimpan di browser ini. Sambungkan Supabase (lihat README) supaya
          semua rekan kantor lihat papan yang sama secara realtime.
        </div>
      )}

      <TaskBoard />

      {showModal && name && (
        <NewTaskModal currentUser={name} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
