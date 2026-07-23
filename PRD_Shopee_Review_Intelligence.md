# PRD: Shopee App Review Intelligence Dashboard

**Versi Dokumen:** 1.0
**Durasi Project:** 1–2 minggu (10 hari kerja)
**Target Pengerjaan:** Junior Data Analyst / Data Scientist
**Output Akhir:** Dashboard web (React) di-deploy ke Vercel, berisi analisis sentimen & topik dari review aplikasi Shopee

---

## 1. Latar Belakang & Tujuan

### 1.1 Latar Belakang
Dataset berisi ±(isi jumlah baris sesuai file) review aplikasi Shopee dari Google Play Store. Setiap review memiliki teks (`content`), rating (`score` 1-5), waktu (`at`), versi aplikasi, dan jumlah upvote (`thumbsUpCount`). Data ini merepresentasikan feedback pengguna terhadap kualitas aplikasi (bukan produk yang dijual di Shopee).

### 1.2 Tujuan Project
Membangun dashboard analitik yang membantu tim produk memahami:
1. Bagaimana sentimen pengguna terhadap aplikasi dari waktu ke waktu
2. Apa saja topik/isu utama yang dikeluhkan pengguna
3. Apakah ada versi aplikasi tertentu yang bermasalah (lonjakan komplain)
4. Review mana yang paling representatif/divalidasi komunitas (thumbs up tinggi)

### 1.3 Target Pengguna Dashboard
Product Manager / tim QA yang ingin memonitor kualitas aplikasi berdasarkan feedback pengguna.

---

## 2. Ruang Lingkup (Scope)

### 2.1 Termasuk dalam Scope
- Data cleaning & preprocessing teks Bahasa Indonesia
- Sentiment classification (positif/netral/negatif) menggunakan model klasik (TF-IDF + Logistic Regression, dibandingkan dengan SVM)
- Topic modeling sederhana (LDA) untuk mengelompokkan keluhan
- Analisis tren sentimen per waktu & per versi aplikasi
- Dashboard React dengan visualisasi interaktif, di-deploy ke Vercel
- Dokumentasi & insight report

### 2.2 Tidak Termasuk dalam Scope (Out of Scope)
- IndoBERT / deep learning model (opsional untuk tahap lanjutan setelah MVP selesai)
- Backend API live / database live
- Real-time data update (data bersifat statis hasil analisis satu kali)
- Aspect-Based Sentiment Analysis (ABSA) — bisa jadi pengembangan lanjutan
- Autentikasi user / multi-user dashboard

---

## 3. Arsitektur Sistem

```
[Dataset CSV Kaggle]
        ↓
[Python: Cleaning + Preprocessing]
        ↓
[Python: Sentiment Model + Topic Modeling]
        ↓
[Export hasil analisis → file JSON statis]
        ↓
[React App (fetch JSON saat build/runtime)]
        ↓
[Deploy ke Vercel]
```

**Kenapa statis, bukan backend live?**
Untuk scope 1-2 minggu, pendekatan ini menghilangkan kebutuhan hosting backend terpisah, isu CORS, dan maintenance server — sehingga waktu bisa fokus ke kualitas analisis dan dashboard. Semua data pre-computed di Python lalu di-export sebagai JSON yang di-load oleh React.

---

## 4. Tech Stack

| Layer | Tools |
|---|---|
| Data Processing & Analysis | Python, Pandas, NumPy |
| Text Preprocessing (Bahasa Indonesia) | Sastrawi, NLTK, regex |
| Modeling | Scikit-learn (TF-IDF, Logistic Regression, SVM), Gensim (LDA) |
| Notebook Environment | Jupyter Notebook / Google Colab |
| Frontend Dashboard | React (Vite), Tailwind CSS, Recharts |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## 5. Struktur Folder Project (Wajib Diikuti)

```
shopee-review-intelligence/
├── data/
│   ├── raw/                    # dataset asli, jangan diubah
│   └── processed/              # hasil cleaning
├── notebooks/
│   ├── 01_eda.ipynb
│   ├── 02_preprocessing.ipynb
│   ├── 03_sentiment_modeling.ipynb
│   └── 04_topic_modeling.ipynb
├── outputs/
│   ├── models/                 # model .pkl hasil training
│   └── json/                   # file JSON untuk dashboard
├── dashboard/                  # React app
│   ├── src/
│   ├── public/
│   │   └── data/                # JSON hasil analisis diletakkan di sini
│   └── package.json
├── report/
│   └── insight_report.md
└── README.md
```

