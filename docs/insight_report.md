# 📊 Laporan Insight Bisnis & Rekomendasi Strategis: Analisis Ulasan Aplikasi Shopee Indonesia

**Project:** Shopee App Review Intelligence Dashboard  
**Ukuran Sample Analisis:** 85.499 Ulasan Pengguna Google Play Store (2015 – 2023)  
**Metodologi ML:** Pemodelan Sentimen Supervised (LinearSVC, Weighted F1 = 0.7662) & Topic Modeling Unsupervised (LDA Gensim, 8 Topik, Coherence $C_v$ = 0.4669).

---

## 🎯 Executive Summary

Berdasarkan analisis NLP terotomatisasi terhadap 85.499 ulasan pengguna aplikasi Shopee di Indonesia, ditemukan bahwa kualitas pengalaman pengguna (*user experience*) dan persepsi terhadap aplikasi sangat sensitif terhadap dua area utama: **Stabilitas Fitur / Update Aplikasi** dan **Responsivitas Layanan Pelanggan (CS)**. 

Dari total 38.506 ulasan bersentimen negatif (45.04% dari total ulasan), sebanyak **77.38% keluhan terpusat pada isu performa aplikasi umum dan masalah layanan pelanggan**. Laporan ini menyajikan 5 insight bisnis konkret beserta rekomendasi aksi strategis bagi Tim Produk, Engineering, Operasional Logistik, dan Customer Support Shopee.

---

## 💡 5 Insight Bisnis Utama & Rekomendasi Aksi

### Insight 1: Fenomena Polarisasi Ekstrim Ulasan (High Bimodal Polarization)
*   **Temuan Data:** Sebaran rating ulasan Shopee sangat terpolarisasi pada dua kutub ekstrim: **Bintang 1 (34.89% — 29.831 ulasan)** dan **Bintang 5 (35.25% — 30.135 ulasan)**. Rating menengah seperti Bintang 2 (8.19%), Bintang 3 (9.99%), dan Bintang 4 (11.68%) berjumlah sangat minoritas.
*   **Analisis Bisnis:** Pengguna Shopee cenderung memberikan ulasan di Play Store hanya pada dua kondisi emosional ekstrim: saat merasa sangat terpuaskan oleh promo/transaksi lancar (*Love-it*) atau saat mengalami kendala kritis/kerugian finansial (*Hate-it*). 
*   **Rekomendasi Aksi:**
    1. Implementasikan in-app rating prompt secara cerdas (*in-app review API*) pada moment gembira pengguna (misal: tepat setelah paket berhasil diterima atau klaim cashback berhasil) untuk mendorong lebih banyak rating positif alamiah dari pengguna pasif.
    2. Cegah pengguna yang mengalami kendala teknis/gagal checkout langsung meluapkan kekecewaan di Google Play Store dengan menyediakan jalan pintas *Fast-Track Customer Care Chat* di halaman transaksi yang gagal.

---

### Insight 2: Dua Topik Keluhan Mendominasi 77.38% Ulasan Negatif
*   **Temuan Data:** Dari 8 topik keluhan hasil pemodelan LDA pada ulasan negatif:
    *   **Topic 1 (General App Experience):** 21.965 ulasan (**57.04%** dari keluhan negatif).
    *   **Topic 5 (Customer Support & Service):** 7.834 ulasan (**20.34%** dari keluhan negatif).
    *   **Topic 7 (Delivery & Logistics Delay):** 4.214 ulasan (**10.94%** dari keluhan negatif).
*   **Analisis Bisnis:** Keluhan pengguna sebagian besar tidak berasal dari barang yang dijual seller, melainkan dari **kerumitan antarmuka/iklan bawaan aplikasi** dan **kekecewaan atas lambatnya penyelesaian komplain oleh Customer Service / pembekuan akun tanpa kejelasan**.
*   **Rekomendasi Aksi:**
    1. **Tim UI/UX & Produk:** Evaluasi ulang intensitas pop-up iklan & video promosi otomatis (*Shopee Video/Iklan TV*) yang dirasakan pengguna memperberat loading aplikasi.
    2. **Tim CS Operations:** Tingkatkan otomatisasi resolusi tiket bantuan (bot CS) dan percepat *SLA penanganan komplain pembekuan akun/kendala pencairan dana*.

---

### Insight 3: Deteksi Regresi Kualitas per Rilis Versi Aplikasi (Version Quality Regression)
*   **Temuan Data:** Hasil penelusuran kualitas ulasan per versi aplikasi (`reviewCreatedVersion`) menunjukkan variasi tingkat kekecewaan pengguna yang signifikan pasca-update versi tertentu:
    *   Beberapa versi rilis mengalami **persentase keluhan negatif di atas 50%**, disertai penurunan skor rating rata-rata hingga di bawah 2.8 ⭐.
    *   Topik utama yang melonjak pada versi-versi bermasalah ini adalah **Topic 6 (App Performance & Lag)** dan **Topic 3 (Account & Verification Bug)**.
