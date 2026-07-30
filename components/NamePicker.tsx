"use client";

export default function NamePicker({
  names,
  onPick,
}: {
  names: string[];
  onPick: (name: string) => void;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">Papan Status Tim</h1>
      <p className="mb-6 text-center text-base text-gray-600">Kamu siapa? Pilih nama kamu di bawah ini.</p>
      <div className="flex flex-col gap-3">
        {names.map((name) => (
          <button
            key={name}
            onClick={() => onPick(name)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 text-xl font-semibold text-gray-800 shadow-sm active:bg-gray-100"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