---

## 6. Rencana Kerja per Fase (Timeline 10 Hari Kerja)

### FASE 0: Persiapan (Hari 1)
**Tujuan:** Environment siap, data sudah dipahami strukturnya.

**Task:**
- [ ] Setup repo GitHub dengan struktur folder di atas
- [ ] Setup virtual environment Python (`venv` atau `conda`)
- [ ] Install dependencies: `pandas`, `numpy`, `scikit-learn`, `sastrawi`, `nltk`, `gensim`, `matplotlib`, `seaborn`
- [ ] Load dataset, cek jumlah baris, kolom, tipe data
- [ ] Buat `requirements.txt`

**Deliverable:** Repo terstruktur + dataset ter-load tanpa error.

---

### FASE 1: Exploratory Data Analysis / EDA (Hari 2)
**Tujuan:** Memahami karakteristik data sebelum modeling.

**Task:**
- [ ] Cek missing values per kolom (`reviewCreatedVersion`, `appVersion` diprediksi banyak kosong — dokumentasikan persentasenya)
- [ ] Distribusi `score` (1-5) — buat bar chart
- [ ] Distribusi panjang teks review (jumlah kata per review)
- [ ] Volume review per bulan/tahun dari kolom `at`
- [ ] Cek duplikasi review
- [ ] Identifikasi bahasa campuran (Indonesia + slang + emoji + bahasa Inggris)
- [ ] Tulis 5-10 temuan awal di notebook (markdown cell)

**Deliverable:** `01_eda.ipynb` dengan visualisasi + insight tertulis (bukan cuma grafik tanpa penjelasan).

**Kriteria Selesai:** Ada minimal 5 insight tertulis yang menjelaskan "kenapa" pola tersebut terjadi, bukan hanya deskripsi grafik.

---

### FASE 2: Data Preprocessing (Hari 3)
**Tujuan:** Teks siap dipakai untuk modeling.

**Task:**
- [ ] Case folding (lowercase semua teks)
- [ ] Hapus karakter khusus, emoji, URL, angka yang tidak relevan
- [ ] Normalisasi kata slang (buat/cari kamus slang Indonesia sederhana, misal "gk"→"tidak", "bgt"→"banget")
- [ ] Stopword removal menggunakan Sastrawi
- [ ] Stemming menggunakan Sastrawi (opsional — evaluasi apakah stemming membantu atau justru menghilangkan makna penting, dokumentasikan keputusannya)
- [ ] Buat kolom label sentimen dari `score` sebagai proxy:
  - score 1-2 → negatif
  - score 3 → netral
  - score 4-5 → positif
- [ ] Cek distribusi label (apakah imbalanced?), jika ya dokumentasikan rencana penanganannya (misal class_weight di model)
- [ ] Simpan hasil ke `data/processed/`

**Deliverable:** `02_preprocessing.ipynb` + file CSV bersih di `data/processed/`.

**Kriteria Selesai:** Data bersih, kolom label sentimen tersedia, tidak ada nilai null di kolom `content` yang akan dipakai modeling.

---

### FASE 3: Sentiment Modeling (Hari 4-5)
**Tujuan:** Model klasifikasi sentimen yang terukur performanya.

**Task:**
- [ ] Split data train/test (80/20), stratify berdasarkan label
- [ ] Buat TF-IDF vectorizer (unigram + bigram, max_features sesuaikan misal 5000)
- [ ] Train model Logistic Regression
- [ ] Train model SVM (LinearSVC)
- [ ] Evaluasi kedua model: accuracy, precision, recall, F1-score (per kelas, karena kemungkinan imbalanced)
- [ ] Buat confusion matrix untuk masing-masing model
- [ ] Pilih model terbaik, jelaskan alasannya di markdown cell (bukan cuma "karena akurasi lebih tinggi" — tapi juga precision/recall per kelas)
- [ ] Simpan model terpilih (`.pkl`) ke `outputs/models/`
- [ ] Prediksi ulang seluruh dataset dengan model terpilih, simpan hasil prediksi sebagai kolom baru

**Deliverable:** `03_sentiment_modeling.ipynb` + model tersimpan + tabel perbandingan performa 2 model.

**Kriteria Selesai:** Ada perbandingan jelas 2 model dengan metrik lengkap, bukan hanya satu model tanpa pembanding.

