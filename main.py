from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import requests
from bs4 import BeautifulSoup

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# 1. THE HOME PAGE
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# 2. THE SCRAPING ACTION
@app.post("/scrape", response_class=HTMLResponse)
async def handle_scrape(request: Request, my_url: str = Form(...)):
    
    # --- A. CONNECT TO THE WEBSITE ---
    # We use a "User-Agent" so websites think we are a real browser, not a bot
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        # Check if user added http:// or https://
        if not my_url.startswith(('http://', 'https://')):
            my_url = 'https://' + my_url
            
        page = requests.get(my_url, headers=headers)
        soup = BeautifulSoup(page.content, "html.parser")

        # --- B. EXTRACT DATA ---
        
        # 1. Get the Title
        page_title = soup.title.string if soup.title else "No Title Found"
        
        # 2. Get the Meta Description (Standard SEO tag)
        meta_desc = "No description found"
        description_tag = soup.find("meta", attrs={"name": "description"})
        if description_tag:
            meta_desc = description_tag.get("content")

        # 3. Get Word Count (Remove HTML tags, split text into list, count list)
        text_content = soup.get_text()
        words = text_content.split()
        word_count = len(words)

    except Exception as e:
        # If something breaks (e.g., bad URL), show a simple error
        return templates.TemplateResponse("index.html", {
            "request": request, 
            "error_message": f"Error scraping URL: {str(e)}"
        })

    # --- C. RENDER THE REPORT ---
    # We pass the data we found to 'report.html'
    return templates.TemplateResponse("report.html", {
        "request": request,
        "url": my_url,
        "title": page_title,
        "meta_desc": meta_desc,
        "word_count": word_count
    })