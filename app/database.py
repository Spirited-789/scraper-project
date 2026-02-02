"""
Database connections and initialization.
"""
import sqlite3
from app.config import DB_NAME, DB_USERS


def get_conn():
    """Get connection to market data database."""
    return sqlite3.connect(DB_NAME, check_same_thread=False)


def get_conn_users():
    """Get connection to users database."""
    return sqlite3.connect(DB_USERS, check_same_thread=False)


def init_db():
    """Initialize market_snapshots table."""
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


def init_db_users():
    """Initialize users table."""
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

