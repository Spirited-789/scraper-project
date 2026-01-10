import sqlite3
import requests
from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# --- DATABASE SETUP ---
def init_db():
    """Creates the database table if it doesn't exist."""
    conn = sqlite3.connect('scraper_data.db')
    c = conn.cursor()
    # We create a table to match the fields in your image
    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            price REAL,
            category TEXT,
            description TEXT,
            rating REAL,
            image_url TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Run the DB setup once when the app starts
init_db()

# --- ROUTES ---

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/scrape")
async def handle_scrape(my_url: str = Form(...)):
    
    # 1. Fetch the Data
    try:
        response = requests.get(my_url)
        response.raise_for_status() # Check for errors
        
        # 2. Check if it is JSON (like the link you sent)
        content_type = response.headers.get('Content-Type', '')
        
        if 'application/json' in content_type:
            data = response.json()
            # Extract data based on the structure in your image
            title = data.get('title', 'No Title')
            price = data.get('price', 0.0)
            category = data.get('category', 'Unknown')
            desc = data.get('description', '')
            img = data.get('image', '')
            # Rating is nested inside a dictionary: "rating": {"rate": 3.9 ...}
            rating = data.get('rating', {}).get('rate', 0.0)
            
        else:
            # Fallback for normal websites (your old logic)
            # For this step, let's focus on the JSON part you asked for.
            return {"Error": "This specific code is currently optimized for API/JSON links like FakeStoreAPI."}

        # 3. Save to Database
        conn = sqlite3.connect('scraper_data.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO products (title, price, category, description, rating, image_url)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (title, price, category, desc, rating, img))
        
        new_id = c.lastrowid # Get the ID of the row we just created
        conn.commit()
        conn.close()

        # 4. Redirect to the Report Page for THIS item
        return RedirectResponse(url=f"/report/{new_id}", status_code=303)

    except Exception as e:
        return {"error": str(e)}

@app.get("/report/{product_id}", response_class=HTMLResponse)
async def show_report(request: Request, product_id: int):
    # 1. Fetch data from Database
    conn = sqlite3.connect('scraper_data.db')
    conn.row_factory = sqlite3.Row # Allows accessing columns by name
    c = conn.cursor()
    c.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    product = c.fetchone()
    conn.close()

    if product:
        # Pass the database row to the HTML template
        return templates.TemplateResponse("report.html", {"request": request, "p": product})
    else:
        return {"error": "Product not found"}