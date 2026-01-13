import os
import sqlite3
import requests
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

# ================= DATABASE =================
DATA_DIR = "/tmp/data"
os.makedirs(DATA_DIR, exist_ok=True)

DB_NAME = os.path.join(DATA_DIR, "market_data.db")

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

# ================= MODELS =================
class IngestRequest(BaseModel):
    url: str

# ================= INGEST =================
@app.post("/ingest")
def ingest_market_data(request: IngestRequest):
    try:
        headers = {
            "User-Agent": "DataDrive/1.0"
        }

        response = requests.get(
            request.url,
            headers=headers,
            timeout=15
        )
        response.raise_for_status()
        data = response.json()

        if not isinstance(data, list):
            raise HTTPException(
                status_code=400,
                detail="Expected a list of market objects"
            )

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
                coin.get("id"),
                coin.get("symbol"),
                coin.get("name"),
                coin.get("current_price"),
                coin.get("market_cap"),
                coin.get("total_volume"),
                coin.get("price_change_24h"),
                coin.get("price_change_percentage_24h"),
                coin.get("high_24h"),
                coin.get("low_24h"),
                coin.get("circulating_supply"),
                coin.get("max_supply"),
                coin.get("ath"),
                coin.get("ath_change_percentage"),
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

# ================= ROOT =================
@app.get("/")
def root():
    return {"status": "FastAPI backend running"}

# ================= LATEST SNAPSHOT =================
@app.get("/report/latest")
def latest_snapshot(limit: int = 50):
    conn = get_conn()
    conn.row_factory = sqlite3.Row

    rows = conn.execute("""
        SELECT *
        FROM market_snapshots
        WHERE timestamp = (SELECT MAX(timestamp) FROM market_snapshots)
        ORDER BY market_cap DESC
        LIMIT ?
    """, (limit,)).fetchall()

    conn.close()
    return [dict(row) for row in rows]

# ================= TIME SERIES =================
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
