# Step-by-Step: Adding Entra ID to Your Project

## 💰 Cost: Will This Cost Me Anything?

**No. $0 with your free student account.**

| What | Cost | Why |
|---|---|---|
| Entra ID Free tier | **$0** | Included with every Azure subscription (including student) |
| App Registrations | **$0** | Unlimited, no charge |
| User logins (tokens) | **$0** | Free tier supports 50,000 monthly active users |
| MSAL library | **$0** | Open-source npm package |
| `fastapi-azure-auth` | **$0** | Open-source pip package |

> [!NOTE]
> Entra ID has paid tiers (P1, P2) for advanced features like Conditional Access, PIM, etc. You don't need any of those. The **Free tier** gives you everything for this POC: app registrations, user auth, SSO, token issuance, and group/role claims.

---

## The Big Picture — What You'll Do (in order)

```
Step 1: Azure Portal  → Register your Frontend app
Step 2: Azure Portal  → Register your Backend API app
Step 3: Azure Portal  → Connect them (API permissions)
Step 4: Backend Code   → Add fastapi-azure-auth for token validation
Step 5: Frontend Code  → Add MSAL React for "Sign in with Microsoft"
Step 6: Test           → Login → Get token → Call API → Profit
```

---

## Step 1: Register Your Frontend App (Azure Portal)

