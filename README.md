# WEFGIS Keycloak Service & PostGIS

Standalone Keycloak identity provider with custom WEFGIS login theme and dedicated PostGIS database.

## Struktur Direktori
\keycloak/
├── docker-compose.yml       # Konfigurasi container Keycloak & PostGIS
├── .env.example             # Template environment variables
├── .env                     # Environment variables aktif (jangan commit ke Git)
├── import/
│   └── astra-realm.json     # Backup realm configuration Keycloak
├── init/
│   └── 01-init-keycloak.sql # Initial database dump (otomatis dieksekusi saat volume kosong)
└── theme/                   # Project Keycloakify custom theme (React + Tailwind)
    ├── package.json
    ├── Dockerfile           # Multi-stage builder JAR (tanpa butuh Maven di host)
    ├── src/
    └── dist_keycloak/
        └── keycloak-theme-for-kc-all-other-versions.jar # JAR theme siap pakai (sudah dibundle ke Git)
\
## Menjalankan Container
1. Buat file \.env\ jika belum ada:
   \\ash
   cp .env.example .env
   \2. Jalankan docker compose:
   \\ash
   docker compose up -d
   \
## Informasi Akses
- **Keycloak Web Admin & SSO**: \http://localhost:8081  - Realm default: \stra  - Admin username: \dmin  - Admin password: \iamhandsome\ (lihat \.env\)
- **PostGIS Keycloak (Host)**: \localhost:5433  - Database: \keycloak  - Username: \keycloak_svc  - Password: \keycloaksvc123  - Extensions: \postgis\ (versi 3.4.3 aktif)

## Menghubungkan pgAdmin (Numpang di pgAdmin db-central)
Container \keycloak-db\ terhubung ke docker network \db-central-net\ dengan alias \keycloak-db\.
Untuk melihat database Keycloak di pgAdmin central (\http://localhost:5050\):
1. Buka pgAdmin -> Klik kanan **Servers** -> **Register** -> **Server...**
2. Di tab **General**:
   - Name: \Keycloak PostGIS3. Di tab **Connection**:
   - Host name/address: \keycloak-db   - Port: ţ2   - Maintenance database: \keycloak   - Username: \keycloak_svc   - Password: \keycloaksvc123\ (Save password dicentang)
4. Klik **Save**. Database Keycloak beserta extension PostGIS akan langsung terbaca di pgAdmin central.

## Build Ulang Custom Theme
Jika Anda mengubah tampilan login/register di folder \	heme/src/\:

**Cara 1 (Rekomendasi - menggunakan Docker, tanpa butuh Maven di host):**
\\ash
cd theme
docker build --output dist_keycloak .
\
**Cara 2 (Host Maven):**
\\ash
cd theme
npm run build-keycloak-theme
\
Setelah build selesai, restart container Keycloak untuk memuat tema baru:
\\ash
docker compose restart keycloak
\