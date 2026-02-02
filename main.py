"""
Entry point for uvicorn.
Run with: uvicorn main:app --reload
"""
from app.main import app

# Re-export app for uvicorn
__all__ = ["app"]