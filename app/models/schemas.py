"""
Pydantic models for request/response validation.
"""
from pydantic import BaseModel


# =================== AUTH MODELS ===================
class LoginRequest(BaseModel):
    """Request model for user login."""
    email: str
    password: str


class SignupRequest(BaseModel):
    """Request model for user registration."""
    email: str
    password: str


class TokenResponse(BaseModel):
    """Response model for successful authentication."""
    access_token: str
    token_type: str = "bearer"


# =================== DATA MODELS ===================
class IngestRequest(BaseModel):
    """Request model for data ingestion."""
    url: str


class IngestResponse(BaseModel):
    """Response model for successful ingestion."""
    status: str
    records_ingested: int
    timestamp: str
