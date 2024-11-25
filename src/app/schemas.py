# src/app/schemas.py
from pydantic import BaseModel
from typing import Optional

class SkeletonFeedPost(BaseModel):
    post: str  # The URI of the post
    reason: Optional[dict] = None  # Metadata for why the post is included
