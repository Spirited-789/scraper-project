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
    """
    Fetches data from the URL, saves it to DB, and redirects to the report page.
    """
    try:
        response = requests.get(my_url)
        response.raise_for_status()
        
        # Check if it is JSON
        content_type = response.headers.get('Content-Type', '')
        if 'application/json' not in content_type:
             return {"Error": "Please use a JSON API link (like fakestoreapi.com)"}

        data = response.json()
        
        conn = sqlite3.connect('scraper_data.db')
        c = conn.cursor()
        latest_id = None
        
        # LOGIC: Check if we got a List of items or a Single item
        if isinstance(data, list):
            # If it's a list, save them all
            for item in data:
                c.execute('''INSERT INTO products (title, price, category, description, rating, image_url)
                             VALUES (?, ?, ?, ?, ?, ?)''', 
                             (item.get('title'), 
                              item.get('price'), 
                              item.get('category'), 
                              item.get('description'), 
                              item.get('rating', {}).get('rate', 0.0), 
                              item.get('image')))
            # We don't have a single "latest" ID to show, so we leave it as None
            latest_id = None
            
        else:
            # If it's a single item, save it and remember its ID
            c.execute('''INSERT INTO products (title, price, category, description, rating, image_url)
                         VALUES (?, ?, ?, ?, ?, ?)''', 
                         (data.get('title'), 
                          data.get('price'), 
                          data.get('category'), 
                          data.get('description'), 
                          data.get('rating', {}).get('rate', 0.0), 
                          data.get('image')))
            latest_id = c.lastrowid

        conn.commit()
        conn.close()

        # REDIRECT: 
        # If we have a single new item, we pass its ID in the URL to show the graph
        if latest_id:
            return RedirectResponse(url=f"/report?id={latest_id}", status_code=303)
        else:
            # If we scanned a bulk list, just go to the main table view
            return RedirectResponse(url="/report", status_code=303)

    except Exception as e:
        return {"error": str(e)}


@app.get("/report", response_class=HTMLResponse)
async def show_report(request: Request, id: int = None):
    """
    Displays the dashboard. 
    - If 'id' is present, it shows the details for that specific product at the top.
    - It ALWAYS shows the table of all products at the bottom.
    """
    conn = sqlite3.connect('scraper_data.db')
    conn.row_factory = sqlite3.Row  # Allows accessing columns by name
    c = conn.cursor()
    
    # A. Get the specific product (if 'id' was passed in the URL)
    focused_product = None
    rating_pct = 0
    
    if id:
        c.execute("SELECT * FROM products WHERE id = ?", (id,))
        focused_product = c.fetchone()
        
        # Calculate the math for the graph here (Python logic, not HTML)
        if focused_product and focused_product['rating']:
            rating_pct = (focused_product['rating'] / 5) * 100
    
    # B. Get ALL products for the table at the bottom (ordered by newest first)
    c.execute("SELECT * FROM products ORDER BY id DESC")
    all_products = c.fetchall()
    
    conn.close()

    return templates.TemplateResponse("report.html", {
        "request": request, 
        "focused_product": focused_product, # The single item to show at the top (or None)
        "rating_pct": rating_pct,           # The calculated width for the bar chart
        "all_products": all_products        # The list for the table at the bottom
    })