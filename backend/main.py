from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import User  # registers table with Base


# ---------- Database Session Dependency ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- FastAPI Lifespan ----------
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(lifespan=lifespan)

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://medichainai.dev",
        "https://www.medichainai.dev",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Models ----------
class TriageRequest(BaseModel):
    symptoms: str


# ---------- Root ----------
@app.get("/")
def home():
    return {"message": "MedChain AI Backend Running"}


# ---------- Database Test ----------
@app.get("/db-test")
def db_test():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    return {"status": "database connected"}


# ---------- Create Test User ----------
@app.post("/test-user")
def create_test_user(db: Session = Depends(get_db)):
    user = User(email="test@example.com", role="patient")
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "Test user created successfully",
        "user_id": str(user.id)
    }

class CreateUserRequest(BaseModel):
    email: str
    role: str


@app.post("/users")
def create_user(request: CreateUserRequest, db: Session = Depends(get_db)):
    user = User(email=request.email, role=request.role)
    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "user_id": str(user.id),
        "email": user.email,
        "role": user.role
    }

# ---------- AI Triage Logic ----------
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


# ---------- Triage API ----------
@app.post("/triage")
def triage(request: TriageRequest):
    return triage_logic(request.symptoms)