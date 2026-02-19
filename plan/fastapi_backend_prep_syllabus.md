# 🚀 FastAPI Backend Developer — Fresher Interview Prep Syllabus

> **Starting Point:** Python basics ✅ | **Goal:** Clear fresher backend (FastAPI) interviews with confidence
> **Total Estimated Time:** ~8–10 weeks (3–4 hrs/day) or ~5–6 weeks (5–6 hrs/day intensive)

---

## Phase 1: Python Intermediate & Core CS (Week 1–2)

> [!IMPORTANT]
> Interviewers test Python depth even for backend roles. Don't skip this.

### 1.1 Python Deep Dive (~5 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **OOP** | Classes, inheritance, polymorphism, dunder methods, `@property`, abstract classes | 1 day |
| **Data Structures** | Lists, dicts, sets, tuples, defaultdict, Counter, deque, heapq | 1 day |
| **Iterators & Generators** | `yield`, generator expressions, `itertools` basics | 0.5 day |
| **Decorators & Closures** | Writing decorators, `functools.wraps`, parameterized decorators | 0.5 day |
| **Error Handling** | Custom exceptions, context managers (`with`), `try/except/finally` | 0.5 day |
| **Type Hints** | `typing` module — `Optional`, `List`, `Dict`, `Union`, `Annotated` | 0.5 day |
| **Async Basics** | `async/await`, `asyncio.run()`, event loop concept, coroutines | 1 day |

### 1.2 Core CS Fundamentals (~4 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **DSA** (interview-level) | Arrays, strings, hashmaps, two-pointer, sliding window, basic recursion, sorting | 2 days |
| **Networking** | HTTP methods, status codes, headers, cookies, CORS, DNS, TCP/IP basics | 1 day |
| **OS Concepts** | Processes vs threads, concurrency vs parallelism, what is an event loop | 0.5 day |
| **How the Web Works** | Client-server model, request lifecycle, what happens when you hit a URL | 0.5 day |

---

## Phase 2: Databases & SQL (Week 2–3)

### 2.1 SQL & Relational DBs (~4 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **SQL Fundamentals** | SELECT, WHERE, JOIN (inner, left, right), GROUP BY, HAVING, subqueries | 1.5 days |
| **Schema Design** | Normalization (1NF–3NF), primary/foreign keys, indexes, constraints | 1 day |
| **Advanced SQL** | Window functions, CTEs, transactions, ACID properties | 1 day |
| **Practice** | Solve 15–20 LeetCode SQL problems (Easy + Medium) | 0.5 day |

### 2.2 PostgreSQL + SQLAlchemy ORM (~3 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **PostgreSQL Setup** | Install, pgAdmin/psql, create DBs and tables | 0.5 day |
| **SQLAlchemy Core** | Engine, sessions, models, Column types, relationships | 1 day |
| **SQLAlchemy ORM** | CRUD operations, `query()` vs `select()`, lazy/eager loading | 1 day |
| **Alembic** | DB migrations — init, autogenerate, upgrade, downgrade | 0.5 day |

---

## Phase 3: FastAPI Core (Week 3–5) ⭐

> [!TIP]
> This is the core of your prep. Spend extra time here and build muscle memory.

### 3.1 FastAPI Fundamentals (~4 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **Basics** | Path operations, route decorators, request/response cycle | 0.5 day |
| **Path & Query Params** | Type validation, defaults, `Path()`, `Query()` | 0.5 day |
| **Request Body** | Pydantic models, nested models, field validation | 1 day |
| **Response Models** | `response_model`, status codes, `JSONResponse`, `HTTPException` | 0.5 day |
| **Dependency Injection** | `Depends()`, sub-dependencies, overrides for testing | 1 day |
| **Middleware** | CORS, custom middleware, request timing | 0.5 day |

### 3.2 Authentication & Security (~3 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **Password Hashing** | bcrypt, `passlib`, why not MD5/SHA | 0.5 day |
| **JWT Auth** | OAuth2 Bearer flow, `python-jose`, access & refresh tokens | 1.5 days |
| **Auth Middleware** | Protected routes, `get_current_user` dependency | 0.5 day |
| **Role-Based Access** | Admin vs user roles, permission checks | 0.5 day |

### 3.3 Advanced FastAPI (~3 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **Async Endpoints** | `async def` vs `def`, when to use each, DB async patterns | 0.5 day |
| **Background Tasks** | `BackgroundTasks`, email sending, cleanup jobs | 0.5 day |
| **File Handling** | `UploadFile`, streaming responses, serving static files | 0.5 day |
| **WebSockets** | Basic real-time communication with FastAPI | 0.5 day |
| **API Versioning** | Router-based versioning strategies | 0.5 day |
| **Testing** | `TestClient`, pytest fixtures, mocking dependencies | 0.5 day |

---

## Phase 4: DevOps & Deployment Essentials (Week 5–6)

### 4.1 Docker (~2 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **Docker Basics** | Images, containers, Dockerfile, `.dockerignore` | 1 day |
| **Docker Compose** | Multi-container apps (FastAPI + PostgreSQL + Redis) | 0.5 day |
| **Best Practices** | Multi-stage builds, layer caching, security | 0.5 day |

### 4.2 Git & CI/CD (~1.5 days)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **Git** | Branching, merging, rebasing, PRs, `.gitignore`, conventional commits | 0.5 day |
| **GitHub Actions** | Basic CI pipeline: lint → test → build | 0.5 day |
| **Deployment** | Deploy to Render / Railway / AWS EC2 (at least one) | 0.5 day |

