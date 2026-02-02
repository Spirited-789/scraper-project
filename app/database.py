"""
Database connections and initialization for PostgreSQL.
"""
import psycopg2
from psycopg2.extras import RealDictCursor
from app.config import DATABASE_URL


def get_conn():
    """Get connection to PostgreSQL database."""
    return psycopg2.connect(DATABASE_URL)


def init_db():
    """Initialize market_snapshots table."""
    conn = get_conn()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS market_snapshots (
            id SERIAL PRIMARY KEY,
            coin_id VARCHAR(100),
            symbol VARCHAR(20),
            name VARCHAR(100),
            current_price DOUBLE PRECISION,
            market_cap DOUBLE PRECISION,
            total_volume DOUBLE PRECISION,
            price_change_24h DOUBLE PRECISION,
            price_change_pct_24h DOUBLE PRECISION,
            high_24h DOUBLE PRECISION,
            low_24h DOUBLE PRECISION,
            circulating_supply DOUBLE PRECISION,
            max_supply DOUBLE PRECISION,
            ath DOUBLE PRECISION,
            ath_change_pct DOUBLE PRECISION,
            timestamp VARCHAR(50)
        )
    """)
    conn.commit()
    conn.close()


def init_db_users():
    """Initialize users table."""
    conn = get_conn()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            hashed_password TEXT,
            created_at VARCHAR(50)
        )
    """)
    conn.commit()
    conn.close()
