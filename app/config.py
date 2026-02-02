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
DATA_DIR = "/tmp/data"
os.makedirs(DATA_DIR, exist_ok=True)

DB_NAME = os.path.join(DATA_DIR, "market_data.db")
DB_USERS = os.path.join(DATA_DIR, "users.db")

# =================== CORS ===================
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://scraper-project-nu.vercel.app"
]