**Go to:** [portal.azure.com](https://portal.azure.com) → Search "App registrations" → **+ New registration**

| Field | What to Enter |
|---|---|
| Name | `Data-Drive-Frontend` |
| Supported account types | "Accounts in this organizational directory only" (Single tenant) |
| Redirect URI → Platform | **Single-page application (SPA)** |
| Redirect URI → URL | `http://localhost:5173` (your Vite dev server) |

**After creation, note down:**
```
Application (Client) ID  → e.g., "abc123-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
Directory (Tenant) ID    → e.g., "def456-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Add your production redirect URI too:**
- Go to **Authentication** → **+ Add URI**
- Add: `https://scraper-project-nu.vercel.app`

> [!TIP]
> Client ID is public — safe to put in your React code. It's like a Cognito App Client ID.

---

## Step 2: Register Your Backend API (Azure Portal)

**App registrations** → **+ New registration**

| Field | What to Enter |
|---|---|
| Name | `Data-Drive-API` |
| Supported account types | Same as frontend (Single tenant) |
| Redirect URI | Leave blank (backend doesn't need one) |

**After creation, note down the Application (Client) ID.**

### 2a. Expose an API (Create a Custom Scope)

This tells Entra ID "my API exists and apps can request access to it."

1. Go to your `Data-Drive-API` app registration
2. Click **Expose an API** in the left sidebar
3. Click **+ Add a scope**
4. It will ask for an **Application ID URI** — accept the default (`api://your-client-id`) or set `api://data-drive`
5. Fill in the scope:

| Field | Value |
|---|---|
| Scope name | `access` |
| Who can consent? | Admins and users |
| Admin consent display name | Access Data Drive API |
| Admin consent description | Allows the app to access Data Drive API |

**Your scope is now:** `api://your-api-client-id/access`

### 2b. (Optional) Create App Roles

1. Go to **App roles** → **+ Create app role**
2. Create roles like "Admin", "User", etc.
3. These will appear as `roles` claim in the JWT

---

## Step 3: Connect Frontend to Backend (API Permissions)

Go back to your **`Data-Drive-Frontend`** app registration:

1. Click **API permissions** → **+ Add a permission**
2. Click **My APIs** tab
3. Select **Data-Drive-API**
4. Check the `access` scope you created
5. Click **Add permissions**
6. Click **Grant admin consent** (you can do this since it's your student tenant)

```
What this does:
Frontend app says → "I want to request tokens for the Backend API"
Backend API says  → "I trust tokens requested by the Frontend app"
Admin consent     → "I approve this connection"
```

---

## Step 4: Backend Code Changes (FastAPI)

### 4a. Install the library

```bash
pip install fastapi-azure-auth
```

Add to [requirements.txt](file:///c:/Internship/Scraper-project/requirements.txt):
```
fastapi-azure-auth
```

### 4b. Add Entra ID env vars

Add to your [.env](file:///c:/Internship/Scraper-project/.env):
```env
# Entra ID Configuration
AZURE_TENANT_ID=your-tenant-id-from-step-1
AZURE_CLIENT_ID=your-backend-api-client-id-from-step-2
AZURE_APP_CLIENT_ID=your-frontend-client-id-from-step-1
```

### 4c. Update config.py

Add Entra ID settings to [config.py](file:///c:/Internship/Scraper-project/app/config.py):
```python
# =================== ENTRA ID ===================
AZURE_TENANT_ID = os.getenv('AZURE_TENANT_ID')
AZURE_CLIENT_ID = os.getenv('AZURE_CLIENT_ID')       # Backend API client ID
AZURE_APP_CLIENT_ID = os.getenv('AZURE_APP_CLIENT_ID') # Frontend client ID
```

### 4d. Create Entra ID auth dependency

Create a new file `app/services/entra_auth.py`:
```python
"""
Entra ID (Azure AD) authentication dependency for FastAPI.
Validates Microsoft-issued JWT tokens.
"""
from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer
from app.config import AZURE_TENANT_ID, AZURE_CLIENT_ID

# This object handles ALL the token validation:
# - Downloads Microsoft's public keys (JWKS)
# - Validates JWT signature
# - Checks expiry, audience, issuer
# - Extracts user claims (email, name, roles)
azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=AZURE_CLIENT_ID,  # Your backend API's client ID
    tenant_id=AZURE_TENANT_ID,
    # scopes are validated automatically
)
```

### 4e. Use it in your routes

In any router file, you can protect endpoints like this:
```python
from fastapi import Depends
from app.services.entra_auth import azure_scheme

@router.get("/protected-data")
async def get_protected_data(user=Depends(azure_scheme)):
    """This endpoint requires a valid Microsoft token."""
    return {
        "message": "You're authenticated!",
        "user": user.claims.get("preferred_username"),  # email
        "name": user.claims.get("name"),
        "roles": user.claims.get("roles", []),
    }
```

### 4f. Initialize on app startup

Update [main.py](file:///c:/Internship/Scraper-project/app/main.py) to load Entra ID keys at startup:
```python
from app.services.entra_auth import azure_scheme

@app.on_event("startup")
async def startup():
    """Load Microsoft's public keys for token validation."""
    await azure_scheme.openid_config.load_config()
```

---

## Step 5: Frontend Code Changes (React)

### 5a. Install MSAL

```bash
cd frontend
npm install @azure/msal-browser @azure/msal-react
```

### 5b. Create auth config

Create `frontend/src/authConfig.js`:
```javascript
/**
 * MSAL Configuration
 * Think of this as your Cognito User Pool config
 */
export const msalConfig = {
    auth: {
        clientId: "YOUR_FRONTEND_CLIENT_ID",  // From Step 1
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
        redirectUri: "http://localhost:5173",
    },
    cache: {
        cacheLocation: "sessionStorage",  // or "localStorage"
    },
};

/**
 * Scopes to request when logging in
 * This is the custom scope from your Backend API (Step 2a)
 */
export const loginRequest = {
    scopes: ["api://YOUR_BACKEND_CLIENT_ID/access"],
};
```

### 5c. Wrap your app with MsalProvider

Update `frontend/src/main.jsx`:
```jsx
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// Wrap your <App /> with <MsalProvider>
root.render(
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>
);
```

### 5d. Add "Sign in with Microsoft" button

In [Login.jsx](file:///c:/Internship/Scraper-project/frontend/src/components/auth/Login.jsx), add alongside your existing form:
```jsx
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const Login = () => {
    const { instance } = useMsal();

    const handleMicrosoftLogin = async () => {
        try {
            const response = await instance.loginPopup(loginRequest);
            // response.accessToken → send this to your FastAPI
            localStorage.setItem("token", response.accessToken);
            navigate("/home");
        } catch (error) {
            console.error("Microsoft login failed:", error);
        }
    };

    return (
        // ... your existing login form ...
        <button onClick={handleMicrosoftLogin}>
            Sign in with Microsoft
        </button>
        // ... rest of form ...
    );
};
```

### 5e. Get tokens for API calls

When making API requests, acquire a fresh token silently:
```javascript
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const { instance, accounts } = useMsal();

// Get a fresh token (MSAL handles refresh automatically)
const tokenResponse = await instance.acquireTokenSilent({
    ...loginRequest,
    account: accounts[0],
});

// Use it in your API call
const response = await axios.get("https://data-drive-d7kc.onrender.com/protected-data", {
    headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
    },
});
```

---

## Step 6: Test the Flow

```
1. Start your React dev server (npm run dev)
2. Start your FastAPI server (uvicorn)
3. Click "Sign in with Microsoft"
4. Microsoft popup appears → login with your student account
5. Popup closes → you have an access_token
6. React sends request to FastAPI with the token
7. FastAPI validates the token using Microsoft's public keys
8. FastAPI returns protected data ✅
```

---

## Quick Recap: What Goes Where

| File | What It Does |
|---|---|
| **Azure Portal** | Register apps, define scopes, connect frontend → backend |
| `frontend/src/authConfig.js` | MSAL config (Client ID, Tenant ID, scopes) |
| `frontend/src/main.jsx` | Wrap app with `MsalProvider` |
| `frontend/src/components/auth/Login.jsx` | "Sign in with Microsoft" button using `useMsal()` |
| `requirements.txt` | Add `fastapi-azure-auth` |
| `app/config.py` | Entra ID env vars |
| `app/services/entra_auth.py` | Token validation setup |
| `app/main.py` | Load Microsoft's public keys on startup |
| `app/routers/*.py` | `Depends(azure_scheme)` on protected endpoints |