---

### FASE 4: Topic Modeling (Hari 5-6)
**Tujuan:** Mengelompokkan keluhan/pujian ke dalam topik otomatis.

**Task:**
- [ ] Fokus pada review dengan sentimen negatif (paling actionable untuk bisnis)
- [ ] Buat dictionary & corpus untuk LDA (Gensim)
- [ ] Coba beberapa jumlah topik (misal 5, 8, 10), evaluasi dengan coherence score
- [ ] Pilih jumlah topik optimal
- [ ] Beri label manual ke masing-masing topik berdasarkan kata kunci dominan (misal Topic 1 dengan kata "lemot, lambat, loading" → beri label "Performance Issue")
- [ ] Assign topik dominan ke setiap review
- [ ] Buat tabel ringkasan: topik, jumlah review, contoh review

**Deliverable:** `04_topic_modeling.ipynb` dengan label topik final dan distribusinya.

**Kriteria Selesai:** Minimal 5 topik teridentifikasi dengan label yang masuk akal (dicek manual dengan membaca sample review per topik).

---

### FASE 5: Export Data untuk Dashboard (Hari 6)
**Tujuan:** Siapkan file JSON yang akan dikonsumsi React.

**Task:**
- [ ] Export `overview.json` — total review, avg rating, % sentimen positif/netral/negatif
- [ ] Export `sentiment_trend.json` — sentimen per bulan
- [ ] Export `version_quality.json` — avg score & % negatif per `reviewCreatedVersion`
- [ ] Export `topics.json` — daftar topik, jumlah, contoh review representatif
- [ ] Export `top_reviews.json` — review dengan thumbsUpCount tertinggi per kategori sentimen
- [ ] Export `wordcloud_data.json` — kata-kata paling sering muncul per sentimen (untuk divisualisasikan sebagai word frequency chart di React, karena word cloud asli lebih mudah dibuat di Python lalu di-embed sebagai gambar, atau gunakan library React seperti `react-wordcloud`)
- [ ] Validasi semua file JSON valid (tidak corrupt, bisa di-parse)
- [ ] Pindahkan semua file JSON ke `dashboard/public/data/`

**Deliverable:** Kumpulan file JSON siap pakai di `outputs/json/` dan `dashboard/public/data/`.

**Kriteria Selesai:** Semua JSON bisa di-load tanpa error di browser console saat testing manual (`fetch` test).

---

### FASE 6: Dashboard Development — React (Hari 7-9)
**Tujuan:** Dashboard interaktif yang menampilkan seluruh insight.

**Setup:**
- [ ] Init project dengan Vite (`npm create vite@latest dashboard -- --template react`)
- [ ] Install Tailwind CSS
- [ ] Install Recharts untuk chart

**Halaman 1: Overview**
- [ ] Card ringkasan: Total Reviews, Average Rating, Positive Rate, Negative Rate
- [ ] Line chart: sentiment trend per bulan
- [ ] Bar chart: distribusi rating (1-5 bintang)
- [ ] Pie/donut chart: proporsi sentimen (positif/netral/negatif)
- [ ] Bar chart horizontal: top 5 topik keluhan

**Halaman 2: Version Quality Tracking**
- [ ] Line/bar chart: avg score per versi aplikasi (urutkan berdasarkan waktu rilis kalau memungkinkan)
- [ ] Highlight versi dengan % sentimen negatif tertinggi
- [ ] Tabel versi dengan detail jumlah review & skor

**Halaman 3: Topic Analysis**
- [ ] List semua topik dengan jumlah review masing-masing
- [ ] Klik topik → tampilkan contoh review yang termasuk topik tersebut
- [ ] Word frequency chart per topik

**Halaman 4: Top Reviews**
- [ ] List review dengan thumbsUpCount tertinggi, dikelompokkan per sentimen
- [ ] Tampilkan: teks review, score, thumbsUpCount, tanggal

**Task tambahan:**
- [ ] Buat komponen reusable untuk card, chart wrapper, loading state
- [ ] Handle loading & error state saat fetch JSON
- [ ] Responsive design (minimal terlihat baik di desktop, boleh basic di mobile)
- [ ] Navigasi antar halaman (React Router atau simple tab state)

**Deliverable:** Dashboard React lengkap 4 halaman, berjalan lokal tanpa error.

**Kriteria Selesai:** Semua chart menampilkan data asli (bukan dummy), tidak ada console error, navigasi antar halaman berfungsi.

