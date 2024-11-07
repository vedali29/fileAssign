from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .services.pdf_service import process_pdf
from .services.qa_service import get_answer
from .database import SessionLocal, engine
from .models import Base
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(400, "Only PDF files are allowed")
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    document = process_pdf(file, file_path)
    
    db = SessionLocal()
    try:
        db.add(document)
        db.commit()
        db.refresh(document)
        return {"filename": file.filename, "id": document.id}
    finally:
        db.close()

@app.post("/api/ask")
async def ask_question(document_id: int, question: str):
    db = SessionLocal()
    try:
        document = db.query(Document).filter(Document.id == document_id).first()
        if not document:
            raise HTTPException(404, "Document not found")
        
        answer = get_answer(document.file_path, question)
        return {"answer": answer}
    finally:
        db.close()
