from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import pickle
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + encoders
model = pickle.load(open("churn_model.pkl", "rb"))
le_gender = pickle.load(open("gender_encoder.pkl", "rb"))
le_subscription = pickle.load(open("subscription_encoder.pkl", "rb"))

# Request structure from frontend
class PredictRequest(BaseModel):
    age: float
    gender: str
    monthly_usage_hours: float
    monthly_transactions: float   # <-- Updated name to match frontend
    subscription_type: str
    completions: float

# Root route so Render URL doesn't show 404
@app.get("/")
def home():
    return {"message": "Churn Prediction API is running!"}

# Prediction route
@app.post("/predict")
def predict(req: PredictRequest):

    # Normalize inputs
    gender = req.gender.lower()
    subscription_type = req.subscription_type.lower()

    # Create the exact dataframe matching the model's training columns
    data = {
        "age": [req.age],
        "gender": [gender],
        "monthly_usage_hours": [req.monthly_usage_hours],
        "numtransaction": [req.monthly_transactions],   # <-- Correct model column
        "subscription_type": [subscription_type],
        "completions": [req.completions]
    }

    df = pd.DataFrame(data)

    # Validate gender
    valid_genders = list(le_gender.classes_)
    if df["gender"][0] not in valid_genders:
        return {"error": f"Invalid gender. Allowed values: {valid_genders}"}

    # Validate subscription type
    valid_subs = list(le_subscription.classes_)
    if df["subscription_type"][0] not in valid_subs:
        return {"error": f"Invalid subscription_type. Allowed values: {valid_subs}"}

    # Apply encoders
    df["gender"] = le_gender.transform(df["gender"])
    df["subscription_type"] = le_subscription.transform(df["subscription_type"])

    # Predictions
    pred = model.predict(df)[0]
    prob = float(model.predict_proba(df)[0][1])

    return {
        "churn_prediction": int(pred),
        "churn_probability": prob
    }
