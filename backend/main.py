from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import engine

app = FastAPI()

# Enable CORS (for Next.js frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://medichainai.dev",
                    "https://www.medichainai.dev","http://localhost:3000"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TriageRequest(BaseModel):
    symptoms: str

@app.get("/")
def home():
    return {"message": "MedChain AI Backend Running"}

@app.get("/db-test")
def db_test():
    with engine.connect() as conn:
        conn.execute("SELECT 1")
    return {"status": "database connected"}

def triage_logic(text):
    text_lower = text.lower()

    if "chest pain" in text_lower or "difficulty breathing" in text_lower:
        return {
            "urgency": "HIGH",
            "advice": "Seek immediate medical attention immediately.",
            "recommended_action": "Go to the nearest hospital immediately.",
            "facility_type": "hospital",
            "emergency": True
        }

    elif "fever" in text_lower or "cough" in text_lower:
        return {
            "urgency": "MEDIUM",
            "advice": "Visit a nearby clinic if symptoms persist.",
            "recommended_action": "Consult a clinic within 24 hours.",
            "facility_type": "clinic",
            "emergency": False
        }

    else:
        return {
            "urgency": "LOW",
            "advice": "Monitor symptoms and rest.",
            "recommended_action": "Self care and monitor for 48 hours.",
            "facility_type": "self",
            "emergency": False
        }

@app.post("/triage")
def triage(request: TriageRequest):
    return triage_logic(request.symptoms)