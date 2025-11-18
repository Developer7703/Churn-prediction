# 🧠 Customer Churn Prediction (Machine Learning + FastAPI + Next.js)

This project is a complete **end-to-end Customer Churn Prediction System** built using:

- **Machine Learning (Random Forest)**
- **FastAPI Backend**
- **Next.js Frontend Dashboard**
- **Pickled Encoders & Model Pipeline**
- **Real-time Churn Prediction API**

It predicts whether a customer is likely to **churn (leave a service)** based on their usage behavior and subscription details.

---

## 🚀 Features

### 🔍 **Machine Learning**
- Random Forest model trained on processed customer dataset  
- Feature engineering + label encoding  
- Predicts **churn (0 or 1)** and **probability**

### ⚡ **FastAPI Backend**
- Loads ML model + encoders (`.pkl`)  
- Clean REST API endpoint `/predict`  
- CORS enabled for frontend  
- Returns:
  ```json
  {
    "churn_prediction": 0,
    "churn_probability": 0.21
  }

                   ┌──────────────────────────┐
                   │        Frontend          │
                   │        (Next.js)         │
                   │                          │
                   │ • User fills form        │
                   │ • Sends JSON request     │
                   └───────────┬──────────────┘
                               │
                               ▼
                 ┌──────────────────────────────┐
                 │           FastAPI            │
                 │       (Backend API)          │
                 │                              │
                 │ • Receives /predict request  │
                 │ • Normalizes inputs          │
                 │ • Applies encoders           │
                 │ • Loads model & predicts     │
                 └───────────┬──────────────────┘
                               │
                               ▼
               ┌──────────────────────────────────┐
               │         ML Model (.pkl)          │
               │  • Random Forest Classifier      │
               │  • Gender encoder                │
               │  • Subscription encoder          │
               └──────────────────────────────────┘

