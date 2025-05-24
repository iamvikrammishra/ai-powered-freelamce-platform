import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import Model
import fastapi
from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from typing import List, Dict, Optional
import io
import json
import base64
from PIL import Image

app = FastAPI(title="Skill Verification API")

# Load pre-trained ResNet50 model
base_model = ResNet50(weights='imagenet', include_top=False, pooling='avg')
model = Model(inputs=base_model.input, outputs=base_model.output)

# Define skill categories and their corresponding ImageNet classes
# This is a simplified mapping - in production, you would fine-tune on domain-specific data
skill_categories = {
    "web_design": [407, 408, 409, 722, 723],  # Computer, screen related classes
    "graphic_design": [401, 402, 403, 404, 405],  # Art related classes
    "photography": [759, 760, 761, 762, 763],  # Camera related classes
    "ui_ux": [407, 408, 409, 722, 723],  # Similar to web design for this example
    "logo_design": [401, 402, 403, 404, 405],  # Art related classes
    "illustration": [401, 402, 403, 404, 405],  # Art related classes
    "video_editing": [759, 760, 761, 762, 763],  # Camera related classes
    "content_writing": [420, 421, 422, 423, 424],  # Book, document related classes
}

# Mock quiz data for skill assessment
mock_quizzes = {
    "web_development": [
        {"question": "What does HTML stand for?", "options": ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], "answer": 0},
        {"question": "Which of the following is a JavaScript framework?", "options": ["Django", "Flask", "React", "Ruby on Rails"], "answer": 2},
        {"question": "What is the purpose of CSS?", "options": ["To define the structure of a webpage", "To style the webpage", "To handle server-side logic", "To manage databases"], "answer": 1},
    ],
    "ui_ux": [
        {"question": "What does UX stand for?", "options": ["User Experience", "User Extension", "User Examination", "User Extraction"], "answer": 0},
        {"question": "Which of the following is NOT a UX design principle?", "options": ["Consistency", "Accessibility", "Code Optimization", "Feedback"], "answer": 2},
        {"question": "What is a wireframe?", "options": ["A 3D model", "A low-fidelity layout", "A type of server", "A programming language"], "answer": 1},
    ],
    "content_writing": [
        {"question": "What is a call-to-action?", "options": ["A phone call to a client", "A prompt encouraging the reader to take action", "A type of headline", "A writing style"], "answer": 1},
        {"question": "Which of the following is NOT a content type?", "options": ["Blog post", "White paper", "Social media post", "Database query"], "answer": 3},
        {"question": "What is SEO?", "options": ["Search Engine Optimization", "Social Engagement Opportunity", "System Engineering Operations", "Software Enhancement Options"], "answer": 0},
    ]
}

class PortfolioAnalysisRequest(BaseModel):
    user_id: int
    image_data: str  # Base64 encoded image
    claimed_skills: List[str]

class QuizSubmissionRequest(BaseModel):
    user_id: int
    skill_category: str
    answers: List[int]

class SkillVerificationResponse(BaseModel):
    user_id: int
    verified_skills: List[Dict[str, any]]
    confidence_scores: Dict[str, float]
    verification_method: str

@app.post("/verify-portfolio", response_model=SkillVerificationResponse)
async def verify_portfolio(request: PortfolioAnalysisRequest):
    user_id = request.user_id
    claimed_skills = request.claimed_skills
    
    # Decode base64 image
    try:
        image_data = base64.b64decode(request.image_data)
        img = Image.open(io.BytesIO(image_data))
        img = img.resize((224, 224))  # ResNet50 input size
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        
        # Get image features
        features = model.predict(img_array)
        
        # Get ImageNet predictions
        base_predictions = base_model.predict(img_array)
        
        # Calculate skill confidence scores
        confidence_scores = {}
        for skill, related_classes in skill_categories.items():
            # This is a simplified approach - in production you would use a more sophisticated model
            confidence = np.mean([base_predictions[0, cls] for cls in related_classes])
            confidence_scores[skill] = float(confidence)
        
        # Determine verified skills based on confidence threshold
        verified_skills = []
        for skill in claimed_skills:
            skill_key = skill.lower().replace(" ", "_")
            if skill_key in confidence_scores:
                is_verified = confidence_scores[skill_key] > 0.5  # Threshold
                verified_skills.append({
                    "name": skill,
                    "verified": is_verified,
                    "confidence": confidence_scores[skill_key],
                    "verification_method": "portfolio"
                })
            else:
                # If we don't have a model for this skill, default to unverified
                verified_skills.append({
                    "name": skill,
                    "verified": False,
                    "confidence": 0.0,
                    "verification_method": "portfolio"
                })
        
        return {
            "user_id": user_id,
            "verified_skills": verified_skills,
            "confidence_scores": confidence_scores,
            "verification_method": "portfolio"
        }
    
    except Exception as e:
        return {
            "user_id": user_id,
            "verified_skills": [{"name": skill, "verified": False, "confidence": 0.0, "verification_method": "error"} for skill in claimed_skills],
            "confidence_scores": {},
            "verification_method": f"error: {str(e)}"
        }

@app.post("/verify-quiz", response_model=SkillVerificationResponse)
async def verify_quiz(request: QuizSubmissionRequest):
    user_id = request.user_id
    skill_category = request.skill_category
    user_answers = request.answers
    
    if skill_category not in mock_quizzes:
        return {
            "user_id": user_id,
            "verified_skills": [{"name": skill_category, "verified": False, "confidence": 0.0, "verification_method": "quiz"}],
            "confidence_scores": {skill_category: 0.0},
            "verification_method": "quiz"
        }
    
    # Get correct answers for the quiz
    quiz = mock_quizzes[skill_category]
    correct_answers = [q["answer"] for q in quiz]
    
    # Calculate score
    if len(user_answers) != len(correct_answers):
        score = 0.0
    else:
        correct_count = sum(1 for ua, ca in zip(user_answers, correct_answers) if ua == ca)
        score = correct_count / len(correct_answers)
    
    # Determine if skill is verified based on score threshold
    is_verified = score >= 0.7  # 70% threshold
    
    return {
        "user_id": user_id,
        "verified_skills": [{"name": skill_category, "verified": is_verified, "confidence": score, "verification_method": "quiz"}],
        "confidence_scores": {skill_category: score},
        "verification_method": "quiz"
    }

@app.get("/quiz/{skill_category}")
async def get_quiz(skill_category: str):
    if skill_category not in mock_quizzes:
        return {"error": "Quiz not found for this skill category"}
    
    # Return quiz questions without answers
    quiz_questions = []
    for q in mock_quizzes[skill_category]:
        quiz_questions.append({
            "question": q["question"],
            "options": q["options"]
        })
    
    return {"skill_category": skill_category, "questions": quiz_questions}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
