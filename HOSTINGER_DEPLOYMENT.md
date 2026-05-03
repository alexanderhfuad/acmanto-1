# Deploy ke Hostinger

## Ringkasannya

Project ini terdiri dari:

- Frontend Vite/React di `artifacts/ac-booking`
- Backend Node/Express di `artifacts/api-server`
- Database MySQL untuk API booking

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

## Urutan deploy yang disarankan

Untuk repo ini, deploy dalam urutan berikut:

1. Deploy backend lebih dulu
2. Salin URL backend yang diberikan Hostinger
3. Isi `VITE_API_BASE_URL` di frontend dengan URL backend tersebut
4. Deploy frontend

Alasannya: frontend membutuhkan URL backend saat proses build.

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
ADMIN_TOKEN=token-rahasia-yang-kuat
CORS_ORIGIN=https://domainanda.com,https://www.domainanda.com
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=user_database
MYSQL_PASSWORD=password_database
MYSQL_DATABASE=nama_database
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

## Setting Hostinger: backend

Gunakan satu Node.js App khusus untuk backend.

- `Preset framework`: `Other`
- `Branch`: `main`
- `Node version`: `22.x`
- `Root directory`: `./`
- `Build command`: `npm run build:api`
- `Package manager`: `npm`
- `Output directory`: kosongkan
- `Entry file`: `artifacts/api-server/dist/index.mjs`

Environment Variables:

- `ADMIN_TOKEN`: token admin yang kuat
- `CORS_ORIGIN`: `https://domain-frontend-anda.com,https://www.domain-frontend-anda.com`
- `MYSQL_HOST`: host MySQL dari hPanel, sering kali `localhost`
- `MYSQL_PORT`: `3306`
- `MYSQL_USER`: username database MySQL
- `MYSQL_PASSWORD`: password database MySQL
- `MYSQL_DATABASE`: nama database MySQL

Catatan:

- Repo ini adalah monorepo workspace, jadi `Root directory` backend harus `./`, bukan `artifacts/api-server`
- Jika `Root directory` diisi `artifacts/api-server`, dependency workspace internal tidak akan terpasang dengan benar
- Backend akan membuat tabel `bookings` otomatis saat startup jika belum ada

## Setting Hostinger: frontend

Gunakan Node.js App kedua khusus untuk frontend.

- `Preset framework`: `Other`
- `Branch`: `main`
- `Node version`: `22.x`
- `Root directory`: `./`
- `Build command`: `npm run build:frontend`
- `Package manager`: `npm`
- `Output directory`: `artifacts/ac-booking/dist`
- `Entry file`: kosongkan

Environment Variables:

- `BASE_PATH`: `/`
- `VITE_API_BASE_URL`: URL backend dari app backend Hostinger Anda

Contoh:

- `VITE_API_BASE_URL=https://api.domainanda.com`

Catatan:

- `Root directory` frontend juga harus `./` karena frontend memakai package workspace internal `@workspace/api-client-react`
- `Output directory` mengarah ke folder hasil build Vite di dalam monorepo
- `Entry file` tidak perlu diisi karena frontend ini dibuild sebagai static output

## Jika memakai domain dan subdomain

Contoh mapping yang disarankan:

- Frontend: `https://dinginpro.com`
- Backend: `https://api.dinginpro.com`

Maka:

- `VITE_API_BASE_URL=https://api.dinginpro.com`
- `CORS_ORIGIN=https://dinginpro.com,https://www.dinginpro.com`

## Perubahan yang sudah dibuat

- Frontend sekarang mendukung `VITE_API_BASE_URL` untuk API lintas domain/subdomain
- `BASE_PATH` tetap dipakai untuk deploy ke root domain atau subfolder
- Output build frontend sekarang langsung ke `artifacts/ac-booking/dist`
- SPA rewrite ditambahkan lewat `.htaccess`
- Backend sekarang punya default `PORT=3000` bila provider tidak menyuntikkan port
- CORS backend bisa dibatasi lewat `CORS_ORIGIN`

## Yang tetap wajib Anda siapkan

- Database MySQL yang aktif
- `ADMIN_TOKEN` untuk halaman admin
- Hosting yang memang mendukung Node.js jika API ingin dijalankan di Hostinger
