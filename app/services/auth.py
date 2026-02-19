"""
Authentication utilities: password hashing, JWT, user lookup.
"""
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from psycopg2.extras import RealDictCursor

from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from app.database import get_conn


# =================== SECURITY SETUP ===================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# =================== PASSWORD UTILS ===================
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


# =================== JWT UTILS ===================
def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES) -> str:
    """Create a JWT access token."""
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


# =================== USER DATABASE ===================
def get_user_from_db(email: str):
    """Lookup user by email from database."""
    conn = get_conn()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    conn.close()
    return user


# =================== AUTH DEPENDENCY ===================
def get_current_user(token: str = Depends(oauth2_scheme)) -> str:
    """
    FastAPI dependency to validate JWT and return current user email.
    Supports BOTH:
      1. Old JWT tokens (from email/password login)
      2. Microsoft ID tokens (from Entra ID login)
    """
    # --- Attempt 1: Old JWT (email/password login) ---
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except JWTError:
        pass

    # --- Attempt 2: Microsoft ID Token (Entra ID login) ---
    try:
        from app.config import AZURE_CLIENT_ID, AZURE_TENANT_ID

        # Decode without signature verification for PoC
        # (In production, verify against Microsoft's JWKS)
        payload = jwt.decode(
            token,
            options={"verify_signature": False, "verify_aud": False}
        )

        # Validate issuer matches our tenant
        issuer = payload.get("iss", "")
        if AZURE_TENANT_ID and AZURE_TENANT_ID not in issuer:
            raise HTTPException(status_code=401, detail="Invalid token issuer")

        # Validate audience matches our client ID
        aud = payload.get("aud", "")
        if AZURE_CLIENT_ID and aud != AZURE_CLIENT_ID:
            raise HTTPException(status_code=401, detail="Invalid token audience")

        # Extract user email from Microsoft token claims
        email = (
            payload.get("preferred_username")
            or payload.get("email")
            or payload.get("upn")
            or payload.get("sub")
        )
        if email:
            return email

    except HTTPException:
        raise
    except Exception:
        pass

    raise HTTPException(status_code=401, detail="Invalid or expired token")

