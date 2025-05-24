import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import fastapi
from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Dict, Optional

app = FastAPI(title="Mentor-Mentee Matching API")

# Load BERT model for text embeddings
bert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Mock mentor data
mock_mentors = pd.DataFrame({
    'id': range(1, 51),
    'name': [f"Mentor {i}" for i in range(1, 51)],
    'skills': [
        ["React", "Node.js", "JavaScript", "Web Development"],
        ["Python", "Django", "Flask", "Backend Development"],
        ["UI Design", "Figma", "Sketch", "UX Research"],
        ["Content Writing", "Copywriting", "SEO", "Blogging"],
        ["Data Analysis", "Python", "R", "Machine Learning"]
    ] * 10,
    'industry': [
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "E-commerce"
    ] * 10,
    'experience_years': np.random.randint(3, 20, 50),
    'hourly_rate': np.random.randint(1000, 5000, 50),
    'availability_hours_per_week': np.random.randint(5, 20, 50),
    'rating': np.random.uniform(3.5, 5.0, 50),
    'mentees_count': np.random.randint(0, 10, 50),
    'bio': [
        "Experienced web developer specializing in modern JavaScript frameworks.",
        "Backend developer with expertise in building scalable APIs and services.",
        "UI/UX designer passionate about creating intuitive user experiences.",
        "Professional content writer with a focus on technology and business topics.",
        "Data scientist with experience in predictive modeling and data visualization."
    ] * 10
})

# Pre-compute skill embeddings for mentors
mentor_skill_texts = [" ".join(skills) for skills in mock_mentors['skills']]
mentor_skill_embeddings = bert_model.encode(mentor_skill_texts)

# Pre-compute industry embeddings for mentors
mentor_industry_embeddings = bert_model.encode(mock_mentors['industry'].tolist())

# Pre-compute bio embeddings for mentors
mentor_bio_embeddings = bert_model.encode(mock_mentors['bio'].tolist())

class MenteeProfile(BaseModel):
    user_id: int
    skills_to_learn: List[str]
    industry: str
    experience_years: int
    goals: List[str]
    preferred_mentorship_type: Optional[str] = "one-on-one"
    budget_range: Optional[Dict[str, int]] = {"min": 1000, "max": 3000}
    availability: Optional[Dict[str, int]] = {"hours_per_week": 5}

class MentorMatchResponse(BaseModel):
    mentee_id: int
    mentors: List[Dict[str, any]]
    match_scores: List[float]
    match_reasons: List[str]

@app.post("/match-mentors", response_model=MentorMatchResponse)
async def match_mentors(mentee_profile: MenteeProfile = Body(...)):
    mentee_id = mentee_profile.user_id
    skills_to_learn = mentee_profile.skills_to_learn
    industry = mentee_profile.industry
    experience_years = mentee_profile.experience_years
    goals = mentee_profile.goals
    budget_min = mentee_profile.budget_range["min"]
    budget_max = mentee_profile.budget_range["max"]
    hours_per_week = mentee_profile.availability["hours_per_week"]
    
    # Create embeddings for mentee
    mentee_skills_text = " ".join(skills_to_learn)
    mentee_skills_embedding = bert_model.encode([mentee_skills_text])[0]
    
    mentee_industry_embedding = bert_model.encode([industry])[0]
    
    mentee_goals_text = " ".join(goals)
    mentee_goals_embedding = bert_model.encode([mentee_goals_text])[0]
    
    # Calculate skill similarity scores
    skill_similarities = cosine_similarity([mentee_skills_embedding], mentor_skill_embeddings)[0]
    
    # Calculate industry similarity scores
    industry_similarities = cosine_similarity([mentee_industry_embedding], mentor_industry_embeddings)[0]
    
    # Calculate goals-bio similarity (how well mentor's bio matches mentee's goals)
    goals_bio_similarities = cosine_similarity([mentee_goals_embedding], mentor_bio_embeddings)[0]
    
    # Filter by budget and availability
    budget_filter = (mock_mentors['hourly_rate'] >= budget_min) & (mock_mentors['hourly_rate'] <= budget_max)
    availability_filter = mock_mentors['availability_hours_per_week'] >= hours_per_week
    
    # Experience level match (prefer mentors with more experience than mentee)
    experience_scores = np.zeros(len(mock_mentors))
    for i, mentor_exp in enumerate(mock_mentors['experience_years']):
        if mentor_exp > experience_years:
            # Prefer mentors with 3-10 years more experience than mentee
            exp_diff = mentor_exp - experience_years
            if exp_diff <= 10:
                experience_scores[i] = 1.0 - (exp_diff - 3) / 7 if exp_diff >= 3 else 1.0 - (3 - exp_diff) / 3
            else:
                experience_scores[i] = 0.5  # Still valuable but not optimal
        else:
            experience_scores[i] = 0.2  # Less experienced mentors are less valuable
    
    # Calculate final match scores with weights
    weights = {
        'skills': 0.4,
        'industry': 0.2,
        'goals_bio': 0.2,
        'experience': 0.1,
        'rating': 0.1
    }
    
    final_scores = (
        weights['skills'] * skill_similarities +
        weights['industry'] * industry_similarities +
        weights['goals_bio'] * goals_bio_similarities +
        weights['experience'] * experience_scores +
        weights['rating'] * (mock_mentors['rating'] - 3.5) / 1.5  # Normalize ratings to 0-1
    )
    
    # Apply filters
    final_scores = np.where(budget_filter & availability_filter, final_scores, 0)
    
    # Get top 5 mentor matches
    top_indices = np.argsort(final_scores)[::-1][:5]
    top_mentors = mock_mentors.iloc[top_indices]
    top_scores = final_scores[top_indices]
    
    # Generate match reasons
    match_reasons = []
    for idx in top_indices:
        mentor = mock_mentors.iloc[idx]
        
        reasons = []
        # Skill match reason
        matching_skills = set(skills_to_learn).intersection(set(mentor['skills']))
        if matching_skills:
            reasons.append(f"Skills match: {', '.join(list(matching_skills)[:3])}")
            if len(matching_skills) > 3:
                reasons[-1] += f" and {len(matching_skills) - 3} more"
        
        # Industry match
        if mentor['industry'] == industry:
            reasons.append(f"Same industry: {industry}")
        
        # Experience reason
        reasons.append(f"{mentor['experience_years']} years of experience")
        
        # Rating reason
        if mentor['rating'] >= 4.5:
            reasons.append(f"Highly rated: {mentor['rating']:.1f}/5.0")
        
        match_reasons.append(", ".join(reasons))
    
    # Prepare response
    mentors_list = []
    for i, idx in enumerate(top_indices):
        mentor = mock_mentors.iloc[idx]
        mentors_list.append({
            "id": int(mentor['id']),
            "name": mentor['name'],
            "skills": mentor['skills'],
            "industry": mentor['industry'],
            "experience_years": int(mentor['experience_years']),
            "hourly_rate": int(mentor['hourly_rate']),
            "availability_hours_per_week": int(mentor['availability_hours_per_week']),
            "rating": float(mentor['rating']),
            "mentees_count": int(mentor['mentees_count']),
            "bio": mentor['bio'],
            "match_score": float(top_scores[i])
        })
    
    return {
        "mentee_id": mentee_id,
        "mentors": mentors_list,
        "match_scores": top_scores.tolist(),
        "match_reasons": match_reasons
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
