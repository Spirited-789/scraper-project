from fastapi_azure_auth import SingleTenantAzureAuthorizationCodeBearer
from app.config import AZURE_CLIENT_ID, AZURE_TENANT_ID

if not AZURE_CLIENT_ID or not AZURE_TENANT_ID:
    raise ValueError("AZURE_CLIENT_ID and AZURE_TENANT_ID must be set in .env")

# The scope here depends on how you set it up in Azure.
# If you didn't create a custom API scope yet, we can use the default or just OpenID scopes.
# For this PoC, we will use the Client ID as the scope resource, which is common.
# Format: api://{client_id}/access (if you created it) or {client_id}/.default
# Let's assume you haven't created a custom scope yet, so we'll be lenient or use a default.
# Actually, SingleTenantAzureAuthorizationCodeBearer validates the access token.

azure_scheme = SingleTenantAzureAuthorizationCodeBearer(
    app_client_id=AZURE_CLIENT_ID,
    tenant_id=AZURE_TENANT_ID,
    scopes={
        # This is for Swagger UI to request scopes. 
        # If we haven't defined a scope in Azure "Expose an API", this might fail if we ask for one.
        # We'll leave it empty for now or use the default graph scope if needed, 
        # but for your own API protection, you usually need a scope.
        # Let's try to simple configuration first.
    }
)
