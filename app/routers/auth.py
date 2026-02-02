"""
Authentication router: login and signup endpoints.
"""
from datetime import datetime
from fastapi import APIRouter, HTTPException

from app.database import get_conn
from app.models.schemas import LoginRequest, SignupRequest
from app.services.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_user_from_db
)


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user_data: SignupRequest):
    """Register a new user."""
    # Check if user already exists
    existing_user = get_user_from_db(user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password and store user
    hashed = hash_password(user_data.password)
    created_at = datetime.utcnow().isoformat()
    
    conn = get_conn()
    c = conn.cursor()
    try:
        c.execute(
            "INSERT INTO users (email, hashed_password, created_at) VALUES (%s, %s, %s)",
            (user_data.email, hashed, created_at)
        )
        conn.commit()
    except Exception:
        raise HTTPException(status_code=500, detail="Database error")
    finally:
        conn.close()
    
    return {"status": "user created"}


@router.post("/login")
def login(user_data: LoginRequest):
    """Authenticate user and return JWT token."""
    # Get user from database
    user = get_user_from_db(user_data.email)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create and return token
    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}
