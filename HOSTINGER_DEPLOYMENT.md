# Deploy ke Hostinger Business

## Struktur final

Struktur repo sekarang sudah disiapkan mengikuti pola deploy yang lebih cocok untuk Hostinger:

```text
project/
├─ frontend/
│  ├─ .env.production.example
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.ts
│  ├─ public/
│  └─ src/
├─ backend/
│  ├─ .env.example
│  ├─ package.json
│  ├─ build.mjs
│  ├─ drizzle.config.ts
│  ├─ src/
│  └─ db/
│     ├─ index.ts
│     └─ schema.ts
```

Catatan:

- `frontend/` sekarang bisa dibuild sendiri tanpa workspace root lama
- `backend/` sekarang bisa dijalankan sendiri tanpa `lib/*`
- struktur lama di `artifacts/` dan `lib/` masih disimpan sebagai referensi, tetapi deploy Hostinger sebaiknya pakai `frontend/` dan `backend/`

## Stack

- Frontend: React 19 + Vite 7 + TypeScript + Tailwind CSS
- Backend: Node.js + Express 5 + TypeScript
- ORM: Drizzle ORM
- Database production untuk Hostinger Business: MySQL

## Urutan deploy

1. Deploy backend dulu
2. Catat URL backend yang diberikan Hostinger atau hubungkan ke `api.demokita.my.id`
3. Isi `VITE_API_BASE_URL` di frontend
4. Deploy frontend

## Environment final

### Frontend

File `frontend/.env.production`:

```env
BASE_PATH=/
VITE_API_BASE_URL=https://api.demokita.my.id
```

### Backend

Environment Variables di app backend Hostinger:

```env
PORT=3000
ADMIN_TOKEN=demokita_admin_2026_x9KpL2mQ7rT8vN4
CORS_ORIGIN=https://demokita.my.id,https://www.demokita.my.id
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=ISI_DARI_HOSTINGER
MYSQL_PASSWORD=ISI_DARI_HOSTINGER
MYSQL_DATABASE=ISI_DARI_HOSTINGER
```

Jika hPanel memberi host MySQL selain `localhost`, pakai nilai dari hPanel.

## Setting Hostinger: backend

Buat satu Node.js App untuk backend.

- `Preset framework`: `Other`
- `Branch`: `main`
- `Node version`: `22.x`
- `Root directory`: `backend`
- `Build command`: `npm run build`
- `Package manager`: `npm`
- `Output directory`: kosongkan
- `Entry file`: `dist/index.mjs`

Environment Variables:

- `PORT=3000`
- `ADMIN_TOKEN=...`
- `CORS_ORIGIN=https://demokita.my.id,https://www.demokita.my.id`
- `MYSQL_HOST=localhost`
- `MYSQL_PORT=3306`
- `MYSQL_USER=...`
- `MYSQL_PASSWORD=...`
- `MYSQL_DATABASE=...`

Catatan:

- backend akan membuat tabel `bookings` otomatis saat startup bila belum ada
- `Entry file` memakai path relatif dari folder `backend`

## Setting Hostinger: frontend

Buat Node.js App kedua untuk frontend.

- `Preset framework`: `Other`
- `Branch`: `main`
- `Node version`: `22.x`
- `Root directory`: `frontend`
- `Build command`: `npm run build`
- `Package manager`: `npm`
- `Output directory`: `dist`
- `Entry file`: kosongkan

Environment Variables:

- `BASE_PATH=/`
- `VITE_API_BASE_URL=https://api.demokita.my.id`

## Domain yang disarankan

- Frontend: `https://demokita.my.id`
- Backend: `https://api.demokita.my.id`

Maka:

- `VITE_API_BASE_URL=https://api.demokita.my.id`
- `CORS_ORIGIN=https://demokita.my.id,https://www.demokita.my.id`

## Verifikasi

Sudah diverifikasi di lokal:

- `frontend`: typecheck lolos
- `frontend`: build produksi lolos
- `backend`: typecheck lolos
- `backend`: build produksi lolos
