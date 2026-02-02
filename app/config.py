"""
Application configuration and environment variables.
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# =================== SECURITY ===================
SECRET_KEY = os.getenv('SECRET_KEY', 'fallback_secret_key_dev_only')
ALGORITHM = os.getenv('ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# =================== DATABASE ===================
# PostgreSQL connection string from Supabase
# Format: postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres
DATABASE_URL = os.getenv('DATABASE_URL')

if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable is required. "
        "Get it from Supabase: Settings → Database → Connection string (URI)"
    )

# =================== CORS ===================
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://scraper-project-nu.vercel.app"
]
