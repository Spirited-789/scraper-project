import os
import sqlite3
import requests
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

# Fallback in case env vars are missing to prevent crash
if not SECRET_KEY:
    SECRET_KEY = "fallback_secret_key_dev_only"
if not ALGORITHM:
    ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ================= APP =================
app = FastAPI(title="Data Drive API")

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DATABASE SETUP =================
DATA_DIR = "/tmp/data"
os.makedirs(DATA_DIR, exist_ok=True)
DB_NAME = os.path.join(DATA_DIR, "market_data.db")
DB_USERS = os.path.join(DATA_DIR, "users.db")

def get_conn_users():
    return sqlite3.connect(DB_USERS, check_same_thread=False)

def init_db_users():
    conn = get_conn_users()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE,
            hashed_password TEXT,
            created_at TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db_users()

def get_conn():
    return sqlite3.connect(DB_NAME, check_same_thread=False)

def init_db():
    conn = get_conn()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS market_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coin_id TEXT,
            symbol TEXT,
            name TEXT,
            current_price REAL,
            market_cap REAL,
            total_volume REAL,
            price_change_24h REAL,
            price_change_pct_24h REAL,
            high_24h REAL,
            low_24h REAL,
            circulating_supply REAL,
            max_supply REAL,
            ath REAL,
            ath_change_pct REAL,
            timestamp TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ================= AUTH UTILS =================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict, expires_minutes=60):
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_user_from_db(email: str):
    conn = get_conn_users()
    conn.row_factory = sqlite3.Row 
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    return user

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# ================= MODELS =================
class IngestRequest(BaseModel):
    url: str

# NEW: Models for Login/Signup to fix the 422 Error
class LoginRequest(BaseModel):
    email: str
    password: str

class SignupRequest(BaseModel):
    email: str
    password: str

# ================= AUTH ENDPOINTS =================
@app.post("/auth/signup")
def signup(user_data: SignupRequest):
    # 1. Check if user exists
    existing_user = get_user_from_db(user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(user_data.password)
    created_at = datetime.utcnow().isoformat()
    
    # 2. Insert into DB
    conn = get_conn_users()
    c = conn.cursor()
    try:
        c.execute("INSERT INTO users (email, hashed_password, created_at) VALUES (?, ?, ?)", 
                  (user_data.email, hashed, created_at))
        conn.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database error")
    finally:
        conn.close()
        
    return {"status": "user created"}

@app.post("/auth/login")
def login(user_data: LoginRequest):
    # 1. Get user
    user = get_user_from_db(user_data.email)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # 2. Verify Password
    if not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}


# ================= DATA ENDPOINTS =================
@app.post("/ingest")
def ingest_market_data(request: IngestRequest, user=Depends(get_current_user)):
    try:
        headers = { "User-Agent": "DataDrive/1.0" }
        response = requests.get(request.url, headers=headers, timeout=15)
        response.raise_for_status()
        data = response.json()

        if not isinstance(data, list):
            raise HTTPException(status_code=400, detail="Expected a list of market objects")

        conn = get_conn()
        c = conn.cursor()
        ts = datetime.utcnow().isoformat()

        for coin in data:
            c.execute("""
                INSERT INTO market_snapshots (
                    coin_id, symbol, name,
                    current_price, market_cap, total_volume,
                    price_change_24h, price_change_pct_24h,
                    high_24h, low_24h,
                    circulating_supply, max_supply,
                    ath, ath_change_pct,
                    timestamp
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                coin.get("id"), coin.get("symbol"), coin.get("name"),
                coin.get("current_price"), coin.get("market_cap"), coin.get("total_volume"),
                coin.get("price_change_24h"), coin.get("price_change_percentage_24h"),
                coin.get("high_24h"), coin.get("low_24h"),
                coin.get("circulating_supply"), coin.get("max_supply"),
                coin.get("ath"), coin.get("ath_change_percentage"),
                ts
            ))

        conn.commit()
        conn.close()

        return {
            "status": "success",
            "records_ingested": len(data),
            "timestamp": ts
        }

    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"status": "FastAPI backend running"}

@app.get("/report/latest")
def latest_snapshot(limit: int = 50):
    conn = get_conn()
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT * FROM market_snapshots
        WHERE timestamp = (SELECT MAX(timestamp) FROM market_snapshots)
        ORDER BY market_cap DESC
        LIMIT ?
    """, (limit,)).fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/report/coin/{coin_id}")
def coin_timeseries(coin_id: str):
    conn = get_conn()
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT timestamp, current_price, market_cap, total_volume
        FROM market_snapshots
        WHERE coin_id = ?
        ORDER BY timestamp
    """, (coin_id,)).fetchall()
    conn.close()
    return [dict(row) for row in rows]