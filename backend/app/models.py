from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    vector_store_path = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
