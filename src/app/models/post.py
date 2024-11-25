# src/app/models/post.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Float
from app.utils.db import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    uri = Column(String, unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    author = Column(String, nullable=False)
    timestamp = Column(DateTime, nullable=False)
    relevance_score = Column(Float, nullable=True)
    sentiment = Column(String, nullable=True)

