import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64
from datetime import datetime, timedelta
import fastapi
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Optional

app = FastAPI(title="AI Analytics API")

# Generate mock data for analytics
np.random.seed(42)

# Date range for the past 30 days
end_date = datetime.now()
start_date = end_date - timedelta(days=30)
date_range = pd.date_range(start=start_date, end=end_date, freq='D')

# User activity data
user_signups = np.random.poisson(20, len(date_range))
active_users = np.random.poisson(100, len(date_range))
project_postings = np.random.poisson(30, len(date_range))
completed_projects = np.random.poisson(15, len(date_range))
total_earnings = np.random.normal(50000, 10000, len(date_range))

# Create DataFrame
activity_df = pd.DataFrame({
    'date': date_range,
    'user_signups': user_signups,
    'active_users': active_users,
    'project_postings': project_postings,
    'completed_projects': completed_projects,
    'total_earnings': total_earnings
})

# Skill demand data
skills = ['React', 'Node.js', 'Python', 'UI/UX Design', 'Content Writing', 
          'SEO', 'Data Analysis', 'Mobile Development', 'WordPress', 'Graphic Design']
skill_demand = np.random.randint(50, 500, size=len(skills))
skill_growth = np.random.uniform(-0.2, 0.5, size=len(skills))

skill_df = pd.DataFrame({
    'skill': skills,
    'demand': skill_demand,
    'growth': skill_growth
})

# Fraud data
fraud_categories = ['Account Takeover', 'Fake Profiles', 'Payment Fraud', 
                    'Bid Manipulation', 'Identity Theft']
fraud_counts = np.random.randint(5, 50, size=len(fraud_categories))

fraud_df = pd.DataFrame({
    'category': fraud_categories,
    'count': fraud_counts
})

# Project success rate by category
categories = ['Web Development', 'Mobile Apps', 'Design', 'Writing', 'Marketing', 
              'Data Science', 'Video & Animation', 'Business']
success_rates = np.random.uniform(0.7, 0.95, size=len(categories))

success_df = pd.DataFrame({
    'category': categories,
    'success_rate': success_rates
})

# Helper function to convert matplotlib figure to base64 encoded image
def fig_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return img_str

@app.get("/analytics/user-activity")
async def get_user_activity():
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(activity_df['date'], activity_df['active_users'], label='Active Users')
    ax.plot(activity_df['date'], activity_df['user_signups'], label='New Signups')
    
    ax.set_title('User Activity Over Time')
    ax.set_xlabel('Date')
    ax.set_ylabel('Count')
    ax.legend()
    ax.grid(True, alpha=0.3)
    
    # Format x-axis dates
    fig.autofmt_xdate()
    
    # Convert plot to base64
    img_str = fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart": img_str,
        "data": activity_df[['date', 'active_users', 'user_signups']].to_dict(orient='records'),
        "summary": {
            "total_active_users": int(activity_df['active_users'].sum()),
            "total_new_signups": int(activity_df['user_signups'].sum()),
            "avg_daily_active_users": float(activity_df['active_users'].mean()),
            "avg_daily_signups": float(activity_df['user_signups'].mean())
        }
    }

@app.get("/analytics/project-metrics")
async def get_project_metrics():
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(activity_df['date'], activity_df['project_postings'], label='New Projects')
    ax.plot(activity_df['date'], activity_df['completed_projects'], label='Completed Projects')
    
    ax.set_title('Project Activity Over Time')
    ax.set_xlabel('Date')
    ax.set_ylabel('Count')
    ax.legend()
    ax.grid(True, alpha=0.3)
    
    # Format x-axis dates
    fig.autofmt_xdate()
    
    # Convert plot to base64
    img_str = fig_to_base64(fig)
    plt.close(fig)
    
    # Calculate completion rate
    completion_rate = activity_df['completed_projects'].sum() / activity_df['project_postings'].sum()
    
    return {
        "chart": img_str,
        "data": activity_df[['date', 'project_postings', 'completed_projects']].to_dict(orient='records'),
        "summary": {
            "total_projects_posted": int(activity_df['project_postings'].sum()),
            "total_projects_completed": int(activity_df['completed_projects'].sum()),
            "completion_rate": float(completion_rate),
            "avg_daily_new_projects": float(activity_df['project_postings'].mean())
        }
    }

@app.get("/analytics/earnings")
async def get_earnings_metrics():
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(activity_df['date'], activity_df['total_earnings'])
    ax.fill_between(activity_df['date'], activity_df['total_earnings'], alpha=0.2)
    
    ax.set_title('Platform Earnings Over Time')
    ax.set_xlabel('Date')
    ax.set_ylabel('Earnings (₹)')
    ax.grid(True, alpha=0.3)
    
    # Format y-axis as currency
    ax.get_yaxis().set_major_formatter(plt.FuncFormatter(lambda x, p: f'₹{int(x):,}'))
    
    # Format x-axis dates
    fig.autofmt_xdate()
    
    # Convert plot to base64
    img_str = fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart": img_str,
        "data": activity_df[['date', 'total_earnings']].to_dict(orient='records'),
        "summary": {
            "total_earnings": float(activity_df['total_earnings'].sum()),
            "avg_daily_earnings": float(activity_df['total_earnings'].mean()),
            "max_daily_earnings": float(activity_df['total_earnings'].max()),
            "min_daily_earnings": float(activity_df['total_earnings'].min())
        }
    }

