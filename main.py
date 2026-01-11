import sqlite3
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# --- 1. ENABLE CORS (Allow React to talk to Python) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this to your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. DATABASE SETUP (Same as before) ---
def init_db():
    conn = sqlite3.connect('scraper_data.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT, price REAL, category TEXT,
            description TEXT, rating REAL, image_url TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# --- 3. PYDANTIC MODEL (For cleaner data validation) ---
class ScrapeRequest(BaseModel):
    url: str

# --- 4. API ROUTES (Return JSON, not HTML) ---

@app.get("/products")
def get_all_products():
    """Returns the full history of products as JSON"""
    conn = sqlite3.connect('scraper_data.db')
    conn.row_factory = sqlite3.Row
    products = conn.cursor().execute("SELECT * FROM products ORDER BY id DESC").fetchall()
    conn.close()
    return products  # FastAPI automatically converts this list to JSON

@app.get("/products/{product_id}")
def get_single_product(product_id: int):
    """Returns one specific product"""
    conn = sqlite3.connect('scraper_data.db')
    conn.row_factory = sqlite3.Row
    product = conn.cursor().execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    conn.close()
    if product:
        return product
    raise HTTPException(status_code=404, detail="Product not found")

@app.post("/scrape")
def scrape_product(request: ScrapeRequest):
    """Scrapes the URL and saves to DB. Returns the NEW ID."""
    try:
        response = requests.get(request.url)
        response.raise_for_status()
        data = response.json()

        conn = sqlite3.connect('scraper_data.db')
        c = conn.cursor()
        
        # Handle List vs Single Object logic (simplified for brevity)
        items_to_save = data if isinstance(data, list) else [data]
        last_id = 0

        for item in items_to_save:
            c.execute('''INSERT INTO products (title, price, category, description, rating, image_url)
                         VALUES (?, ?, ?, ?, ?, ?)''', 
                         (item.get('title'), item.get('price'), item.get('category'), 
                          item.get('description'), item.get('rating', {}).get('rate', 0.0), item.get('image')))
            last_id = c.lastrowid
            
        conn.commit()
        conn.close()
        
        # React needs to know the ID so it can redirect the user
        return {"message": "Success", "latest_id": last_id, "count": len(items_to_save)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))