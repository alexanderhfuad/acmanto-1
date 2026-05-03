# Deploy ke Hostinger

## Ringkasannya

Project ini terdiri dari:

- Frontend Vite/React di `artifacts/ac-booking`
- Backend Node/Express di `artifacts/api-server`
- Database PostgreSQL untuk API booking

Artinya:

- Jika Anda hanya punya shared hosting biasa tanpa fitur Node.js, yang bisa di-deploy langsung hanya frontend statisnya
- Jika Anda punya Hostinger Business/Cloud dengan fitur Node.js Web App, frontend dan backend bisa dijalankan terpisah atau fullstack

Referensi Hostinger yang saya cek pada 3 Mei 2026:

- Node.js di paket web/cloud tertentu: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- Shared hosting biasa tidak menyediakan root access untuk setup Node.js tradisional: https://support.hostinger.com/en/articles/1583661-is-node-js-supported-at-hostinger

## Opsi 1: Shared Hosting Biasa

Mode ini hanya cocok bila backend dijalankan di tempat lain, misalnya:

- Hostinger Node.js Web App di subdomain lain
- VPS
- Railway, Render, atau layanan Node lain

### 1. Build frontend

Buat file `artifacts/ac-booking/.env.production`:

```env
VITE_API_BASE_URL=https://api.domainanda.com
BASE_PATH=/
```

Jika backend belum online dan Anda hanya ingin frontend tampil dulu, Anda boleh
mengosongkan `VITE_API_BASE_URL`. Dalam mode ini:

- form booking menampilkan status sementara dan mengarahkan user ke WhatsApp
- halaman `/admin` menampilkan pemberitahuan bahwa backend belum aktif

Lalu jalankan:

```bash
npm run deploy:hostinger:frontend
```

Hasil build ada di:

- `artifacts/ac-booking/dist`

Upload seluruh isi folder `dist` ke `public_html`.

Catatan:

- File `.htaccess` untuk SPA rewrite sudah ikut terbawa ke hasil build
- Route seperti `/admin` akan tetap diarahkan ke `index.html`

Jika website dipasang di subfolder, ubah `BASE_PATH`, contohnya:

```env
BASE_PATH=/booking/
```

Lalu upload hasil `dist` ke folder subdomain/subfolder yang sesuai.

## Opsi 2: Hostinger Node.js Web App

Mode ini cocok jika paket Anda mendukung Node.js Web Apps.

### Frontend

Tetap gunakan:

```env
VITE_API_BASE_URL=https://api.domainanda.com
BASE_PATH=/
```

### Backend

Buat file `artifacts/api-server/.env` atau isi Environment Variables di hPanel:

```env
PORT=3000
DATABASE_URL=postgres://user:password@host:5432/database
ADMIN_TOKEN=token-rahasia-yang-kuat
CORS_ORIGIN=https://domainanda.com,https://www.domainanda.com
```

### Build commands

Frontend:

```bash
npm run build --workspace @workspace/ac-booking
```

Backend:

```bash
npm run build --workspace @workspace/api-server
```

Start backend:

```bash
npm run start --workspace @workspace/api-server
```

Saran struktur domain:

- `https://domainanda.com` untuk frontend
- `https://api.domainanda.com` untuk backend

## Perubahan yang sudah dibuat

- Frontend sekarang mendukung `VITE_API_BASE_URL` untuk API lintas domain/subdomain
- `BASE_PATH` tetap dipakai untuk deploy ke root domain atau subfolder
- Output build frontend sekarang langsung ke `artifacts/ac-booking/dist`
- SPA rewrite ditambahkan lewat `.htaccess`
- Backend sekarang punya default `PORT=3000` bila provider tidak menyuntikkan port
- CORS backend bisa dibatasi lewat `CORS_ORIGIN`

## Yang tetap wajib Anda siapkan

- Database PostgreSQL yang aktif
- Nilai `DATABASE_URL`
- `ADMIN_TOKEN` untuk halaman admin
- Hosting yang memang mendukung Node.js jika API ingin dijalankan di Hostinger