*   **Analisis Bisnis:** Terjadi regresi teknis (*performance regression*) atau *unhandled edge-case bugs* pada pembaruan aplikasi tertentu yang tidak terdeteksi secara optimal selama tahap Staging/QA testing internal.
*   **Rekomendasi Aksi:**
    1. **Tim QA & Mobile Engineering:** Integrasikan *App Health Alert Dashboard* yang memantau rasio ulasan negatif Play Store secara real-time pada 24-48 jam pertama pasca-rilis versi baru (*Staged Rollout Monitoring*).
    2. Jika suatu versi baru memicu lonjakan ulasan negatif > 45%, segera hentikan persentase *rollout* di Play Store Console dan lakukan investigasi crash/lag log.

---

### Insight 4: Sensitivitas Pembeli Terhadap Kebijakan Ongkir & Syarat Voucher
*   **Temuan Data:** **Topic 4 (Shipping Fee & Vouchers)** mencakup **2.085 ulasan negatif (5.41%)** dengan kata kunci dominan: *kirim, ongkos, gratis, sekarang, dulu, belanja, shopee, pilih, voucher, mahal*.
*   **Analisis Bisnis:** Terdapat sentimen nostalgia kekecewaan pembeli yang merasa kebijakan *Gratis Ongkir* Shopee semakin ketat dibanding masa awal (misal: batas minimum belanja dinaikkan dari Rp30.000 menjadi lebih tinggi, atau potongan ongkir tidak lagi menutupi 100% biaya pengiriman luar pulau).
*   **Rekomendasi Aksi:**
    1. **Tim Growth & Marketing:** Lakukan transparansi komunikasi syarat & ketentuan voucher gratis ongkir di antarmuka checkout.
    2. Buat skema loyalty tier (misal: Shopee Loyalty Silver/Gold/Platinum) yang memberikan kuota gratis ongkir tanpa minimum belanja bagi pembeli setia untuk menjaga *retention rate*.

---

### Insight 5: Kegagalan Transaksi ShopeePay & Pembayaran Berdampak Langsung ke GMV
*   **Temuan Data:** **Topic 0 (Payment & ShopeePay Issue)** mencakup **864 ulasan negatif (2.24%)** dan **Topic 3 (Account & Verification Bug)** mencakup 125 ulasan (0.32%). Kata kunci: *saldo, shopeepay, pay, bayar, pembayaran, topup, verifikasi, otp, login*.
*   **Analisis Bisnis:** Meskipun persentase ulasan terkesan kecil (2.24%), kendala pada proses pembayaran & e-wallet ShopeePay berdampak **sangat langsung pada penurunan Gross Merchandise Value (GMV)** dan *checkout conversion rate*. Pengguna yang saldonya terpotong namun transaksi gagal cenderung memberikan ulasan bintang 1 secara emosional.
*   **Rekomendasi Aksi:**
    1. **Tim FinTech & Payment Gateway:** Buat sistem otomatisasi *Instant Refund* untuk transaksi ShopeePay yang menggantung/gagal sistem agar saldo langsung kembali dalam waktu < 5 menit tanpa perlu pengguna menghubungi CS.

---

## ⚠️ Limitasi Proyek & Metodologi

1. **Proxy Sentiment Labeling:** Label sentimen diawal diautomasi menggunakan proxy rating (`score 1-2` = Negatif, `score 3` = Netral, `score 4-5` = Positif). Pada beberapa sampel, ditemukan ketidaksesuaian (*mismatch*) antara rating dan teks (misal pengguna memberikan rating 5 namun teks berisi sindiran/kritik).
2. **Performa Klasifikasi Kelas Netral:** Pada model ML (LinearSVC), F1-Score kelas Netral relatif rendah (~0.26). Hal ini disebabkan karena teks ulasan rating 3 secara bahasa memang memiliki ambiguitas semantik yang sangat tinggi (mengandung campuran pujian dan keluhan sekaligus).
3. **Pemberhentian Stemming:** Stemming Sastrawi dilewati (*skipped*) pada pipeline preprocessing untuk menghemat waktu komputasi (~3-4 jam) dan menjaga integritas kata unik (misal *pengiriman* vs *kirim*).

---

## 🚀 Rencana Pengembangan Lanjutan (Roadmap)

1. **Implementasi Deep Learning (IndoBERT / Indonesian RoBERTa):** Melakukan fine-tuning model pre-trained transformer IndoBERT untuk mengatasi ketidakseimbangan kelas Netral dan menangkap makna sarkasme/konteks kalimat secara jauh lebih akurat dibanding TF-IDF.
2. **Aspect-Based Sentiment Analysis (ABSA):** Mengembangkan model sentimen berbasis aspek untuk menilai sentimen secara terpisah pada aspek *Fitur Aplikasi*, *Harga/Promo*, *Kurir/Logistik*, dan *Seller*.
3. **Automated Scraping & MLOps Pipeline:** Membangun pipeline otomatis (cron job / Apache Airflow) yang secara berkala mengambil ulasan harian terbaru Play Store, menjalankan inferensi model, dan meng-update file JSON dashboard secara real-time.
