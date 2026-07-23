# Walkthrough - Shopee App Review Intelligence Dashboard

## Tahap 0: Persiapan (Hari 1) - Selesai ✅
- Struktur folder, `requirements.txt`, `.gitignore`, environment Python 3.13 terkonfigurasi.
- Dataset `scrapped_Shopee 12.12.csv` (85.500 baris, 11 kolom) divalidasi.

---

## Tahap 1: Exploratory Data Analysis / EDA (Hari 2) - Selesai ✅
- [notebooks/01_eda.ipynb](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/notebooks/01_eda.ipynb) — `Run All` tanpa error.
- 4 grafik visualisasi di `outputs/plots/`.
- 10 Insight bisnis & teknis tertulis didokumentasikan.

---

## Tahap 2: Data Preprocessing (Hari 3) - Selesai ✅
- [notebooks/02_preprocessing.ipynb](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/notebooks/02_preprocessing.ipynb) — `Run All` tanpa error.
- Dataset bersih: `data/processed/shopee_reviews_clean.csv` (85.499 baris, 0 null, 72.89 MB).
- Pipeline: Case folding → Regex cleaning → Elongation normalization → Slang dictionary (50+ entri) → Selective stopword removal → Sentiment proxy labeling.

---

## Tahap 3: Sentiment Modeling & Experiments (Hari 4-5) - Selesai ✅
- [notebooks/03_sentiment_modeling.ipynb](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/notebooks/03_sentiment_modeling.ipynb) — `Run All` tanpa error.
- [notebooks/03b_sentiment_experiments.ipynb](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/notebooks/03b_sentiment_experiments.ipynb) — 5-Fold Stratified Cross Validation, SMOTE, Threshold Tuning, & Hyperparameter Tuning.
- **Model Terpilih: LinearSVC** (Weighted F1=0.7662, Macro F1=0.6352, Accuracy=0.7596)
- Model & vectorizer tersimpan di `outputs/models/`.
- Dataset prediksi: `data/processed/shopee_reviews_with_predictions.csv`.

---

## Tahap 4: Topic Modeling (Hari 5-6) - Selesai ✅
- [notebooks/04_topic_modeling.ipynb](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/notebooks/04_topic_modeling.ipynb) — `Run All` tanpa error.
- **Hasil LDA (Gensim)**: 8 topik keluhan negatif teridentifikasi dengan Coherence Score ($C_v$ = 0.4669).
- Model tersimpan di `outputs/models/lda_final.model`.
- Dataset final: `data/processed/shopee_reviews_final.csv`.

---

## Tahap 5: Export Data untuk Dashboard (Hari 6) - Selesai ✅
- [notebooks/05_dashboard_export.ipynb](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/notebooks/05_dashboard_export.ipynb) — `Run All` tanpa error.
- 6 File JSON tersimpan & ter-copy ke `outputs/json/` dan `dashboard/public/data/` (`overview.json`, `sentiment_trend.json`, `version_quality.json`, `topics.json`, `top_reviews.json`, `wordcloud_data.json`).

---

## Tahap 6: Dashboard Development — React (Hari 7-9) - Selesai ✅
- Aplikasi React (Vite + Tailwind CSS + Recharts + Lucide React) 4 Halaman (`Overview`, `Version Quality`, `Topic Analysis`, `Top Reviews`).
- `npm run build` sukses dalam 8.02 detik tanpa error.
- Dev server berjalan lokal di `http://localhost:3000/`.

---

## Tahap 7: Deployment ke Vercel & GitHub (Hari 9) - Selesai ✅
- GitHub Repository: [https://github.com/Faliqulxx/Shopee-App-Review-Intelligence-Dashboard](https://github.com/Faliqulxx/Shopee-App-Review-Intelligence-Dashboard)
- Branch `main` ter-push lengkap (63 file).
- Pengaturan `dashboard/vercel.json` disiapkan untuk deployment.

---

## Tahap 8: Dokumentasi & Insight Report (Hari 10) - Selesai ✅
- **[README.md](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/README.md)**: Dokumentasi utama proyek mencakup arsitektur end-to-end, metrik model, visualisasi, dan panduan instalasi.
- **[docs/insight_report.md](file:///e:/Vibecode/Shopee%20App%20Review%20Intelligence%20Dashboard/docs/insight_report.md)**: Laporan 5+ insight bisnis strategis, limitasi proyek, dan rekomendasi pengembangan lanjutan (IndoBERT & ABSA).

---

🎉 **PROYEK SELESAI 100% (ALL PHASES 0-8 COMPLETED AND VERIFIED)**
