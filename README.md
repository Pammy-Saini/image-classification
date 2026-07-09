# 🌍 Remote Sensing Land Cover Classification & Change Detection

A Machine Learning-based Flask web application for **Land Cover Classification** and **Land Use Change Detection** using multispectral satellite imagery. The system classifies satellite images into different land cover classes and compares results between different years to analyze environmental changes.

---

## 📖 Project Overview

This project simulates Remote Sensing image analysis using Machine Learning techniques. Users can classify satellite images using multiple algorithms and compare classified maps from different years to detect land cover changes.

The application supports:

- 🌊 Water Body Detection
- 🌳 Vegetation Detection
- 🏢 Built-up Area Detection
- 🏜 Sandy Area Detection
- 🌍 Other Land Cover Detection

It also provides detailed area statistics, transition matrices, and change detection reports.

---

# 🚀 Features

- Machine Learning Based Land Cover Classification
- Remote Sensing Image Processing
- Random Forest Classifier
- Support Vector Machine (SVM)
- K-Means Clustering
- Automatic Training Sample Generation
- Color Classified Maps
- Area Statistics Calculation
- Percentage Distribution
- Area in Hectares & Square Kilometers
- Multi-Year Change Detection
- Transition Matrix Generation
- REST API Backend
- Responsive Web Interface

---

# 🧠 Machine Learning Algorithms

### Supervised Learning

- Random Forest Classifier
- Support Vector Machine (SVM)

### Unsupervised Learning

- K-Means Clustering

---

# 🛰 Land Cover Classes

| Class | Description |
|--------|-------------|
| Water | Water Bodies |
| Vegetation | Green Areas / Forest |
| Built-up | Urban / Buildings |
| Sandy | Desert / Sandy Land |
| Other | Remaining Land Types |

---

# 📂 Project Structure

```text
image-classification/
│
├── app.py
├── generate_mock_data.py
├── requirements.txt
├── README.md
├── report.md
├── run.bat
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── main.js
│   │
│   └── data/
│       ├── jodhpur_2024_bands.npy
│       ├── jodhpur_2025_bands.npy
│       ├── jodhpur_2024_gt.png
│       └── jodhpur_2025_gt.png
│
├── .venv/
│
└── __pycache__/
```

---

# ⚙ Technologies Used

### Programming Language

- Python

### Backend

- Flask

### Machine Learning

- Scikit-learn

### Image Processing

- Pillow (PIL)

### Numerical Computing

- NumPy

### Frontend

- HTML5
- CSS3
- JavaScript

---

# 📦 Required Libraries

```
Flask
NumPy
Pillow
Scikit-learn
```

Install all dependencies:

```bash
pip install -r requirements.txt
```

---

# ▶ Installation & Run

Clone Repository

```bash
git clone https://github.com/Pammy-Saini/image-classification.git
```

Move into Project Folder

```bash
cd image-classification
```

Create Virtual Environment

```bash
python -m venv .venv
```

Activate Environment

### Windows

```bash
.venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Application

```bash
python app.py
```

Open Browser

```
http://127.0.0.1:5000
```

---

# 🔄 Project Workflow

```
Satellite Image
        │
        ▼
Load Spectral Bands
        │
        ▼
Select Classification Algorithm
(Random Forest / SVM / K-Means)
        │
        ▼
Land Cover Classification
        │
        ▼
Generate Classified Map
        │
        ▼
Area Statistics
        │
        ▼
Change Detection
        │
        ▼
Transition Matrix
        │
        ▼
Final Analysis Report
```

---

# 📊 Output

The application generates:

- Classified Land Cover Map
- Area Statistics
- Percentage Distribution
- Hectare Calculation
- Square Kilometer Calculation
- Change Detection Report
- Transition Matrix
- Color Classification Map

---

# 📸 Screenshots




## Change Detection

<img width="922" height="454" alt="Screenshot 2026-07-09 115701" src="https://github.com/user-attachments/assets/52428dd7-d763-4cd5-80a4-e09be48e88b5" />


---

## Dashboard / Statistics

<img width="937" height="401" alt="Screenshot 2026-07-09 115727" src="https://github.com/user-attachments/assets/aa1ff54f-0a92-46ca-91bd-6a5ed2cb36ed" />


## Future Improvements

- Real Satellite Image Upload
- Deep Learning Models (CNN/U-Net)
- GIS Map Integration
- PDF Report Generation
- Accuracy Assessment
- Interactive Dashboard
- Export Results to CSV/PDF

---

# 👨‍💻 Author

**Pammy Saini**

B.Tech – Computer Science & Engineering

GitHub: https://github.com/Pammy-Saini

---

# 📄 License

This project is developed for educational and research purposes only.
