# src/app/utils/cursor.py
import base64
from datetime import datetime

def encode_cursor(timestamp: datetime) -> str:
    """
    Encode a datetime object as a base64 cursor string.
    """
    ts = int(timestamp.timestamp() * 1000)  # Convert to milliseconds
    return base64.urlsafe_b64encode(str(ts).encode()).decode()

def decode_cursor(cursor: str) -> datetime:
    """
    Decode a base64 cursor string into a datetime object.
    """
    ts = int(base64.urlsafe_b64decode(cursor).decode())
    return datetime.fromtimestamp(ts / 1000)  # Convert back to seconds