---

### FASE 7: Deployment ke Vercel (Hari 9)
**Task:**
- [ ] Push seluruh project ke GitHub (repo publik, karena ini untuk portofolio)
- [ ] Connect repo ke Vercel
- [ ] Set root directory deployment ke folder `dashboard/`
- [ ] Deploy dan verifikasi live URL berfungsi
- [ ] Test semua halaman & chart di live URL (bukan hanya localhost)

**Deliverable:** Live URL dashboard yang bisa diakses publik.

**Kriteria Selesai:** Live URL berfungsi 100% sama seperti versi lokal, tidak ada broken link/data.

---

### FASE 8: Dokumentasi & Insight Report (Hari 10)
**Task:**
- [ ] Tulis `README.md` di root repo: latar belakang, cara menjalankan project, screenshot dashboard, link live demo
- [ ] Tulis `insight_report.md`: minimal 5 insight bisnis konkret dari hasil analisis (contoh format di bawah)
- [ ] Cantumkan limitasi project (misal: label sentimen berbasis proxy dari score, bukan hasil anotasi manual — sehingga ada kemungkinan noise)
- [ ] Cantumkan rencana pengembangan lanjutan (misal: IndoBERT, ABSA)

**Format contoh insight report:**
> **Insight 1:** Sentimen negatif meningkat 18% dalam 3 bulan terakhir, terkonsentrasi pada versi aplikasi X.Y.Z yang dirilis pada [tanggal]. Topik dominan pada periode ini adalah "Performance Issue" (35% dari keluhan), mengindikasikan kemungkinan regresi performa pasca-update tersebut.

**Deliverable:** README lengkap + insight report siap dibaca recruiter/hiring manager.

---

## 7. Definition of Done (Kriteria Project Selesai)

Project dianggap selesai jika:
- [ ] Semua notebook berjalan dari awal sampai akhir tanpa error (`Run All`)
- [ ] Model sentiment memiliki F1-score terdokumentasi untuk tiap kelas
- [ ] Minimal 5 topik teridentifikasi dengan label yang masuk akal
- [ ] Dashboard live di Vercel, semua 4 halaman berfungsi dengan data asli
- [ ] README dan insight report lengkap
- [ ] Repo GitHub rapi, tidak ada file sampah (`.ipynb_checkpoints`, dataset besar tidak di-commit jika >100MB — gunakan `.gitignore`)

---

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Label sentimen dari `score` tidak akurat (mismatch antara rating & teks) | Dokumentasikan sebagai limitasi, sample-check manual 20-30 review untuk validasi kasar |
| Topic modeling menghasilkan topik yang tidak jelas/tumpang tindih | Coba beberapa jumlah topik, gunakan coherence score, dan lakukan pengecekan manual pada sample review |
| Kolom `reviewCreatedVersion`/`appVersion` banyak kosong | Analisis version quality hanya menggunakan subset data yang punya nilai versi, dokumentasikan persentase data yang terpakai |
| Bahasa gaul/typo di review mempersulit preprocessing | Buat kamus normalisasi slang sederhana, tidak perlu sempurna — dokumentasikan sebagai area pengembangan lanjutan |
| Timeline 1-2 minggu terlalu ketat jika stuck di satu fase | Prioritaskan MVP: Fase 0-5 wajib selesai sempurna, Fase 6 (dashboard) boleh dikurangi jumlah chart jika waktu mepet, asal 2 halaman utama (Overview + Version Quality) selesai baik |

---

## 9. Catatan untuk Junior yang Mengerjakan

- Jangan lompat ke modeling sebelum EDA benar-benar dipahami — banyak keputusan preprocessing bergantung pada temuan EDA.
- Setiap keputusan (misal "kenapa pilih Logistic Regression daripada SVM", "kenapa 8 topik bukan 5") harus punya alasan tertulis di notebook, bukan cuma "karena hasilnya lebih bagus". Ini yang akan ditanya saat interview nanti.
- Kalau ada bagian yang stuck lebih dari setengah hari, lebih baik ambil pendekatan yang lebih sederhana dulu (misal skip stemming, atau pakai LDA saja tanpa tuning jumlah topik berlebihan) daripada terjebak di optimisasi berlebihan di awal.
- Commit ke Git secara berkala per fase selesai, bukan satu commit besar di akhir — ini juga menunjukkan proses kerja yang baik ke recruiter yang cek riwayat commit.
