# PRD Addendum: Experiment Plan — Sentiment Modeling (Fase 3)

**Versi Dokumen:** 1.0
**Berlaku sebagai:** Perluasan dari Fase 3 (Sentiment Modeling) di PRD utama
**Estimasi Waktu:** 1-1.5 hari kerja (tidak menambah total timeline signifikan, karena dijalankan sebagai loop eksperimen, bukan manual satu-satu)
**Prasyarat:** Fase 2 (Preprocessing) sudah selesai, data bersih tersedia di `data/processed/`

---

## 1. Tujuan

Sebelum menentukan model final untuk dashboard, lakukan serangkaian eksperimen terkontrol untuk:
1. Memahami faktor apa yang paling berpengaruh terhadap performa model (split ratio, preprocessing, algoritma, penanganan imbalance)
2. Memilih kombinasi terbaik berdasarkan bukti (bukan asumsi)
3. Mendokumentasikan proses secara ilmiah sehingga bisa dijelaskan dengan percaya diri saat interview

**Prinsip penting:** Fokus metrik evaluasi adalah **F1-score per kelas (terutama kelas negatif)**, bukan hanya accuracy keseluruhan — karena kemungkinan besar data imbalanced (positif dominan) dan kelas negatif adalah yang paling bernilai secara bisnis.

---

## 2. Struktur Eksperimen

Eksperimen dibagi jadi 5 grup. Kerjakan berurutan — hasil grup sebelumnya menentukan konfigurasi default untuk grup berikutnya (supaya tidak explosive combinatorial, cukup ubah satu variabel setiap grup).

### Grup A — Split Ratio & Validation Strategy
**Variabel yang diuji:** rasio split, dengan konfigurasi lain tetap (preprocessing default = stemming + stopword removal, model = Logistic Regression, tanpa penanganan imbalance)

| ID | Konfigurasi | Keterangan |
|---|---|---|
| A1 | Train:Test = 80:20 | Baseline |
| A2 | Train:Test = 70:30 | Test set lebih besar |
| A3 | Train:Test = 90:10 | Train set lebih besar |
| A4 | 5-Fold Cross Validation | Rata-rata & std dev dari 5 fold, sebagai pembanding stabilitas |

**Yang harus didokumentasikan:**
- Apakah hasil antar rasio split berbeda signifikan (>3-5%)? Jika ya, itu indikasi model kurang stabil/data kurang banyak.
- Bandingkan hasil rata-rata 5-fold CV dengan hasil single-split — mana yang lebih bisa dipercaya untuk representasi performa asli.
- **Pilih 1 strategi split** untuk dipakai di grup eksperimen berikutnya (default rekomendasi: 80:20, kecuali ada temuan kuat yang mengubah keputusan ini).

---

### Grup B — Preprocessing Variation
**Variabel yang diuji:** kombinasi langkah preprocessing, dengan split ratio hasil pilihan Grup A, model = Logistic Regression

| ID | Stemming | Stopword Removal | Normalisasi Slang |
|---|---|---|---|
| B1 (baseline) | ✔ | ✔ | ✔ |
| B2 | ✘ | ✔ | ✔ |
| B3 | ✔ | ✘ | ✔ |
| B4 | ✔ | ✔ | ✘ |
| B5 | ✘ | ✘ | ✘ |

**Yang harus didokumentasikan:**
- Preprocessing mana yang paling berkontribusi terhadap performa (naik/turun signifikan saat dihilangkan)?
- Apakah stemming justru menurunkan performa (kadang terjadi karena distorsi makna kata dalam Bahasa Indonesia informal)?
- **Pilih 1 kombinasi preprocessing terbaik** untuk grup berikutnya.

---

### Grup C — Feature Engineering (TF-IDF)
**Variabel yang diuji:** konfigurasi vectorizer, dengan split & preprocessing hasil pilihan sebelumnya, model = Logistic Regression

| ID | N-gram | max_features | Vectorizer |
|---|---|---|---|
| C1 (baseline) | Unigram | 5000 | TF-IDF |
| C2 | Unigram + Bigram | 5000 | TF-IDF |
| C3 | Unigram | 3000 | TF-IDF |
| C4 | Unigram | 10000 | TF-IDF |
| C5 | Unigram | 5000 | Count Vectorizer (Bag of Words) |

**Yang harus didokumentasikan:**
- Apakah menambahkan bigram membantu menangkap frasa penting (misal "tidak bagus" vs kata "bagus" saja)?
- Apakah menambah `max_features` sebanding dengan peningkatan performa, atau mentok di titik tertentu (diminishing return)?
- TF-IDF vs Count Vectorizer — mana yang lebih baik untuk kasus ini?
- **Pilih 1 konfigurasi feature engineering terbaik.**

---

### Grup D — Penanganan Class Imbalance
**Variabel yang diuji:** strategi penanganan imbalance, dengan konfigurasi hasil pilihan sebelumnya, model = Logistic Regression

| ID | Strategi |
|---|---|
| D1 (baseline) | Tanpa penanganan khusus |
| D2 | `class_weight='balanced'` |
| D3 | Oversampling minority class dengan SMOTE |
| D4 | Undersampling majority class |