### 4.3 Caching & Rate Limiting (~1 day)

| Topic | What to Cover | Time |
|-------|--------------|------|
| **Redis** | Key-value ops, TTL, caching strategies, `redis-py` / `aioredis` | 0.5 day |
| **Rate Limiting** | `slowapi` or custom middleware, API throttling | 0.5 day |

---

## Phase 5: Projects (Week 6–9) 🔨

> [!IMPORTANT]
> Projects are **THE** differentiator. Each project should be on GitHub with a proper README, deployed, and demo-ready.

### Project 1: **Auth-Ready REST API** (~4 days)
> *Covers: FastAPI, PostgreSQL, SQLAlchemy, JWT Auth, Alembic*

**Build a Todo/Notes API with:**
- User registration & login (JWT)
- CRUD operations with ownership (users can only see their own data)
- Pagination, filtering, sorting
- Alembic migrations
- Pydantic validation
- Deployment to Render

### Project 2: **URL Shortener Service** (~3 days)
> *Covers: Redis caching, background tasks, rate limiting*

**Build a URL shortener with:**
- Shorten URL → generate short code
- Redirect short code → original URL
- Click analytics (count, timestamps)
- Redis caching for hot URLs
- Rate limiting per IP
- Custom aliases

### Project 3: **Real-Time Chat / Notification Service** (~3 days)
> *Covers: WebSockets, async, Docker*

**Build a simple real-time system with:**
- WebSocket connections for live messaging
- Chat rooms / channels
- Message persistence in PostgreSQL
- Docker Compose setup (FastAPI + Postgres + Redis)
- Basic frontend (HTML/JS) to demo

### Project 4 (Bonus): **Your Scraper Project — Enhanced** (~3 days)
> *Covers: Full-stack, all concepts combined*

**Level up your existing Scraper project by adding:**
- API documentation with examples
- Comprehensive error handling
- Background task processing
- Rate limiting & caching
- Docker deployment
- Write tests

---

## Phase 6: Interview Prep & Mock Practice (Week 9–10)

### 6.1 Common Interview Topics

| Category | Must-Know Questions |
|----------|-------------------|
| **Python** | Mutable vs immutable, GIL, `deepcopy` vs `copy`, `*args/**kwargs`, decorators, generators |
| **FastAPI** | How DI works, Pydantic vs dataclass, sync vs async, middleware lifecycle, `Depends` chain |
| **Database** | Indexing (B-tree), query optimization, N+1 problem, connection pooling, transactions |
| **Auth** | JWT vs session, OAuth2 flows, token refresh strategy, storing tokens securely |
| **System Design** | Rate limiter design, URL shortener design, notification system, caching layers |
| **API Design** | REST conventions, idempotency, error responses, pagination strategies, HATEOAS basics |
| **DevOps** | Docker layers, CI/CD pipeline stages, 12-factor app, env variable management |

### 6.2 Behavioral / HR Prep (~2 days)

- "Tell me about yourself" — have a 90-second pitch ready
- "Walk me through a project" — practice STAR format for every project
- "Why backend?" / "Why FastAPI?" — genuine, concise answers
- "How do you handle a difficult bug?" — have a real example

### 6.3 Mock Interview Practice (~2 days)

- Do 2–3 mock interviews with a friend or on [Pramp](https://www.pramp.com)
- Practice explaining your projects under time pressure
- Practice whiteboarding a system design on paper

---

## 📚 Recommended Resources

| Resource | What For |
|----------|----------|
| [FastAPI Official Docs](https://fastapi.tiangolo.com/tutorial/) | Primary learning source — very well-written |
| [SQLAlchemy Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/) | ORM deep dive |
| [NeetCode 150](https://neetcode.io/) | DSA practice (do Easy + Medium only) |
| [roadmap.sh/backend](https://roadmap.sh/backend) | Visual roadmap for backend topics |
| [testdriven.io FastAPI courses](https://testdriven.io/) | Project-based FastAPI learning |
| [Docker Getting Started](https://docs.docker.com/get-started/) | Hands-on Docker tutorial |

---

## 📅 Weekly Schedule Summary

```
Week 1  → Python intermediate + CS fundamentals
Week 2  → SQL + PostgreSQL + SQLAlchemy
Week 3  → FastAPI core (routes, Pydantic, DI)
Week 4  → FastAPI auth + advanced features
Week 5  → Docker + Git + Redis + deployment
Week 6  → Project 1 (Auth REST API)
Week 7  → Project 2 (URL Shortener)
Week 8  → Project 3 (Real-time) + enhance Scraper project
Week 9  → Interview theory revision
Week 10 → Mock interviews + final polish
```

> [!TIP]
> **Speed-run option (5–6 weeks):** Combine Weeks 1–2 into 1 week, skip Project 3, and start interview prep alongside Project 2. This is doable at 5–6 hrs/day.

---

## ✅ Interview Readiness Checklist

- [ ] Can explain Python OOP, decorators, generators from memory
- [ ] Can write SQL JOINs and window functions without Googling
- [ ] Can build a full CRUD FastAPI app with auth from scratch in < 2 hours
- [ ] Can explain JWT flow and write it on a whiteboard
- [ ] Can Dockerize any Python project
- [ ] Have 2–3 deployed projects on GitHub with clean READMEs
- [ ] Can whiteboard a basic system design (URL shortener, rate limiter)
- [ ] Can answer "tell me about yourself" in 90 seconds flat
