from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/portfolio")
def get_portfolio_data():
    # In a real app with "MongoDB-compatible backend structure", this would be:
    # return list(db.portfolio.find({}))
    # But for now, we return our mock dictionary.
    data = {
      "projects": [{"title": "MediCare+"}, {"title": "AI Resume Analyzer"}]
    }
    return {"status": "success", "data": data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
