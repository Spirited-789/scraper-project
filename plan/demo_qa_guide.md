# Data Drive - Demo Q&A Preparation

## Your Questions + Answers

### Q1: What dependencies do they need to integrate this into their server?

**Answer:**
```
Backend (Python 3.10+):
├── fastapi          → Web framework
├── uvicorn          → ASGI server
├── psycopg2-binary  → PostgreSQL driver
├── passlib + bcrypt → Password hashing
├── python-jose      → JWT tokens
├── requests         → External API calls
├── python-dotenv    → Environment variables
└── pydantic         → Data validation (included with FastAPI)

Frontend (Node.js 18+):
├── React 18         → UI framework
├── Vite             → Build tool
├── Axios            → HTTP client
├── React Router     → Navigation
└── Tailwind CSS     → Styling

Dashboard:
├── Streamlit        → Dashboard framework
├── Plotly           → Charts
└── Pandas           → Data manipulation

Database:
└── PostgreSQL 14+   → Any PostgreSQL instance
```

**One-liner:** "Install Python, Node.js, and connect to any PostgreSQL database."

---

### Q2: What changes to integrate into company servers?

**Answer:**
| Component | Current | Company Server Change |
|-----------|---------|----------------------|
| Database | Supabase PostgreSQL | Change `DATABASE_URL` env var to company PostgreSQL |
| Backend | Render | Deploy via Docker or directly with `uvicorn` |
| Frontend | Vercel | Build with `npm run build`, serve with Nginx |
| Secrets | `.env` file | Use company secret manager (Vault, AWS Secrets, etc.) |

**Key point:** "The code is environment-agnostic. All configuration is via environment variables, so switching servers only requires changing env vars—no code changes needed."

---

### Q3: Why chose FastAPI for this project?

**Answer:**

| Reason | Explanation |
|--------|-------------|
| **Performance** | One of the fastest Python frameworks (async-capable) |
| **Type safety** | Pydantic auto-validates all requests |
| **Auto docs** | Swagger UI at `/docs` for free |
| **Modern** | Built-in OAuth2, CORS, dependency injection |
| **Enterprise ready** | Used by Microsoft, Netflix, Uber |

**Comparison:**
```
Flask     → Simple but manual validation, no async
Django    → Heavy, batteries-included, overkill for APIs
FastAPI   → Fast, modern, auto-docs, perfect for REST APIs ✓
```

**One-liner:** "FastAPI gives us automatic documentation, built-in validation, and async performance—ideal for a data ingestion API."

---

### Q4: Frontend/React related questions

**Q: Why React?**
- Component-based architecture for reusability
- Large ecosystem and community support
- Virtual DOM for efficient updates
- Used by Meta, Airbnb, Netflix

**Q: Why Vite instead of Create-React-App?**
- 10-100x faster build times
- Native ES modules (no bundling in dev)
- CRA is deprecated/maintenance mode

**Q: How does authentication work in the frontend?**
```
1. User logs in → Backend returns JWT token
2. Token stored in localStorage
3. Every API call includes: Authorization: Bearer <token>
4. Protected routes check for token, redirect to /login if missing
```

**Q: Why Tailwind CSS?**
- Utility-first = faster development
- No CSS files to manage
- Smaller bundle (purges unused styles)
- Consistent design system

---

## Additional Questions They Might Ask

### Architecture & Design

**Q: Why did you separate the backend into multiple files?**
> "Separation of concerns. Each file has one responsibility: config handles settings, database handles connections, routers handle HTTP, services handle business logic. This makes the code testable, maintainable, and scalable."

**Q: Why SQLite initially, then PostgreSQL?**
> "SQLite for rapid prototyping—zero setup, file-based. PostgreSQL for production—persistent, concurrent connections, scalable."

**Q: Why Streamlit for the dashboard instead of building it in React?**
> "Streamlit provides data visualization in ~50 lines of Python. Building equivalent charts in React would take 10x longer. It's the right tool for data-focused dashboards."

---

### Security

**Q: How do you handle passwords?**
> "Passwords are hashed with bcrypt (one-way hash with salt). We never store plain text. Verification compares hashes, not passwords."

**Q: How does JWT authentication work?**
> "On login, server creates a signed token with user email and expiry time. Client sends this token with every request. Server verifies the signature—if valid, request proceeds; if not, 401 error."

**Q: What about CORS?**
> "We whitelist specific origins that can call our API. Only our frontend domains are allowed—prevents random websites from making requests."

---

### Scalability

**Q: Can this handle 10,000 users?**
> "Current architecture supports moderate load. For 10k+ users: add connection pooling (already using Supabase pooler), deploy multiple backend instances behind a load balancer, and consider Redis for caching."

**Q: What would you add for production?**
> "Rate limiting, request logging, error monitoring (Sentry), database indexing, and a CI/CD pipeline for automated deployments."

---

### Project-Specific

**Q: Why CoinGecko API?**
> "It's free tier friendly, provides comprehensive crypto market data, and has reliable uptime. Easy to swap for any JSON API."

**Q: What data do you store?**
> "Market snapshots: coin_id, price, market_cap, volume, 24h changes, timestamps. Users: email, hashed password, created_at."

---

## Demo Flow Suggestion

1. **Start at landing page** → Show design
2. **Signup flow** → Create account
3. **Login** → Get JWT
4. **Home page** → Paste CoinGecko URL
5. **Click Go** → Show network tab (loading)
6. **Streamlit opens** → Show charts
7. **Supabase** → Show data persisted in table
8. **Swagger docs** → Show auto-generated API docs

---

## Confidence Boosters

- "The modular structure follows industry best practices"
- "Environment variables make deployment flexible"
- "JWT + bcrypt is the same auth pattern used by major companies"
- "FastAPI is trusted by Microsoft, Netflix, and Uber"