**Yang harus didokumentasikan:**
- Bandingkan bukan hanya accuracy, tapi **recall kelas negatif** (apakah model jadi lebih baik mendeteksi review negatif, yang tadinya mungkin "tenggelam" karena data imbalanced?)
- Apakah accuracy keseluruhan turun sedikit tapi recall kelas minoritas naik signifikan? Ini trade-off yang wajar dan harus dijelaskan, bukan dianggap "model jadi lebih buruk".
- **Pilih 1 strategi penanganan imbalance terbaik.**

---

### Grup E — Perbandingan Algoritma
**Variabel yang diuji:** algoritma, dengan seluruh konfigurasi terbaik dari Grup A-D

| ID | Algoritma |
|---|---|
| E1 | Logistic Regression |
| E2 | SVM (LinearSVC) |
| E3 | Multinomial Naive Bayes |
| E4 | Random Forest |

**Yang harus didokumentasikan:**
- Tabel perbandingan lengkap: accuracy, precision/recall/F1 per kelas, waktu training
- Confusion matrix untuk masing-masing algoritma
- **Pilih 1 model final** yang akan dipakai untuk prediksi seluruh dataset dan dashboard.

---

## 3. Template Tabel Rekap Eksperimen (Wajib Diisi)

Semua hasil dari Grup A-E dirangkum dalam satu tabel master di notebook, contoh format:

| Exp ID | Split | Preprocessing | Feature | Imbalance Handling | Model | Accuracy | F1-Neg | F1-Neutral | F1-Pos | Waktu Training |
|---|---|---|---|---|---|---|---|---|---|---|
| A1 | 80:20 | Stem+Stopword | TF-IDF uni, 5000 | None | LogReg | | | | | |
| A2 | 70:30 | Stem+Stopword | TF-IDF uni, 5000 | None | LogReg | | | | | |
| ... | | | | | | | | | | |
| E4 (final) | (terbaik) | (terbaik) | (terbaik) | (terbaik) | (terbaik) | | | | | |

Tabel ini nantinya bisa jadi bagian dari `insight_report.md` dan bahkan bisa ditampilkan sebagai bukti proses eksperimen di halaman "Model Info" dashboard (opsional, nice-to-have).

---

## 4. Kriteria Pemilihan Model Final

Model final dipilih bukan semata dari accuracy tertinggi, tapi mempertimbangkan:
1. **F1-score kelas negatif** — prioritas utama, karena ini kelas paling actionable untuk bisnis
2. **Stabilitas antar fold/split** — model yang variance-nya kecil lebih dipercaya
3. **Waktu training/inference** — relevan jika nanti mau dikembangkan lebih lanjut (misal butuh retrain berkala)
4. **Interpretability** — Logistic Regression lebih mudah dijelaskan (koefisien kata) dibanding Random Forest, ini bisa jadi pertimbangan kalau performanya setara

---

## 5. Deliverable Fase Eksperimen Ini

- [ ] Notebook `03_sentiment_modeling.ipynb` berisi seluruh 5 grup eksperimen (A-E), dengan kode terorganisir (idealnya dibuat 1 fungsi `run_experiment()` yang menerima parameter, supaya tidak copy-paste kode berulang)
- [ ] Tabel rekap seluruh eksperimen (lihat format di atas)
- [ ] Markdown cell di notebook berisi kesimpulan tiap grup (bukan cuma angka, tapi interpretasi "kenapa hasilnya begitu")
- [ ] Model final tersimpan sebagai `.pkl` di `outputs/models/`
- [ ] Konfigurasi final (split, preprocessing, feature engineering, imbalance handling, algoritma) didokumentasikan jelas di bagian akhir notebook sebagai "Final Model Configuration"

---

## 6. Catatan untuk Junior

- **Jangan uji semua kombinasi sekaligus (grid search penuh A×B×C×D×E)** — selain memakan waktu lama, hasilnya juga lebih sulit diinterpretasi satu per satu. Pendekatan bertahap (pilih pemenang tiap grup lalu lanjut ke grup berikutnya) lebih efisien dan tetap ilmiah untuk skala portofolio.
- Kalau di salah satu grup hasilnya semua mirip (selisih <1%), itu juga insight yang valid — artinya variabel tersebut tidak terlalu berpengaruh untuk kasus ini. Tulis saja kesimpulannya, tidak perlu memaksakan mencari perbedaan yang tidak ada.
- Simpan random_state/seed yang konsisten di semua eksperimen (misal `random_state=42`) supaya perbandingan antar eksperimen adil (apple-to-apple), bukan karena kebetulan split data berbeda.
- Total waktu eksperimen ini idealnya tidak lebih dari 1-1.5 hari — jika satu grup terasa memakan waktu terlalu lama, kurangi jumlah variasi (misal Grup C cukup 3 konfigurasi, tidak perlu 5) dan lanjutkan ke fase berikutnya. Progress tetap lebih penting daripada eksperimen yang sempurna.
