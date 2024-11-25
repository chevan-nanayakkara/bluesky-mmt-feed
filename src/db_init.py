# src/db_init.py
from app.utils.db import Base, engine
from app.models.post import Post  # Import all models

def init_db():
    """Initialize the database."""
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
