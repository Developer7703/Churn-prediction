Customer Churn Prediction System (Machine Learning + FastAPI + Next.js)
🔗 Live Demo: https://v0-customer-churn-dashboard.vercel.app
A complete end-to-end Customer Churn Prediction System that integrates Machine Learning, a FastAPI backend, and a Next.js dashboard. The system predicts whether a user is likely to churn based on their usage behaviour, subscription type, and activity patterns.
🚀 Overview
This project demonstrates a fully deployed ML pipeline:
✅ Machine Learning (Random Forest + Encoders)
Trained on a processed customer churn dataset
Label encoding for categorical features
Feature normalization + ML preprocessing
Predicts:
Churn Class (0 = No, 1 = Yes)
Churn Probability (0–1)
⚡ FastAPI Backend
Loads pickled ML model + label encoders
Provides a clean REST API:
POST /predict
Handles input validation and preprocessing
Uses CORS middleware for frontend communication
Returns:
{
  "churn_prediction": 0,
  "churn_probability": 0.21
}
🧩 Next.js Frontend Dashboard
Modern UI built using Next.js
Simple form-based input
Sends data to FastAPI and displays predictions in real time
Clean UX optimized for ML demo applications
📊 Architecture
                 ┌──────────────────────────┐
                 │        Frontend          │
                 │         Next.js          │
                 │                          │
                 │ • User fills form        │
                 │ • Sends JSON request     │
                 └───────────┬──────────────┘
                             │
                             ▼
               ┌──────────────────────────────┐
               │           FastAPI            │
               │       Backend Service        │
               │                              │
               │ • Receives /predict request  │
               │ • Validates & normalizes     │
               │ • Applies encoders           │
               │ • Loads model & predicts     │
               └───────────┬──────────────────┘
                             │
                             ▼
             ┌──────────────────────────────────┐
             │     ML Model & Encoders (.pkl)   │
             │  • Random Forest Classifier      │
             │  • Gender label encoder          │
             │  • Subscription label encoder    │
             └──────────────────────────────────┘
🛠️ Tech Stack
Machine Learning
Python
Pandas, NumPy
Scikit-learn
RandomForestClassifier
Pickle for model persistence
Backend
FastAPI
Uvicorn
CORS Middleware
Frontend
Next.js
React hooks
Fetch API for backend communication
🎯 Use Case
This project can be used in scenarios such as:
SaaS churn analysis
Telecom churn prediction
Customer lifetime value scoring
Marketing retention strategies
🌟 Key Highlights
✔ End-to-end ML pipeline
✔ REST API with real-time prediction
✔ Deployed frontend dashboard
✔ Modularity: encoders + model saved separately
✔ Production-ready structure
