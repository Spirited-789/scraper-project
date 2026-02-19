# RBAC Implementation — Next Steps

> **⏰ Reminder: Implement after 2026-02-21 (48 hrs from now)**

## What to Do

### 1. Azure Portal — Create App Roles
Go to **App Registrations → Data-Drive-App → App roles → Create app role** ×3:

| Display Name | Value | Allowed member types |
|---|---|---|
| Admin | `Admin` | Users/Groups |
| Analyst | `Analyst` | Users/Groups |
| Viewer | `Viewer` | Users/Groups |

### 2. Assign Role to Yourself
**Enterprise Applications → Data-Drive-App → Users and Groups → Add → Assign your account + a role**

### 3. Code Changes Needed
- **Frontend**: Read `accounts[0].idTokenClaims.roles` → conditionally show/hide UI
- **Backend**: Check `token.roles` in FastAPI dependency → enforce access

### 4. Demo Flow for Manager
1. Assign yourself `Admin` → login → show full access
2. Sign out → change role to `Viewer` in Azure Portal
3. Sign back in → show restricted UI
4. *"No code change. IT controls access centrally."* 🎤
