from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

app = FastAPI()

# Tell FastAPI where to find your HTML files
templates = Jinja2Templates(directory="templates")

# 1. THE HOME PAGE (GET Request)
# When the user goes to http://127.0.0.1:8000/
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    # This renders the index.html file
    return templates.TemplateResponse("index.html", {"request": request})

# 2. THE ACTION (POST Request)
# When the user clicks "Scrape Now", the form sends data here
@app.post("/scrape")
async def handle_scrape(my_url: str = Form(...)):
    # logic will go here later.
    # For now, let's just prove it worked by returning the URL.
    return {"message": "You entered this URL:", "received_url": my_url}