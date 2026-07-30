# Papan Status Tim

Satu layar sederhana yang menampilkan status kerja 5-10 anggota tim: sedang ngerjakan apa, dan kapan terakhir diubah. Semua orang bisa lihat tanpa login. Tiap orang cuma bisa ubah baris miliknya sendiri.

Dibangun dengan Next.js (App Router) + Vercel Postgres, siap deploy ke Vercel.

## 1. Edit daftar nama tim

Buka file **`lib/team.ts`** dan ganti daftar nama sesuai anggota tim Anda (5-10 nama):

```ts
export const TEAM_MEMBERS: string[] = [
  "Andi",
  "Bunga",
  "Citra",
  // ...tambah/ubah nama di sini
];
```

Simpan, lalu commit & push (atau deploy ulang) supaya perubahan tampil di aplikasi. Baris untuk nama baru otomatis muncul dengan status default "Belum Mulai" saat pertama kali dibuka — tidak perlu setup database manual tiap ganti nama.

## 2. Setup database (Neon Postgres lewat Vercel) — sekali saja

Aplikasi ini butuh tempat menyimpan status yang bisa berubah-ubah. Kita pakai **Neon Postgres**, yang bisa disambungkan langsung dari dashboard Vercel (menggantikan "Vercel Postgres" lama yang sudah dihentikan), gratis untuk skala kecil, dan tidak perlu akun terpisah.

Langkah-langkah (dilakukan di dashboard Vercel, setelah project ini di-deploy/di-import):

1. Buka project Anda di **vercel.com** → tab **Storage**.
2. Klik **Create Database** → pilih **Neon** (Postgres) → beri nama bebas, misalnya `papan-status-tim-db` → **Create**.
3. Ikuti langkah penyambungan ke project ini dengan environment **Production** (dan **Preview**/**Development** juga, supaya deploy preview ikut jalan). Vercel otomatis menambahkan environment variable `DATABASE_URL` (dan beberapa variabel lain) ke project Anda — **tidak perlu isi manual**.
4. Buka tab **Deployments**, redeploy project (atau tunggu deploy berikutnya dari push Anda) supaya environment variable baru terbaca.

Itu saja — tabel database dibuat otomatis oleh aplikasi saat pertama kali diakses, jadi tidak ada migrasi manual yang perlu dijalankan.

### Menjalankan di komputer sendiri (opsional, untuk development)

```bash
npm install
npx vercel link      # sambungkan folder ini ke project Vercel Anda
npx vercel env pull .env.local   # tarik DATABASE_URL dari Vercel ke lokal
npm run dev
```

Buka http://localhost:3000.

## 3. Deploy ke Vercel

1. Push repo ini ke GitHub (branch ini sudah siap).
2. Di **vercel.com**, **Import Project** dari repo tersebut.
3. Deploy seperti biasa (tidak perlu isi environment variable manual — akan diisi lewat langkah "Setup database" di atas setelah project ada).
4. Setelah database disambungkan (langkah 2), redeploy sekali. Link Vercel yang muncul itu yang dibagikan ke tim lewat WhatsApp.

## Cara pakai (untuk tim)

1. Buka link dari HP.
2. Pilih nama sendiri dari daftar (tersimpan otomatis di HP, tidak perlu pilih ulang tiap buka).
3. Ubah status (Belum Mulai / Dikerjakan / Selesai) dan isi tugas singkat, lalu tekan **Simpan Perubahan**.
4. Layar otomatis memperbarui diri tiap beberapa detik supaya semua orang lihat status terbaru; ada juga tombol **Perbarui Sekarang** kalau mau lihat langsung.
5. Salah pilih nama? Tekan "Bukan [nama]?" di pojok kanan atas untuk pilih ulang.

## Batasan yang disengaja (versi pertama)

Supaya cepat selesai dan tetap sederhana, hal-hal berikut **sengaja belum ada**: tambah/hapus anggota dari UI, banyak tugas per orang, notifikasi/reminder/integrasi WhatsApp, riwayat status sebelumnya, dashboard/laporan/statistik, role admin, dan dark mode/kustomisasi tampilan.
