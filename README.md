# Customer Churn Prediction System (Machine Learning + FastAPI + Next.js)
🔗 **Live Demo:** https://v0-customer-churn-dashboard.vercel.app

A complete end-to-end **Customer Churn Prediction System** integrating Machine Learning, a FastAPI backend, and a Next.js dashboard.  
The system predicts whether a customer is likely to churn based on their behavior and subscription patterns.

---

## 🚀 Overview

### ✅ Machine Learning (Random Forest + Encoders)
- Random Forest classifier trained on a structured churn dataset  
- Label encoding for gender & subscription type  
- Feature engineering and preprocessing  
- Predicts:
  - **Churn Class** (0 = No, 1 = Yes)
  - **Churn Probability** (0–1)

### ⚡ FastAPI Backend
- Loads pickled ML model & encoders  
- POST API endpoint: `/predict`  
- Input validation + preprocessing  
- CORS enabled for frontend communication  

## 🛠️ Tech Stack

### **Machine Learning**
- Python  
- Pandas, NumPy  
- Scikit-learn  
- RandomForestClassifier  
- Pickle for model persistence  

### **Backend**
- FastAPI  
- Uvicorn  
- CORS Middleware  

### **Frontend**
- Next.js  
- React  
- Fetch API  

---

## 🎯 Use Cases
- SaaS churn prediction  
- Telecom customer churn  
- User retention strategy  
- Identifying high-risk customers  

---

## 🌟 Project Highlights
- End-to-end ML pipeline  
- Real-time REST API predictions  
- Deployed dashboard interface  
- Separate model + encoder pipeline  
- Lightweight, modular & scalable structure  


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
