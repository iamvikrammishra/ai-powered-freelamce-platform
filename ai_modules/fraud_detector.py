import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import fastapi
from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Dict, Optional
import datetime
import json

app = FastAPI(title="Fraud Detection API")

# Mock historical data for training
np.random.seed(42)
n_samples = 1000

# Generate normal user behavior
normal_logins_per_day = np.random.poisson(3, n_samples)
normal_bids_per_day = np.random.poisson(5, n_samples)
normal_bid_to_project_ratio = np.random.normal(0.3, 0.1, n_samples)
normal_payment_amount = np.random.normal(5000, 1000, n_samples)
normal_login_time_variance = np.random.normal(3, 1, n_samples)
normal_ip_address_count = np.random.poisson(2, n_samples)
normal_failed_login_attempts = np.random.poisson(0.5, n_samples)

# Generate fraudulent behavior
fraud_logins_per_day = np.random.poisson(10, n_samples // 10)
fraud_bids_per_day = np.random.poisson(20, n_samples // 10)
fraud_bid_to_project_ratio = np.random.normal(0.8, 0.1, n_samples // 10)
fraud_payment_amount = np.random.normal(15000, 5000, n_samples // 10)
fraud_login_time_variance = np.random.normal(12, 3, n_samples // 10)
fraud_ip_address_count = np.random.poisson(8, n_samples // 10)
fraud_failed_login_attempts = np.random.poisson(5, n_samples // 10)

# Create training dataset
X_normal = np.column_stack([
    normal_logins_per_day,
    normal_bids_per_day,
    normal_bid_to_project_ratio,
    normal_payment_amount,
    normal_login_time_variance,
    normal_ip_address_count,
    normal_failed_login_attempts
])

X_fraud = np.column_stack([
    fraud_logins_per_day,
    fraud_bids_per_day,
    fraud_bid_to_project_ratio,
    fraud_payment_amount,
    fraud_login_time_variance,
    fraud_ip_address_count,
    fraud_failed_login_attempts
])

# Create labels (0 for normal, 1 for fraud)
y_normal = np.zeros(n_samples)
y_fraud = np.ones(n_samples // 10)

# Combine datasets
X = np.vstack([X_normal, X_fraud])
y = np.hstack([y_normal, y_fraud])

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train Isolation Forest
isolation_forest = IsolationForest(contamination=0.1, random_state=42)
isolation_forest.fit(X_scaled)

# Train Logistic Regression
logistic_regression = LogisticRegression(random_state=42)
logistic_regression.fit(X_scaled, y)

class UserActivityRequest(BaseModel):
    user_id: int
    logins_per_day: float
    bids_per_day: float
    bid_to_project_ratio: float
    payment_amount: float
    login_time_variance: float
    ip_address_count: int
    failed_login_attempts: int
    additional_metadata: Optional[Dict] = None

class FraudDetectionResponse(BaseModel):
    user_id: int
    fraud_score: float
    fraud_probability: float
    isolation_forest_score: float
    logistic_regression_score: float
    status: str
    reasons: List[str]
    timestamp: str

@app.post("/detect-fraud", response_model=FraudDetectionResponse)
async def detect_fraud(request: UserActivityRequest = Body(...)):
    # Extract features
    features = np.array([
        request.logins_per_day,
        request.bids_per_day,
        request.bid_to_project_ratio,
        request.payment_amount,
        request.login_time_variance,
        request.ip_address_count,
        request.failed_login_attempts
    ]).reshape(1, -1)
    
    # Scale features
    features_scaled = scaler.transform(features)
    
    # Get Isolation Forest score (-1 to 1, where lower is more anomalous)
    isolation_score = isolation_forest.decision_function(features_scaled)[0]
    # Convert to 0-1 scale where higher means more likely to be fraud
    isolation_score_normalized = (1 - (isolation_score + 1) / 2)
    
    # Get Logistic Regression probability
    lr_probability = logistic_regression.predict_proba(features_scaled)[0][1]
    
    # Ensemble the scores (weighted average)
    fraud_score = 0.6 * isolation_score_normalized + 0.4 * lr_probability
    
    # Determine status
    if fraud_score < 0.3:
        status = "normal"
    elif fraud_score < 0.7:
        status = "suspicious"
    else:
        status = "flagged"
    
    # Generate reasons for the score
    reasons = []
    if request.logins_per_day > 5:
        reasons.append(f"High login frequency: {request.logins_per_day} logins per day")
    if request.bids_per_day > 10:
        reasons.append(f"High bidding frequency: {request.bids_per_day} bids per day")
    if request.bid_to_project_ratio > 0.5:
        reasons.append(f"Unusual bid-to-project ratio: {request.bid_to_project_ratio:.2f}")
    if request.payment_amount > 10000:
        reasons.append(f"Large payment amount: ₹{request.payment_amount:.2f}")
    if request.login_time_variance > 8:
        reasons.append(f"Unusual login time variance: {request.login_time_variance} hours")
    if request.ip_address_count > 5:
        reasons.append(f"Multiple IP addresses: {request.ip_address_count}")
    if request.failed_login_attempts > 3:
        reasons.append(f"Failed login attempts: {request.failed_login_attempts}")
    
    # If no specific reasons but still suspicious, add a generic reason
    if not reasons and status != "normal":
        reasons.append("Unusual pattern detected in user behavior")
    
    return {
        "user_id": request.user_id,
        "fraud_score": float(fraud_score),
        "fraud_probability": float(lr_probability),
        "isolation_forest_score": float(isolation_score_normalized),
        "logistic_regression_score": float(lr_probability),
        "status": status,
        "reasons": reasons,
        "timestamp": datetime.datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
