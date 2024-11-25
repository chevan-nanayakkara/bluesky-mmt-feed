# src/main.py
from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the BlueSky MMT Feed Generator API!"}

@app.get("/files/{filename}")
def get_file(filename: str):
    """
    Serve files from the `src/files` directory.
    """
    file_path = os.path.join("src/files", filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}
