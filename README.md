# 🛍️ Shopee App Review Intelligence Dashboard

[![Python Version](https://img.shields.io/badge/python-3.13-blue.svg)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.4%2B-orange.svg)](https://scikit-learn.org/)
[![Gensim](https://img.shields.io/badge/gensim-4.4.0-green.svg)](https://radimrehurek.com/gensim/)
[![React](https://img.shields.io/badge/react-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/vercel-deployed-black.svg)](https://vercel.com/)

**End-to-End Machine Learning & Analytics Dashboard** untuk menganalisis 85.499 ulasan pengguna aplikasi Shopee Indonesia di Google Play Store. Proyek ini memadukan pemrosesan bahasa alami (NLP), pemodelan sentimen terawasi (Supervised Sentiment Classification), Topic Modeling tak terawasi (LDA), serta dashboard interaktif React.

🔗 **GitHub Repository:** [https://github.com/Faliqulxx/Shopee-App-Review-Intelligence-Dashboard](https://github.com/Faliqulxx/Shopee-App-Review-Intelligence-Dashboard)  
📊 **Live Dashboard Demo:** *(Lihat bagian Deployment Vercel di bawah)*

---

## 📌 Latar Belakang & Masalah Bisnis

Shopee adalah platform e-commerce terbesar di Indonesia dengan puluhan juta pengguna aktif. Setiap hari, ribuan ulasan masuk di Google Play Store yang berisi masukan berharga, keluhan bug, kendala kurir, hingga pujian promo.

**Tantangan Utama:**
1. **Volume Data Terlalu Besar:** Membaca puluhan ribu ulasan secara manual tidak efisien bagi tim Product Manager, QA, dan Customer Support.
2. **Ulasan Ambigu & Emosional:** Rating 1-5 bintang sering kali tidak menggambarkan alasan spesifik di balik ketidakpuasan pengguna.
3. **Deteksi Regresi Versi:** Sulit mengetahui secara cepat apakah pembaharuan versi aplikasi terbaru menyebabkan lonjakan bug atau keluhan performa.

**Solusi Proyek Ini:**
Membangun pipeline NLP end-to-end yang otomatis membersihkan teks ulasan gaul/typo Bahasa Indonesia, mengklasifikasikan sentimen ulasan menggunakan **LinearSVC** (Weighted F1 = 0.7662), mengelompokkan keluhan ke dalam **8 Topik Utama (LDA)**, dan menyajikannya dalam **Dashboard React** interaktif.

---

## 🏗️ Arsitektur End-to-End Pipeline

```
[Raw Dataset: 85,500 reviews]
       │
       ▼
[01. Exploratory Data Analysis (EDA)] ──► 4 Visualisasi Plots & 10 Insight
       │
       ▼
[02. Text Preprocessing] ─────────────► Normalisasi Slang (50+ kata), Selective Stopwords, Regex
       │
       ▼
[03. Sentiment Modeling & Experiments]► Train/Test Split (80/20), TF-IDF (5000 feat), 
       │                                LinearSVC vs Logistic Regression (LinearSVC Terpilih)
       │                                5-Fold Cross Validation & Imbalanced Data Experiments (SMOTE)
       ▼
[04. LDA Topic Modeling] ─────────────► Coherence Score Optimization (8 Topics, C_v = 0.4669),
       │                                Business Topic Labeling & Assignment
       ▼
[05. JSON Pipeline Export] ───────────► 6 Struct JSON (overview, trend, version, topics, top reviews, wordcloud)
       │
       ▼
[06. React Interactive Dashboard] ────► 4 Pages (Overview, Version Quality, Topic Analysis, Top Reviews)
       │
       ▼
[07. Vercel Deployment & GitHub Push] ─► Live Web Application
```

---

## 📈 Metrik Evaluasi Model & Temuan Eksperimen

### 1. Sentiment Classification Model Comparison

| Metrik | Logistic Regression | LinearSVC (SVM) 🏆 |
|---|---|---|
| **Accuracy** | 0.7179 | **0.7596** |
| **Macro F1-Score** | 0.6340 | **0.6352** |
| **Weighted F1-Score** | 0.7493 | **0.7662** |
| **F1-Score Negatif (Rating 1-2)** | 0.7497 | **0.7913** |
| **F1-Score Netral (Rating 3)** | **0.3096** | 0.2643 |
| **F1-Score Positif (Rating 4-5)** | 0.8425 | **0.8499** |

*   **Model Terpilih:** **LinearSVC** dikonfirmasi paling optimal berdasarkan Weighted F1 dan akurasi global.
*   **5-Fold Stratified Cross Validation:** LinearSVC menghasilkan Mean Accuracy `0.7587 ± 0.0040` dan Mean Weighted F1 `0.7647 ± 0.0031` — membuktikan performa model **sangat konsisten dan robust**.

### 2. LDA Topic Modeling (Negative Complaints)
*   **Coherence Score ($C_v$):** **0.4669** pada 8 Topik (terbukti paling interpretable dibanding 5 dan 10 topik).
*   **8 Topik Keluhan Teridentifikasi:**
    1. `General App Experience` (57.04%) — Pengalaman penggunaan aplikasi secara umum.
    2. `Customer Support & Service` (20.34%) — Keluhan respon CS dan pembekuan akun/layanan.
    3. `Delivery & Logistics Delay` (10.94%) — Keterlambatan pengiriman paket & jasa ekspedisi.
    4. `Shipping Fee & Vouchers` (5.41%) — Keluhan kenaikan ongkir & gratis ongkir.
    5. `Payment & ShopeePay Issue` (2.24%) — Kendala transaksi & saldo ShopeePay.
    6. `Seller & Refund Dispute` (1.85%) — Masalah pengembalian dana & toko tidak amanah.
    7. `App Performance & Lag` (1.83%) — Aplikasi lemot, loading berat, & crash pasca-update.
    8. `Account & Verification Bug` (0.32%) — Kendala OTP, login akun, & verifikasi.

---

## 💻 Fitur Dashboard React (4 Halaman)

1. 📊 **Overview Analytics:** KPI Cards (Total Reviews, Avg Rating, Positive/Negative Rate), Line Chart Trend Bulanan, Donut Chart Sentimen, Bar Chart Sebaran Rating (1-5 ⭐), dan Top 5 Keluhan Negatif.
2. 📱 **Version Quality Tracking:** Combo Chart Avg Rating vs % Negatif per Versi Aplikasi (`reviewCreatedVersion`), Card Highlight Versi Bermasalah, serta Tabel Interaktif lengkap dengan Search & Filter.
3. 🎯 **Topic Analysis:** Grid 8 Kartu Topik LDA, Tag Kata Kunci Dominan, Detail View Interaktif dengan Visualisasi Frekuensi Kata & Contoh Review Representatif.
4. ⭐ **Top Impact Reviews:** Kartu Ulasan ber-`thumbsUpCount` tertinggi, Filter Sentimen (Positif, Netral, Negatif), dan Search Box pencarian ulasan.

---

## 📁 Struktur Repositori

```
├── dashboard/                  # Aplikasi Web Dashboard React + Vite + Tailwind CSS
│   ├── public/data/            # 6 File JSON yang dikonsumsi Dashboard
│   ├── src/                    # Source Code Components & Pages React
│   ├── package.json
│   ├── tailwind.config.js
│   └── vercel.json             # Konfigurasi Vercel SPA Deployment
├── data/
│   ├── raw/                    # Dataset mentah scrapped_Shopee 12.12.csv
│   └── processed/              # Data bersih shopee_reviews_final.csv (85,499 baris)
├── docs/
│   ├── walkthrough.md          # Ringkasan progres per tahap
│   └── insight_report.md       # Laporan 5+ Insight Bisnis & Rekomendasi
├── notebooks/                  # 6 Jupyter Notebooks Pembelajaran & Eksperimen
│   ├── 01_eda.ipynb            # Exploratory Data Analysis
│   ├── 02_preprocessing.ipynb  # Cleaning & Normalisasi Bahasa Gaul
│   ├── 03_sentiment_modeling.ipynb # Logistic Regression vs LinearSVC
│   ├── 03b_sentiment_experiments.ipynb # Cross-Val & SMOTE Experiments
│   ├── 04_topic_modeling.ipynb # LDA Gensim Topic Modeling
│   └── 05_dashboard_export.ipynb # Pipeline JSON Exporter
├── outputs/
│   ├── json/                   # Export JSON data
│   ├── models/                 # Model tersimpan (.pkl & .model)
│   └── plots/                  # 10 Grafik visualisasi PNG
├── requirements.txt            # Dependensi Python
└── README.md                   # Dokumentasi Utama Proyek
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### 1. Menjalankan Pipeline Python / Notebooks
```bash
# Clone repositori
git clone https://github.com/Faliqulxx/Shopee-App-Review-Intelligence-Dashboard.git
cd "Shopee App Review Intelligence Dashboard"

# Install dependensi Python
pip install -r requirements.txt

# Jalankan notebook di Jupyter / VS Code
jupyter lab
```

### 2. Menjalankan Dashboard React Lokal
```bash
# Masuk ke folder dashboard
cd dashboard

# Install dependensi npm
npm install

# Menjalankan dev server lokal
npm run dev
```
Buka browser di `http://localhost:3000/`.

---

## 🌐 Deploy ke Vercel

1. Login ke [Vercel](https://vercel.com/new) dan hubungkan akun GitHub Anda.
2. Impor repositori **`Faliqulxx/Shopee-App-Review-Intelligence-Dashboard`**.
3. Di halaman konfirmasi project:
   * **Root Directory:** Set ke `dashboard`
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. Klik **Deploy**.

---

## 📄 Laporan Insight Bisnis & Dokumentasi Tambahan

Detail laporan bisnis 5+ insight konkret, limitasi proyek, dan rencana pengembangan lanjutan (IndoBERT & ABSA) dapat dibaca pada [docs/insight_report.md](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/docs/insight_report.md).
