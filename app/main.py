"""
FastAPI application initialization.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import ALLOWED_ORIGINS
from app.database import init_db, init_db_users
from app.routers import auth, data


# =================== APP INITIALIZATION ===================
from contextlib import asynccontextmanager
from app.services.entra_auth import azure_scheme

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load OpenID Connect configuration on startup
    await azure_scheme.openid_config.load_config()
    yield
    # Clean up if needed

app = FastAPI(lifespan=lifespan, title="Data Drive API")

# =================== CORS MIDDLEWARE ===================
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =================== INCLUDE ROUTERS ===================
app.include_router(auth.router)
app.include_router(data.router)

# =================== DATABASE INITIALIZATION ===================
# Initialize databases on module load
init_db_users()
init_db()


# =================== ROOT ENDPOINT ===================
@app.get("/")
def root():
    """Health check endpoint."""
    return {"status": "FastAPI backend running"}











