# src/services/firehose.py
from sqlalchemy.orm import Session
from app.models.post import Post
from app.utils.db import get_db_session

async def process_post(data):
    db = next(get_db_session())  # Get database session
    post = Post(
        uri=data['uri'],
        content=data['content'],
        author=data['author'],
        timestamp=datetime.fromtimestamp(data['timestamp']),
        relevance_score=None,  # Set during scoring
        sentiment=None         # Set during sentiment analysis
    )
    db.add(post)
    db.commit()
    db.close()
