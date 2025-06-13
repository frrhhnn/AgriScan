# AgriScan - Sistem Deteksi Penyakit Tanaman Berbasis AI

AgriScan adalah platform web modern yang menggunakan teknologi kecerdasan buatan (AI) untuk membantu petani mengidentifikasi dan menangani penyakit tanaman dengan cepat dan akurat. Sistem ini dikembangkan dengan Next.js dan teknologi web terdepan lainnya.

## 🌟 Fitur Utama

- **Deteksi Penyakit Berbasis AI**: Analisis gambar tanaman menggunakan machine learning untuk identifikasi penyakit
- **Akurasi Tinggi**: Tingkat akurasi deteksi mencapai 95% untuk berbagai jenis penyakit tanaman
- **Antarmuka Modern**: Desain responsif dan user-friendly yang mudah digunakan
- **Panduan Lengkap**: Rekomendasi penanganan dan solusi untuk setiap penyakit yang terdeteksi
- **Konten Edukatif**: Artikel dan video tutorial untuk edukasi petani
- **Multi-Platform**: Dapat diakses melalui desktop, tablet, dan smartphone

## 🔧 Teknologi yang Digunakan

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Tailwind CSS Animate
- **Form Handling**: React Hook Form
- **Package Manager**: pnpm

## 🚀 Instalasi dan Setup

### Prasyarat
- Node.js (versi 18 atau lebih baru)
- pnpm (package manager)

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone [URL_REPOSITORY]
   cd agriscan
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup environment variables**
   Buat file `.env.local` dan konfigurasikan variabel environment yang diperlukan:
   ```env
   # Tambahkan konfigurasi sesuai kebutuhan
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. **Jalankan development server**
   ```bash
   pnpm dev
   ```

5. **Akses aplikasi**
   Buka browser dan akses `http://localhost:3000`

### Build untuk Production

```bash
# Build aplikasi
pnpm build

# Jalankan production server
pnpm start
```

## 📁 Struktur Proyek

```
agriscan/
├── app/                    # App Router Next.js
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Komponen React
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
└── types/                # TypeScript type definitions
```

## 📖 Panduan Penggunaan

1. **Upload Foto**: Ambil foto daun tanaman yang terindikasi penyakit
2. **Analisis AI**: Sistem akan menganalisis gambar menggunakan machine learning
3. **Hasil Diagnosis**: Dapatkan hasil identifikasi penyakit dan rekomendasi penanganan
4. **Akses Konten Edukatif**: Pelajari lebih lanjut melalui artikel dan video tutorial

## 🛠️ Development

### Menjalankan Linter

```bash
pnpm lint
```

### Type Checking

```bash
pnpm type-check
```

### Format Code

```bash
pnpm format
```

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

---

**AgriScan** - Memberdayakan petani dengan teknologi AI untuk pertanian yang lebih cerdas dan berkelanjutan.
