"""
Data router: ingestion and reporting endpoints.
"""
from datetime import datetime
import requests
from fastapi import APIRouter, HTTPException, Depends
from psycopg2.extras import RealDictCursor

from app.database import get_conn
from app.models.schemas import IngestRequest
from app.services.auth import get_current_user


router = APIRouter(tags=["Data"])


@router.post("/ingest")
def ingest_market_data(request: IngestRequest, user=Depends(get_current_user)):
    """
    Fetch market data from external API and store in database.
    Requires authentication.
    """
    try:
        headers = {"User-Agent": "DataDrive/1.0"}
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
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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


@router.get("/report/latest")
def latest_snapshot(limit: int = 50):
    """Get the latest market snapshot, ordered by market cap."""
    conn = get_conn()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        SELECT * FROM market_snapshots
        WHERE timestamp = (SELECT MAX(timestamp) FROM market_snapshots)
        ORDER BY market_cap DESC
        LIMIT %s
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()
    return rows


@router.get("/report/coin/{coin_id}")
def coin_timeseries(coin_id: str):
    """Get time series data for a specific coin."""
    conn = get_conn()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        SELECT timestamp, current_price, market_cap, total_volume
        FROM market_snapshots
        WHERE coin_id = %s
        ORDER BY timestamp
    """, (coin_id,))
    rows = cursor.fetchall()
    conn.close()
    return rows
