# src/app/routes/feed.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from app.utils.db import get_db_session
from app.models.post import Post
from app.schemas import SkeletonFeedPost
from app.utils.cursor import encode_cursor, decode_cursor

router = APIRouter()

@router.get("/posts")
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db_session)):
    """
    Fetch a paginated list of posts from the database.
    """
    posts = db.query(Post).offset(skip).limit(limit).all()
    return posts

@router.get("/feed")
def get_feed(
    cursor: Optional[str] = None, 
    limit: int = 10, 
    db: Session = Depends(get_db_session)
):
    """
    Generate a feed of posts filtered by relevance score and paginated using a cursor.
    """
    query = db.query(Post).filter(Post.relevance_score > 0).order_by(Post.timestamp.desc())

    # Apply cursor-based pagination
    if cursor:
        try:
            last_timestamp = decode_cursor(cursor)
            query = query.filter(Post.timestamp < last_timestamp)
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid cursor")

    # Limit the results
    posts = query.limit(limit).all()

    # Build the feed skeleton
    skeleton = [
        SkeletonFeedPost(post=post.uri, reason=None) for post in posts
    ]

    # Generate the next cursor if there are results
    next_cursor = encode_cursor(posts[-1].timestamp) if posts else None

    return {
        "feed": skeleton,
        "cursor": next_cursor
    }

