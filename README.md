# RSA API

## Deskripsi

RSA API adalah aplikasi backend yang dibangun menggunakan Node.js dan Express.js untuk manajemen sistem organisasi. API ini menyediakan fitur autentikasi pengguna, manajemen divisi, struktural, dan izin dengan menggunakan JSON Web Tokens (JWT) dan enkripsi RSA untuk keamanan.

## Fitur

- **Autentikasi Pengguna**: Registrasi, login, dan verifikasi menggunakan JWT dan HMAC.
- **Manajemen User**: Membuat, mengupdate, dan menghapus pengguna dengan level akses berbeda (superadmin, owner).
- **Manajemen Divisi**: Operasi CRUD untuk divisi organisasi.
- **Manajemen Struktural**: Operasi CRUD untuk struktur organisasi.
- **Manajemen Izin**: Operasi CRUD untuk izin pengguna.
- **Enkripsi RSA**: Pembuatan pasangan kunci RSA untuk keamanan data.
- **Middleware Keamanan**: Middleware untuk memverifikasi role pengguna (superadmin, owner).

## Teknologi yang Digunakan

- **Node.js**: Runtime JavaScript.
- **Express.js**: Framework web untuk Node.js.
- **MySQL**: Database relasional dengan Sequelize ORM.
- **JWT**: Untuk autentikasi token.
- **Bcrypt**: Untuk hashing password.
- **Crypto**: Untuk pembuatan kunci RSA.
- **CORS**: Untuk mengizinkan cross-origin requests.
- **Dotenv**: Untuk manajemen variabel environment.

## Instalasi

1. **Clone Repository**:
   ```bash
   git clone https://github.com/dikigambol/rsa-api.git
   cd rsa-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Buat file `.env` di root directory dan isi dengan:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

4. **Setup Database**:
   Pastikan MySQL berjalan dan buat database sesuai dengan konfigurasi di `.env`.

5. **Jalankan Server**:
   ```bash
   npm start
   ```

   Server akan berjalan di `http://localhost:3000`.

## Penggunaan

### Endpoint Utama

- `GET /`: Memeriksa status API.
- `/users`: Endpoint untuk manajemen pengguna.
- `/divisi`: Endpoint untuk manajemen divisi.
- `/struktural`: Endpoint untuk manajemen struktural.
- `/izin`: Endpoint untuk manajemen izin.

### Contoh Request

Untuk membuat pengguna baru:
```bash
POST /users
Content-Type: application/json

{
  "no_pegawai": "12345",
  "nama": "John Doe",
  "level_user": "user"
}
```

## Struktur Proyek

```
rsa-api/
├── app.js                 # Entry point aplikasi
├── package.json           # Dependencies dan scripts
├── config/
│   └── db.js              # Konfigurasi database
├── controllers/           # Logic untuk setiap endpoint
│   ├── usersController.js
│   ├── divisiController.js
│   ├── strukturalController.js
│   └── izinController.js
├── function/
│   └── generateKeys.js    # Fungsi pembuatan kunci RSA
├── middlewares/           # Middleware autentikasi dan otorisasi
│   ├── requireOwner.js
│   ├── requireOwnerHMAC.js
│   ├── requireSuperadmin.js
│   └── requireSuperadminHMAC.js
├── models/                # Model database Sequelize
│   ├── userModel.js
│   ├── detailUserModel.js
│   ├── divisiModel.js
│   ├── strukturalModel.js
│   └── izinModel.js
├── routes/                # Definisi routes
│   ├── userRoutes.js
│   ├── divisiRoutes.js
│   ├── strukturalRoutes.js
│   └── izinRoutes.js
└── secrets/
    └── keys/              # Penyimpanan kunci RSA
```

## Kontribusi

1. Fork repository ini.
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`).
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`).
4. Push ke branch (`git push origin feature/AmazingFeature`).
5. Buat Pull Request.

## Lisensi

Proyek ini menggunakan lisensi ISC.