@app.get("/analytics/skill-demand")
async def get_skill_demand():
    # Sort by demand
    sorted_skill_df = skill_df.sort_values('demand', ascending=False)
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Create horizontal bar chart
    bars = ax.barh(sorted_skill_df['skill'], sorted_skill_df['demand'], color='skyblue')
    
    # Add growth indicators
    for i, (skill, demand, growth) in enumerate(zip(sorted_skill_df['skill'], 
                                                   sorted_skill_df['demand'], 
                                                   sorted_skill_df['growth'])):
        color = 'green' if growth > 0 else 'red'
        ax.text(demand + 10, i, f"{growth*100:+.1f}%", va='center', color=color, fontweight='bold')
    
    ax.set_title('Skill Demand on Platform')
    ax.set_xlabel('Number of Projects')
    ax.grid(True, axis='x', alpha=0.3)
    
    # Convert plot to base64
    img_str = fig_to_base64(fig)
    plt.close(fig)
    
    # Calculate top growing and declining skills
    top_growing = skill_df.sort_values('growth', ascending=False).head(3)
    top_declining = skill_df.sort_values('growth').head(3)
    
    return {
        "chart": img_str,
        "data": sorted_skill_df.to_dict(orient='records'),
        "summary": {
            "top_skills_by_demand": sorted_skill_df.head(5)['skill'].tolist(),
            "top_growing_skills": [
                {"skill": skill, "growth": f"{growth*100:+.1f}%"} 
                for skill, growth in zip(top_growing['skill'], top_growing['growth'])
            ],
            "top_declining_skills": [
                {"skill": skill, "growth": f"{growth*100:+.1f}%"} 
                for skill, growth in zip(top_declining['skill'], top_declining['growth'])
            ]
        }
    }

@app.get("/analytics/fraud-detection")
async def get_fraud_metrics():
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Create pie chart
    ax.pie(fraud_df['count'], labels=fraud_df['category'], autopct='%1.1f%%', 
           startangle=90, shadow=True)
    ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
    
    ax.set_title('Fraud Detection by Category')
    
    # Convert plot to base64
    img_str = fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart": img_str,
        "data": fraud_df.to_dict(orient='records'),
        "summary": {
            "total_fraud_cases": int(fraud_df['count'].sum()),
            "most_common_fraud": fraud_df.loc[fraud_df['count'].idxmax(), 'category'],
            "least_common_fraud": fraud_df.loc[fraud_df['count'].idxmin(), 'category']
        }
    }

@app.get("/analytics/project-success")
async def get_project_success():
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Sort by success rate
    sorted_success_df = success_df.sort_values('success_rate', ascending=False)
    
    # Create bar chart
    bars = ax.bar(sorted_success_df['category'], sorted_success_df['success_rate'], color='lightgreen')
    
    # Add percentage labels
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{height:.1%}', ha='center', va='bottom')
    
    ax.set_title('Project Success Rate by Category')
    ax.set_ylabel('Success Rate')
    ax.set_ylim(0, 1)
    ax.grid(True, axis='y', alpha=0.3)
    
    # Format y-axis as percentage
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda y, _: f'{y:.0%}'))
    
    # Rotate x-axis labels
    plt.xticks(rotation=45, ha='right')
    
    # Convert plot to base64
    img_str = fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart": img_str,
        "data": sorted_success_df.to_dict(orient='records'),
        "summary": {
            "overall_success_rate": float(success_df['success_rate'].mean()),
            "highest_success_category": sorted_success_df.iloc[0]['category'],
            "highest_success_rate": float(sorted_success_df.iloc[0]['success_rate']),
            "lowest_success_category": sorted_success_df.iloc[-1]['category'],
            "lowest_success_rate": float(sorted_success_df.iloc[-1]['success_rate'])
        }
    }

@app.get("/analytics/dashboard-summary")
async def get_dashboard_summary():
    # Calculate summary metrics
    total_users = activity_df['active_users'].iloc[-1]
    total_projects = activity_df['project_postings'].sum()
    total_earnings = activity_df['total_earnings'].sum()
    avg_success_rate = success_df['success_rate'].mean()
    
    # User growth
    user_growth = (activity_df['active_users'].iloc[-1] - activity_df['active_users'].iloc[0]) / activity_df['active_users'].iloc[0]
    
    # Project growth
    first_week_projects = activity_df['project_postings'].iloc[:7].sum()
    last_week_projects = activity_df['project_postings'].iloc[-7:].sum()
    project_growth = (last_week_projects - first_week_projects) / first_week_projects if first_week_projects > 0 else 0
    
    # Earnings growth
    first_week_earnings = activity_df['total_earnings'].iloc[:7].sum()
    last_week_earnings = activity_df['total_earnings'].iloc[-7:].sum()
    earnings_growth = (last_week_earnings - first_week_earnings) / first_week_earnings if first_week_earnings > 0 else 0
    
    return {
        "summary_metrics": {
            "total_users": int(total_users),
            "total_projects": int(total_projects),
            "total_earnings": float(total_earnings),
            "avg_success_rate": float(avg_success_rate)
        },
        "growth_metrics": {
            "user_growth": float(user_growth),
            "project_growth": float(project_growth),
            "earnings_growth": float(earnings_growth)
        },
        "top_skills": skill_df.sort_values('demand', ascending=False).head(5)['skill'].tolist(),
        "fraud_summary": {
            "total_cases": int(fraud_df['count'].sum()),
            "most_common": fraud_df.loc[fraud_df['count'].idxmax(), 'category']
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)
