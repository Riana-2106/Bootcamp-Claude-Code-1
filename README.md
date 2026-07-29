# Papan Tugas Kantor

Pengganti tugas yang hilang/terkubur di grup WhatsApp: satu papan Kanban (Belum Dikerjakan / Sedang Dikerjakan / Selesai) yang bisa diakses semua orang lewat satu link, tanpa install apa-apa dan tanpa akun/login — cukup buka link dan isi nama.

Setiap tugas punya tombol **Share ke WA** yang membuka WhatsApp dengan ringkasan tugas siap kirim, jadi tim tetap bisa saling ping di grup seperti biasa, tapi status sebenarnya selalu tercatat di papan ini.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Tanpa konfigurasi tambahan, aplikasi jalan dalam **mode demo** (data tersimpan di localStorage browser, tidak sinkron antar orang) — cukup untuk lihat tampilannya.

## Mengaktifkan mode realtime (semua orang lihat papan yang sama)

1. Buat project gratis di [supabase.com](https://supabase.com).
2. Di SQL Editor project tersebut, jalankan isi file `supabase/schema.sql`.
3. Di Project Settings → API, salin `Project URL` dan `anon public key`.
4. Salin `.env.example` jadi `.env.local`, lalu isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   ```
5. Restart `npm run dev`. Banner mode demo akan hilang dan perubahan tugas langsung realtime ke semua orang yang buka link.

## Deploy ke Vercel

1. Push repo ini ke GitHub (sudah dilakukan di branch ini).
2. Di [vercel.com](https://vercel.com), Import Project dari repo tersebut.
3. Tambahkan environment variable `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di Vercel Project Settings → Environment Variables.
4. Deploy. Link Vercel yang muncul itu yang dishare ke grup WhatsApp kantor.

Tanpa mengisi env var Supabase, deployment tetap jalan (mode demo per-browser) — cocok untuk preview cepat, tapi belum sinkron antar rekan kerja.
