import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import fastapi
from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import List, Dict, Optional

app = FastAPI(title="Project Recommendation API")

# Mock data - in production this would come from a database
mock_projects = pd.DataFrame({
    'id': range(1, 101),
    'title': [f"Project {i}" for i in range(1, 101)],
    'description': [
        "Web development project using React and Node.js",
        "Mobile app development with React Native",
        "UI/UX design for e-commerce website",
        "Content writing for technology blog",
        "SEO optimization for local business",
        "Logo design for startup",
        "Full-stack development for fintech application",
        "Data analysis for marketing campaign",
        "Video editing for product launch",
        "Social media marketing strategy"
    ] * 10,
    'skills_required': [
        ["React", "Node.js", "MongoDB"],
        ["React Native", "Firebase", "JavaScript"],
        ["Figma", "UI Design", "UX Research"],
        ["Content Writing", "SEO", "Blogging"],
        ["SEO", "Google Analytics", "Keyword Research"],
        ["Logo Design", "Illustrator", "Branding"],
        ["Python", "Django", "PostgreSQL"],
        ["Data Analysis", "Excel", "SQL"],
        ["Video Editing", "After Effects", "Premiere Pro"],
        ["Social Media Marketing", "Content Strategy", "Analytics"]
    ] * 10,
    'budget': np.random.randint(10000, 100000, 100),
    'employer_id': np.random.randint(1, 50, 100),
    'avg_rating': np.random.uniform(3.0, 5.0, 100)
})

# Mock user data
mock_users = pd.DataFrame({
    'id': range(1, 101),
    'skills': [
        ["React", "Node.js", "JavaScript"],
        ["Python", "Django", "Flask"],
        ["UI Design", "Figma", "Sketch"],
        ["Content Writing", "Copywriting", "SEO"],
        ["Data Analysis", "Python", "R"]
    ] * 20,
    'project_history': [
        [1, 5, 10, 15],
        [2, 7, 12, 17],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20]
    ] * 20,
    'ratings_given': [
        [4.5, 3.8, 4.2, 4.7],
        [4.0, 4.5, 3.5, 4.2],
        [3.8, 4.2, 4.5, 3.9],
        [4.2, 3.7, 4.0, 4.3],
        [3.9, 4.1, 4.3, 4.0]
    ] * 20
})

# Load BERT model for text embeddings
bert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# TF-IDF vectorizer for content-based filtering
tfidf = TfidfVectorizer(stop_words='english')
project_descriptions = mock_projects['description'].tolist()
tfidf_matrix = tfidf.fit_transform(project_descriptions)

# Pre-compute BERT embeddings for project descriptions
bert_embeddings = bert_model.encode(project_descriptions)

class UserProfile(BaseModel):
    user_id: int
    skills: List[str]
    preferred_categories: Optional[List[str]] = None
    project_history: Optional[List[int]] = None
    weights: Optional[Dict[str, float]] = {"content": 0.6, "collaborative": 0.4}

class RecommendationResponse(BaseModel):
    project_ids: List[int]
    scores: List[float]
    match_reasons: List[str]

@app.post("/recommend", response_model=RecommendationResponse)
async def recommend_projects(user_profile: UserProfile = Body(...)):
    user_id = user_profile.user_id
    user_skills = user_profile.skills
    weights = user_profile.weights
    
    # Content-based filtering using skills match and BERT embeddings
    content_scores = []
    
    # Create a user profile text by joining their skills
    user_profile_text = " ".join(user_skills)
    user_embedding = bert_model.encode([user_profile_text])[0]
    
    # Calculate similarity between user profile and project descriptions
    bert_similarities = cosine_similarity([user_embedding], bert_embeddings)[0]
    
    # Calculate skill match score
    skill_match_scores = []
    for skills in mock_projects['skills_required']:
        matching_skills = set(user_skills).intersection(set(skills))
        match_ratio = len(matching_skills) / len(skills) if skills else 0
        skill_match_scores.append(match_ratio)
    
    # Combine BERT similarities and skill match scores
    content_scores = 0.7 * np.array(bert_similarities) + 0.3 * np.array(skill_match_scores)
    
    # Collaborative filtering
    collaborative_scores = np.zeros(len(mock_projects))
    
    if user_profile.project_history:
        # Find similar users based on project history
        user_project_history = set(user_profile.project_history)
        
        for idx, history in enumerate(mock_users['project_history']):
            if idx == user_id - 1:  # Skip the current user
                continue
                
            other_history = set(history)
            overlap = len(user_project_history.intersection(other_history))
            
            if overlap > 0:
                similarity = overlap / len(user_project_history.union(other_history))
                
                # Get projects this similar user has worked on that the current user hasn't
                unique_projects = [p for p in history if p not in user_project_history]
                
                # Add weighted scores to those projects
                for project in unique_projects:
                    if project <= len(collaborative_scores):
                        collaborative_scores[project-1] += similarity
    
    # Normalize collaborative scores
    if np.max(collaborative_scores) > 0:
        collaborative_scores = collaborative_scores / np.max(collaborative_scores)
    
    # Weighted ensemble of content-based and collaborative filtering
    final_scores = weights["content"] * content_scores
    if np.max(collaborative_scores) > 0:  # Only add collaborative if we have data
        final_scores += weights["collaborative"] * collaborative_scores
    
    # Get top 10 project recommendations
    top_indices = np.argsort(final_scores)[::-1][:10]
    recommended_projects = mock_projects.iloc[top_indices]
    
    # Generate match reasons
    match_reasons = []
    for idx in top_indices:
        project_skills = mock_projects.iloc[idx]['skills_required']
        matching_skills = set(user_skills).intersection(set(project_skills))
        
        if matching_skills:
            reason = f"Skills match: {', '.join(list(matching_skills)[:3])}"
            if len(matching_skills) > 3:
                reason += f" and {len(matching_skills) - 3} more"
        else:
            reason = "Similar to projects you've shown interest in"
            
        match_reasons.append(reason)
    
    return {
        "project_ids": recommended_projects['id'].tolist(),
        "scores": final_scores[top_indices].tolist(),
        "match_reasons": match_reasons
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
